const fs = require('fs');
const path = require('path');
const MimeLookup = require('mime-lookup');
const mime = new MimeLookup(require('mime-db'));
const spawn = require('child_process').spawn;
const helper = require('../lib/helper.js');
const config = require('../config-master.js');
const FlyJson = require('fly-json-odm');
const ParallelRequest = require('parallel-http-request');

async function masterRoute (server, options) {

    server.post('/upload', async function (request, reply) {
        if(request.raw.files) {
            const files = request.raw.files;
            var fileArr = [];
            for(let key in files){
                fileArr.push({
                    name: files[key].name,
                    mimetype: files[key].mimetype,
                    ext:mime.extension(files[key].mimetype),
                    size: files[key].size,
                    tempFilePath:files[key].tempFilePath,
                });
            }
            
            if(fs.existsSync(fileArr[0].tempFilePath)) {
                fs.renameSync(fileArr[0].tempFilePath,fileArr[0].tempFilePath+'.'+fileArr[0].ext);

                var nosql = new FlyJson();
                var result = nosql.set(config.nodeServer);
                var x = config.blockNode;
                for(var z=0;z<x.length;z++) {
                    result.where('prefix', '!=', x[z]);
                }
                var listhost = result.exec();
                var host = listhost[helper.randomItem(listhost)];
                
                const ls = spawn("node", ["./transfer.js",
                    "-u", host.upstream+"/node/upload", 
                    "-f", fileArr[0].tempFilePath+'.'+fileArr[0].ext, 
                    "-x", config.node_x_token,
                    "-o", config.origin
                ]);

                ls.stdout.on("data", function(data) {
                    fs.unlink(fileArr[0].tempFilePath+'.'+fileArr[0].ext,function(err){
                        if(err) console.log(err);
                    });
                    var result = JSON.parse(data.toString());
                    if(result.status === 200) {
                        result.body[0].name = fileArr[0].name;
                        reply.code(result.status).send({status:result.status,message:'Upload file successfully!',response:result.body[0]});
                    } else {
                        reply.code(result.status).send({status:result.status,message:result.body[0].message});
                    }
                });

                ls.stderr.on("data", function(data) {
                    reply.code(500).send({status:500,message:'Something went wrong!',error:data.toString()});
                });
            } else {
                reply.code(409).send({status:409,message:'Failed to upload! Please try again!'});
            }
        } else {
            reply.code(400).send({status:400,message:'Bad Request!'});
        }
    });

    server.post('/delete', async function(request, reply) {
        var data = request.body;
        if(data.node && data.year && data.month && data.date && data.filename) {
            var nosql = new FlyJson();
            var listhost = nosql.set(config.nodeServer).where('prefix','==','/'+data.node.toLowerCase()).exec(); 
            if(listhost.length > 0) {
                var transfer = new ParallelRequest();
                transfer.add({
                    url: listhost[0].upstream+'/node/delete',
                    method: 'post',
                    headers:{'Content-Type':'application/json'},
                    body: {
                        year:data.year,
                        month:data.month,
                        date:data.date,
                        filename:data.filename
                    }
                });
                transfer.send(function(response) {
                    if(response[0].status === 200) {
                        reply.send({status:200,message:"File deleted successfully!"});
                    } else {
                        reply.code(response[0].status).send({status:response[0].status,message:response[0].body.message});
                    }
                });
            } else {
                reply.code(404).send({status:404,message:"File not found!"});
            }
        } else {
            reply.code(400).send({status:400,message:"Bad Request!"});
        }
    });

    server.post('/cleanup', async function(request, reply) {
        var directory = path.join(__dirname,'../temp/');
        fs.readdir(directory, (err, files) => {
            if (err) console.log(err);
          
            for (const file of files) {
              fs.unlink(path.join(directory, file), err => {
                if (err) console.log(err);
              });
            }
            fs.closeSync(fs.openSync(directory+'/.gitkeep', 'w'));
        });
        reply.send({status:200,message:'Cleanup all temporary files successfully!'});
    });

    server.post('/upload/remote', async function(request, reply) {
        var directory = path.join(__dirname,'../temp/');
        var body = request.body;
        if(body.url && body.filename) {
            var url = body.url.trim();
            var downloaded = await helper.fileDownload(url,directory+body.filename);
            if(downloaded) {
                if(fs.existsSync(directory+body.filename)) {
        
                    var nosql = new FlyJson();
                    var result = nosql.set(config.nodeServer);
                    var x = config.blockNode;
                    for(var z=0;z<x.length;z++) {
                        result.where('prefix', '!=', x[z]);
                    }
                    var listhost = result.exec();
                    var host = listhost[helper.randomItem(listhost)];
                    
                    const ls = spawn("node", ["./transfer.js",
                        "-u", host.upstream+"/node/upload", 
                        "-f", directory+body.filename, 
                        "-x", config.node_x_token,
                        "-o", config.origin
                    ]);
                    
                    ls.stdout.on("data", function(data) {
                        fs.unlink(directory+body.filename,function(err){
                            if(err) console.log(err);
                        });
                        var result = JSON.parse(data.toString());
                        if(result.status === 200) {
                            result.body[0].name = body.filename;
                            reply.code(result.status).send({status:result.status,message:'Upload file successfully!',response:result.body[0]});
                        } else {
                            reply.code(result.status).send({status:result.status,message:result.body[0].message});
                        }
                    });

                    ls.stderr.on("data", function(data) {
                        reply.code(500).send({status:500,message:'Something went wrong!',error:data.toString()});
                    });
                } else {
                    reply.code(409).send({status:409,message:'Failed to upload! Please try again!'});
                }
            } else {
                reply.code(409).send({status:409,message:'Failed to upload! Please try again!'});
            }
        } else {
            reply.code(400).send({status:400,message:'Bad Request!'});
        }
        await reply;
    });

}

module.exports = masterRoute;