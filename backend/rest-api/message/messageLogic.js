const { findChat, findClient } = require('./utils')

let chats = []

const startMessageSocket = (connection, chatId, login) => {
    let chat = findChat(chats, chatId)
    if (chat) {
        let client = findClient(chat.clients, login, connection)
        if (!client)
            chat.clients.push({ login, connection })
    } else {
        chat = { chatId, clients: [{ login, connection }] }
        chats.push(chat)
    }

    connection.socket.on('message', message => {
        chat.clients.forEach(singleClient => {
            singleClient.connection.socket.send(message)
        })
    })
}

module.exports = {
    startMessageSocket,
}
