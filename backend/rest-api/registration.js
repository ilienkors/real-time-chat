async function routes(fastify, options) {

    fastify.get('/getUser/:login/:password', (request, reply) => {
        console.log(request.body)
        fastify.pg.connect(onConnect)

        function onConnect(err, client, release) {
            if (err) return reply.send(err)

            client.query(
                'SELECT * FROM public."user" WHERE login=$1 AND password=MD5($2)', [request.params.login, request.params.password],
                function onResult(err, result) {
                    release()
                    reply.send(err || result.rows[0])
                }
            )
        }
    })

    fastify.post('/addUser', (request, reply) => {
        fastify.pg.connect(onConnect)

        function onConnect(err, client, release) {
            if (err) return reply.send(err)

            client.query('INSERT INTO public."user"(user_uuid, login, password) VALUES (uuid_generate_v4(), $1, MD5($2))', [request.body.login, request.body.password],
                function onResult(err, result) {
                    release()
                    reply.send(err || result.rows)
                }
            )
        }
    })
}

module.exports = routes