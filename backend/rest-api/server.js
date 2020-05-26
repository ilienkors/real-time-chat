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

fastify.register(require('fastify-ws'))

fastify.register(require('./registration'))
fastify.register(require('./chat'))

fastify.post(
    '/uploadFile',
    { preHandler: upload.single('file') },
    function (request, reply) {
        reply.code(200).send('SUCCESS')
    }
)

fastify.ready(err => {
    const usernameExist = (username, users) => {
        let isFound = false
        users.forEach(user => {
            console.log(username + " != " + user.userName)
            if (username === user.userName) {
                console.log('test')
                isFound = true
            }

        })
        console.log('false')
        return isFound
    }

    if (err) throw err

    console.log('Server started')
    let users = []
    fastify.ws
        .on('connection', socket => {
            console.log('Client connected.')

            socket.on('message', msg => {
                msg = JSON.parse(msg)
                if (!usernameExist(msg.userName, users)) {
                    users.push({
                        userName: msg.userName,
                        socket: socket
                    })
                }
                console.log(users)
                users.forEach(user => {
                    user.socket.send(JSON.stringify(msg))
                })
            })

            socket.on('close', () => console.log('Client disconnected.'))
        })
})

fastify.listen(5000, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})
