async function routes(fastify, options) {

    fastify.post('/createChat', (request, reply) => {
        fastify.pg.connect(onConnect)

        function onConnect(err, client, release) {
            if (err) return reply.send(err)

            client.query('INSERT INTO public.chat(chat_uuid, title) VALUES (uuid_generate_v4(), $1) RETURNING chat_uuid;', [request.body.title],
                function onResult(err, result) {
                    
                    let chatUuid = result.rows[0].chat_uuid;

                    client.query('INSERT INTO public.chat_users(chat_uuid, user_uuid) VALUES ($1, $2);', [chatUuid, request.body.user1_uuid],
                        function onResult(err, result) {
                            if (err) return reply.send(err)
                        }
                    )

                    client.query('INSERT INTO public.chat_users(chat_uuid, user_uuid) VALUES ($1, $2);', [chatUuid, request.body.user2_uuid],
                        function onResult(err, result) {
                            if (err) return reply.send(err)
                        }
                    )
                    
                    reply.send(err || result.rows[0])
                }
            )
        }
    })

    fastify.delete('/deleteChat/:chat_uuid', (request, reply) => {
        fastify.pg.connect(onConnect)

        function onConnect(err, client, release) {
            if (err) return reply.send(err)

            client.query('DELETE FROM chat_users WHERE chat_uuid = $1', [request.params.chat_uuid],
                function onResult(err, result) {
                    if (err) return reply.send(err)
                }
            )

            client.query('DELETE FROM chat WHERE chat_uuid = $1', [request.params.chat_uuid],
                function onResult(err, result) {
                    if (err) return reply.send(err)
                }
            )

            reply.send({status: "ok"})
        }
    })

    fastify.get('/chats', (request, reply) => {
        fastify.pg.connect(onConnect)

        function onConnect(err, client, release) {
            if (err) return reply.send(err)

            client.query('SELECT * FROM chat', [],
                function onResult(err, result) {
                    if (err) return reply.send(err)
                    reply.send(result.rows)
                }
            )
        }
    })
}

module.exports = routes