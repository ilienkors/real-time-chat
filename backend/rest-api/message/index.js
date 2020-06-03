const { startMessageSocket } = require('./messageLogic')
const { startFileSocket } = require('./fileLogic')
const { startAudioSocket } = require('./audioLogic')

module.exports = async function (fastify, opts) {
    fastify.get('/startSocket/message/:chatId/:login', { websocket: true }, startMessageSocketHandler)
    fastify.get('/startSocket/file/:chatId/:login', { websocket: true }, startFileSocketHandler)
    fastify.get('/startSocket/audio/:chatId/:login', { websocket: true }, startAudioSocketHandler)
}

async function startMessageSocketHandler(connection, req, params) {
    startMessageSocket(connection, params.chatId, params.login)
}
async function startFileSocketHandler(connection, req, params) {
    startFileSocket(connection, params.chatId, params.login)
}
async function startAudioSocketHandler(connection, req, params) {
    startAudioSocket(connection, params.chatId, params.login)
}
