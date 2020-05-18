const fastify = require('fastify')({
    logger: true
})

fastify.register(require('fastify-cors'), {
    // put your options here
})

fastify.register(require('fastify-postgres'), {
    connectionString: 'postgres://postgres:mysecretpassword@localhost:5433/postgres'
})

fastify.register(require('./registration'))

fastify.listen(5000, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})
