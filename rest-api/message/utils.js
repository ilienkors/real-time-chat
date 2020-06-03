const findChat = (chats, uuidToFind) => {
    if (chats)
        for (let i = 0; i < chats.length; i++) {
            if (chats[i].chatId === uuidToFind)
                return chats[i]
        }
    return false
}

const findClient = (clients, uuidToFind, connection, connectionType) => {
    if (clients)
        for (let i = 0; i < clients.length; i++) {
            if (clients[i].login === uuidToFind) {
                clients[i].connection = connection
                return true
            }
        }
    return false
}

module.exports = {
    findChat,
    findClient,
}
