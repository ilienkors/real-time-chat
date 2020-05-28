async function routes(fastify, options) {

    const findChat = (chats, uuidToFind) => {
        if (chats)
            for (let i = 0; i < chats.length; i++) {
                if (chats[i].chatUuid === uuidToFind)
                    return chats[i]
            }
        return false
    }

    const findClient = (clients, uuidToFind, connection) => {
        if (clients)
            for (let i = 0; i < clients.length; i++) {
                if (clients[i].userUuid === uuidToFind) {
                    clients[i].connection = connection
                    return true
                }
            }
        return false
    }

    let chats = []

    fastify.get('/file/:chatUuid/:userUuid', { websocket: true }, (connection, req, params) => {
        let chatUuid = params.chatUuid
        let userUuid = params.userUuid

        let chat = findChat(chats, chatUuid)
        if (chat) {
            let client = findClient(chat.clients, userUuid, connection)
            if (!client)
                chat.clients.push({ userUuid, connection })
        } else {
            chat = { chatUuid, clients: [{ userUuid, connection }] }
            chats.push(chat)
        }

        console.log('File Client connected. ChatUUID: ' + chatUuid + ' userUuid: ' + userUuid)
        connection.socket.on('message', message => {
            chat.clients.forEach(singleClient => {
                console.log('send to ' + singleClient.userUuid)
                singleClient.connection.socket.send(message)
            })
        })
    })

}

module.exports = routes
