#!/usr/bin/env node
const yargs = require("yargs");
const ParallelRequest = require('parallel-http-request');
const fs = require('fs');
const path = require('path');
const options = yargs
    .usage("Usage: -u <url> -f <file> -x <x_token> -o <origin>")
    .option("u", { 
        alias: "url", 
        describe: "Url to upload. Ex: http://localhost:3001/node/upload", 
        type: "string", 
        demandOption: true
    })
    .option("f", { 
        alias: "file", 
        describe: "File path to upload with dot.extension. Ex: /temp-1-123123xxx.png", 
        type: "string", 
        demandOption: true
    })
    .option("x", { 
        alias: "x_token", 
        describe: "x_token header authentication for node API", 
        type: "string", 
        demandOption: true
    })
    .option("o", { 
        alias: "origin", 
        describe: "Origin is the base url of master server. Ex. http://localhost:3000", 
        type: "string", 
        demandOption: true
    })
    .argv;

    function isValidURL(str) {
        var pattern = new RegExp(/\w+:(\/?\/?)[^\s]+/,'gm');
        return !!pattern.test(str);
    }

    if(isValidURL(options.url)) {
        var size = fs.statSync(path.resolve(options.file)).size;
        if(size > 0) {
            var transfer = new ParallelRequest();
            transfer.add({
                url: options.url,
                method: 'post',
                headers: {
                    'origin':options.origin,
                    'x_token':options.x_token,
                    'Content-Type': 'multipart/form-data',
                    'Content-Length': size
                },
                attach: {
                    'file': options.file
                }
            });
            transfer.send(function(response) {
                console.log(JSON.stringify(response[0]));
            });
        } else {
            console.log(JSON.stringify({status:400,message: 'File is broken or corrupted!'}));
        }
    } else {
        console.log(JSON.stringify({status:400,message: 'Your url is not valid!'}));
    }