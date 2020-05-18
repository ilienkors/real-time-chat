async function routes(fastify, options) {
    fastify.get('/test', async (request, reply) => {
        return { hello: 'world1' }
    })
}

module.exports = routes