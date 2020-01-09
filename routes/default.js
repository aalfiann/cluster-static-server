async function defaultRoute (server, options) {
    server.get('/', async (request, reply) => {
        reply.code(404);
        reply.send({ message: 'are you lost?' });
    });
}
  
module.exports = defaultRoute;