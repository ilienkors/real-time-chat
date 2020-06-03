const registration = {
    body: {
        type: 'object',
        required: ['login', 'password'],
        properties: {
            login: {
                type: 'string'
            },
            password: {
                type: 'string'
            },
            friends: {
                type: 'array'
            },
        },
        additionalProperties: false
    },
    response: {
        200: {
            type: 'object',
            required: ['userId'],
            properties: {
                userId: { type: 'string' }
            },
            additionalProperties: false
        }
    }
}

const authorize = {
    response: {
        200: {
            type: 'object',
            required: ['userId'],
            properties: {
                userId: { type: 'string' }
            },
            additionalProperties: false
        }
    }
}

const getLogin = {
    response: {
        200: {
            type: 'object',
            required: ['login'],
            properties: {
                login: { type: 'string' }
            },
            additionalProperties: false
        }
    }
}

module.exports = {
    registration,
    authorize,
    getLogin,
}