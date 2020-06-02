const fastify = require('fastify')({
    logger: true
})

fastify.register(multer.contentParser)

fastify.register(require('fastify-cors'), {})

fastify.register(require('fastify-postgres'), {
    connectionString: 'postgres://postgres:mysecretpassword@localhost:5433/postgres'
})

fastify.register(require('fastify-websocket'))

fastify.register(require('./file'))
fastify.register(require('./audio'))
fastify.register(require('./messages'))

fastify.register(require('./registration'))
fastify.register(require('./chat'))

fastify.listen(5000, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})
