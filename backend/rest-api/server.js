const fastify = require('fastify')({
    logger: true
})

const multer = require('fastify-multer') // or import multer from 'fastify-multer'
const upload = multer({ dest: 'uploads/' })

fastify.register(multer.contentParser)

fastify.register(require('fastify-cors'), {})

fastify.register(require('fastify-postgres'), {
    connectionString: 'postgres://postgres:mysecretpassword@localhost:5433/postgres'
})

function handle (conn) {
    conn.pipe(conn) // creates an echo server
  }

fastify.register(require('fastify-websocket'), {
    handle,
    options: { maxPayload: 104857600 }
})

fastify.register(require('./file'))
fastify.register(require('./audio'))
fastify.register(require('./messages'))

fastify.register(require('./registration'))
fastify.register(require('./chat'))

fastify.post(
    '/uploadFile',
    { preHandler: upload.single('file') },
    function (request, reply) {
        reply.code(200).send('SUCCESS')
    }
)

fastify.listen(5000, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})
