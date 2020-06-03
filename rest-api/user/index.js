const {
    registration: registrationSchema,
    authorize: authorizeSchema,
    getLogin: loginSchema,
} = require('./schemas')

module.exports = async function (fastify, opts) {
    fastify.post('/register', { schema: registrationSchema }, registerHandler)
    fastify.get('/authorize/:login/:password', { schema: authorizeSchema }, authorizeHandler)
    fastify.get('/login/:userId', { schema: loginSchema }, userLoginHandler)
}

module.exports[Symbol.for('plugin-meta')] = {
    decorators: {
        fastify: [
            'userService',
        ]
    }
}

async function registerHandler(req, reply) {
    const { login, password } = req.body
    const userId = await this.userService.register(login, password)
    return { userId }
}

async function authorizeHandler(req, reply) {
    const { login, password } = req.params
    const userId = await this.userService.authorize(login, password)
    return { userId }
}

async function userLoginHandler(req, reply) {
    const { userId } = req.params
    const login = await this.userService.getLogin(userId)
    return { login }
}
