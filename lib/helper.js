const config_node = require('../config-node.js');
const https = require('https');
const http = require('http');
const fs = require('fs');

module.exports = {
    isHasKey,
    jsonDate,
    isAllowedMime,
    getExtension,
    randomItem,
    fileDownload,
    fileDownloadPromise
}

function isHasKey(key) {
    return config_node.hasOwnProperty(key);
}

function jsonDate(setDate) {
	var dt = null;
    if (setDate === undefined) {
        var dt = new Date();
    } else {
        var dt = new Date(setDate);
    }
    return {
        year:dt.getFullYear(),
        month:("0" + (dt.getMonth() + 1)).slice(-2),
        date:("0" + dt.getDate()).slice(-2)
    }
}

function isAllowedMime(mimeType) {
    var self = this;
    mimeType = mimeType.toLowerCase();
    if(self.isHasKey('allowMime')) {
        for(var i=0;i<config_node.allowMime.length;i++) {
            if(config_node.allowMime[i] === mimeType || config_node.allowMime[i] === '*') {
                return true;
            }
        }
    } else {
        return true;
    }
    return false;
}

function getExtension(value) {
    var result = value.split(/\.(?=[^\.]+$)/)[1];
    if(result) {
        return '.'+result;
    }
    return '';
}

function randomItem(array) {
    return Math.floor(Math.random()*array.length);
}

function fileDownloadPromise (url, dest) {
    url = url.trim();
    var file = fs.createWriteStream(dest);
    return new Promise((resolve,reject) => {
        try{
            switch(true){
                case (url.substring(0, 5).toLowerCase() === 'http:') :
                    http.get(url, function(response) {
                        response.pipe(file);
                        file.on('finish', function() {
                            file.close();
                            resolve(true);
                        });
                    });
                break;
                case (url.substring(0, 6).toLowerCase() === 'https:') :
                    https.get(url, function(response) {
                        response.pipe(file);
                        file.on('finish', function() {
                            file.close();
                            resolve(true);
                        });
                    });
                break;
                default:
                    file.close();
                    reject(false);
            }
        } catch (e) {
            file.close();
            reject(false);
        }
    });
}

async function fileDownload (url, dest) {
    return await this.fileDownloadPromise(url,dest);
}