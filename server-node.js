const config = require('./config-node.js');
const path = require('path');
const server = require('fastify')({
    logger: config.logger
});

server.register(require('fastify-file-upload'), {
    limits: { fileSize: config.limitSize }
});

server.register(require('fastify-static'), {
    root: path.join(__dirname, config.staticDirPath),
    prefix: '/'+config.staticDirPath+'/',
    acceptRanges:config.acceptRanges,
    cacheControl: config.cacheControl,
    dotfiles:config.dotfiles,
    etag:config.etag,
    extensions:config.extensions,
    immutable: config.immutable,
    lastModified:config.lastModified,
    maxAge: config.maxAge,
    wildcard: false,
    serve:false
});

// Route
server.register(require('./routes/default.js'));
server.register(require('./routes/node.js'));

// Hooks
server.addHook('onRequest', (request, reply, done) => {
    if(request.raw.method !== 'GET') {
        if(request.headers.x_token===config.x_token){
            done();
        } else {
            reply.code(400).send({status:400,message:'Bad Request!'});
        }
    } else {
        done();
    }
});

// Custom Error Handler
server.setErrorHandler(function (error, request, reply) {
    server.log.error(error);
    reply.send({status:500,message:'Whoops, Something went wrong!'});
});

server.listen(config.nodePort, function (err, address) {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }
});