class UserService {
    constructor(userCollection) {
        this.userCollection = userCollection
    }

    async register(login, password) {
        let writeResult
        try {
            writeResult = await this.userCollection.insertOne({ login, password, friends: [] })
        } catch (e) {
            if (e.code === 11000) {
                throw new Error('USERNAME_IS_NOT_AVAILABLE')
            }
            throw e

        }
        return writeResult.insertedId
    }

    async authorize(login, password) {
        const users = await this.userCollection.find({ login, password }, { projection: { password: 0 } }).toArray()
        const user = users[0]

        if (!user) throw new Error('WRONG_PASSWORD_OR_LOGIN')

        return user._id
    }

    async getLogin(userId) {
        const users = await this.userCollection.find({ _id:  require('mongodb').ObjectId(userId)}, { projection: { password: 0 } }).toArray()
        const user = users[0]
        if (!user) throw new Error('WRONG_USERID')

        return user.login
    }
}

module.exports = UserService
