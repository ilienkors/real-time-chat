const fastify = require('fastify')({ logger: true })
const fp = require('fastify-plugin')
fastify.register(require('fastify-cors'))
fastify.register(require('fastify-mongodb'), { forceClose: true, url: 'mongodb://localhost:27017', useNewUrlParser: true })
fastify.register(require('fastify-websocket'))

const UserService = require('./user/service')

const decorateFastifyInstance = async (fastify) => {
    const db = fastify.mongo.client.db('real-time-chat')

    const userCollection = await db.createCollection('users')
    const userService = new UserService(userCollection)
    fastify.decorate('userService', userService)
}

fastify.register(fp(decorateFastifyInstance))
fastify.register(require('./user'), { prefix: '/api/user' })

fastify.listen(5000, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})