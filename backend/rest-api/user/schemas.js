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
            }
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

module.exports = {
    registration,
    authorize
}