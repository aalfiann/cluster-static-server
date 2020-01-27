const helper = require('../lib/helper.js');
const uuidv4 = require('uuid/v4');
const config_node = require('../config-node.js');
const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');

async function nodeRoute (server, options) {

    server.get('/status', async function (request, reply) {
        reply.send({status:reply.statusCode});
        await reply;
    });

    server.get('/get/:year/:month/:date/:filename', async function (request, reply) {
        reply.sendFile(request.params.year+'/'+request.params.month+'/'+request.params.date+'/'+request.params.filename);
        await reply;
    });

    server.post('/node/upload', async function (request, reply) {
        if(request.raw.files) {
            var dt = helper.jsonDate();
            var dirpath = dt.year+'/'+dt.month+'/'+dt.date;
            mkdirp(path.normalize(config_node.staticDirPath+'/'+dirpath)).then((made) => {
                const files = request.raw.files;
                let fileArr = [];
                for(let key in files){
                    var error = '';
                    if(helper.isAllowedMime(files[key].mimetype)) {
                        var fileid = uuidv4();
                        var filename = fileid+helper.getExtension(files[key].name);
                        files[key].mv(path.normalize(made+'/'+filename), function(err) {
                            if(err) error = err;
                        });
                        fileArr.push({
                            id: fileid,
                            name: files[key].name,
                            mimetype: files[key].mimetype,
                            size: files[key].size,
                            path:request.headers.origin+config_node.nodePrefixName+'/get/'+dirpath+'/'+filename,
                            error: error
                        });
                    } else {
                        fileArr.push({
                            id: '',
                            name: files[key].name,
                            mimetype: files[key].mimetype,
                            size:0,
                            path:'',
                            error: 'This file is not allowed!'
                        });
                    }
                }
                reply.send(fileArr);
            });
        } else {
            reply.code(400).send({status:400,message:'Bad Request!'});
        }
        await reply;
    });

    server.post('/node/delete', async function(request, reply) {
        var data = request.body;
        if(data.year && data.month && data.date && data.filename) {
            fs.unlink(path.normalize(config_node.staticDirPath+'/'+data.year+'/'+data.month+'/'+data.date+'/'+data.filename),function(err) {
                if(err) return reply.code(404).send({status:404,message:"Failed to delete! File not found!"});
                reply.send({status:200,message:'Delete file successfully!'});
            });
        } else {
            reply.code(400).send({status:400,message:"Bad Request!"});
        }
        await reply;
    });

}
  
module.exports = nodeRoute;