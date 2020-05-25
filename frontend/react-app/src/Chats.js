import React, { useState, useEffect } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:5000');
let count = 0

const Chats = () => {
    const [messages, setMessages] = useState([])
    const [messageInut, setMessageInput] = useState('')

    useEffect(() => {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        }
    }, [])

    client.onmessage = msg => {
        console.log('onMes')
        count++
        let message = JSON.parse(msg.data)
        setMessages([...messages, <p className="chat-window__message" key={count}>{message.messageInut}</p>])
    }

    useEffect(() => {
        console.log(messages)
    }, [messages])

    const sendMessage = () => {
        client.send(JSON.stringify({
            userName: localStorage.getItem('userName'),
            messageInut: messageInut
        }))
        setMessageInput('')
    }

    return (
        <div className="chats-page">
            <div className="chats">
                <div className="chats__header">
                    <h1 className="chats__title">Chats</h1>
                    <button className="chats__add-button">+</button>
                </div>
                <div className="users">
                    <div className="users__user">
                        <h3 className="users__name">Username</h3>
                    </div>
                    <div className="users__user">
                        <h3 className="users__name">Username</h3>
                    </div>
                    <div className="users__user">
                        <h3 className="users__name">Username</h3>
                    </div>
                </div>
            </div>
            <div className="chat-window">
                <div className="chat-window__header">
                    <h2 className="chat-window__title">Username</h2>
                </div>
                <div className="chat-window__window">
                    {messages}
                    <div className="chat-window__input-block">
                        <input type="text" className="chat-window__input" placeholder="Enter message" onChange={event => setMessageInput(event.target.value)} value={messageInut}></input>
                        <button className="chat-window__send-button" onClick={() => sendMessage()}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chats
