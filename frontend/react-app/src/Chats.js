import React, { useState, useEffect } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";

//const client = new W3CWebSocket('ws://127.0.0.1:5000');
const sendAudioClient = new W3CWebSocket('ws://127.0.0.1:5000/audio');
let count = 0

const Chats = () => {
    const [messages, setMessages] = useState([])
    const [messageInut, setMessageInput] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)

    useEffect(() => {
        /*client.onopen = () => {
            console.log('WebSocket Client Connected');
        }*/
        sendAudioClient.onopen = () => {
            console.log('WebSocket Audio Client Connected');
        }
    }, [])

    /*client.onmessage = msg => {
        console.log('onMes')
        count++
        let message = JSON.parse(msg.data)
        setMessages([...messages, <p className="chat-window__message" key={count}>{message.messageInut}</p>])
    }*/

    sendAudioClient.onmessage = msg => {
        let window = document.getElementById('window')
        let url = URL.createObjectURL(msg.data);
        console.log(url)
        let preview = document.createElement('audio');
        preview.controls = true;
        preview.src = url;
        window.appendChild(preview);
    }

    useEffect(() => {
        console.log(messages)
    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault()
        /*client.send(JSON.stringify({
            userName: localStorage.getItem('userName'),
            messageInut: messageInut
        }))*/
        setMessageInput('')
    }

    const fileHandler = (event) => {
        setSelectedFile(event.target.files[0])
        console.log(event.target.files[0])
    }

    let recorder, gumStream
    const sendAudio = () => {
        if (recorder && recorder.state === "recording") {
            recorder.stop();
            gumStream.getAudioTracks()[0].stop();
        } else {
            navigator.mediaDevices.getUserMedia({
                audio: true
            }).then(function (stream) {
                let chunks = []
                gumStream = stream;
                recorder = new MediaRecorder(stream);
                recorder.ondataavailable = function (e) {
                    chunks.push(e.data);
                };
                recorder.onstop = function (e) {
                    const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
                    chunks = [];
                    sendAudioClient.send(blob)
                }
                recorder.start();
            });
        }
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
                <div className="chat-window__window" id="window">
                    {messages}
                    <form className="chat-window__input-block" onSubmit={(event) => sendMessage(event)}>
                        <input type="text" className="chat-window__input" placeholder="Enter message" onChange={event => setMessageInput(event.target.value)} value={messageInut}></input>
                        <input type="file" className="chat-window__send-button" onChange={event => fileHandler(event)} />
                        <button className="chat-window__send-button" onClick={() => sendAudio()}>Audio</button>
                        <button type="submit" className="chat-window__send-button">Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Chats
