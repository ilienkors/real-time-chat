async function routes(fastify, options) {

    fastify.get('/user/:login', (request, reply) => {
        fastify.pg.connect(onConnect)

        function onConnect(err, client, release) {
            if (err) return reply.send(err)

            client.query(
                'SELECT * FROM public."user" WHERE login=$1', [request.params.login],
                function onResult(err, result) {
                    release()
                    reply.send(err || result.rows[0])
                }
            )
        }
    })

    fastify.post('/user', (request, reply) => {
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