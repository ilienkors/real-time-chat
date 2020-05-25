const fastify = require('fastify')({
    logger: true
})

fastify.register(require('fastify-cors'), {})

fastify.register(require('fastify-postgres'), {
    connectionString: 'postgres://postgres:mysecretpassword@localhost:5433/postgres'
})

fastify.register(require('fastify-ws'))

fastify.register(require('./registration'))
fastify.register(require('./chat'))

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
                //console.log('meessage go')
                msg = JSON.parse(msg)
                if (!usernameExist(msg.userName, users)) {
                    console.log('1')
                    users.push({
                        userName: msg.userName,
                        socket: socket
                    })
                }
                console.log(users)
                users.forEach(user => {
                    //console.log(user.userName)
                    user.socket.send(JSON.stringify(msg))
                })
                //socket.send(msg)
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
