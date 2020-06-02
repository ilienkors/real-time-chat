import React, { useState, useEffect } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";

const userUuid = localStorage.getItem('userUuid')
const chatUuid = localStorage.getItem('chatUuid')

const sendMessageClient = new W3CWebSocket('ws://127.0.0.1:5000/message/' + chatUuid + '/' + userUuid);
const sendFileClient = new W3CWebSocket('ws://127.0.0.1:5000/file/' + chatUuid + '/' + userUuid);
const sendAudioClient = new W3CWebSocket('ws://127.0.0.1:5000/audio/' + chatUuid + '/' + userUuid);

let key = 0
const Chats = () => {
    const [messages, setMessages] = useState([])
    const [messageInut, setMessageInput] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)

    useEffect(() => {
        sendMessageClient.onopen = () => {
            console.log('WebSocket Message Client Connected');
        }
        sendAudioClient.onopen = () => {
            console.log('WebSocket Audio Client Connected');
        }
        sendFileClient.onopen = () => {
            console.log('WebSocket File Client Connected')
        }
    }, [])

    const sendMessage = (event) => {
        event.preventDefault()
        sendMessageClient.send(JSON.stringify({ userUuid, messageInut }))
        setMessageInput('')
    }

    sendMessageClient.onmessage = msg => {
        key++
        let message = JSON.parse(msg.data)
        console.log(message)
        setMessages([...messages, <p className="chat-window__message" key={key}>{message.userUuid + ': ' + message.messageInut}</p>])
    }

    const fileHandler = (event) => {
        event.preventDefault()
        setSelectedFile(event.target.files[0])
    }

    const sendFile = () => {
        let blob = new Blob([selectedFile], { type: selectedFile.type });
        sendFileClient.send(blob)
        console.log(blob)
    }

    sendFileClient.onmessage = msg => {
        key++
        let url = URL.createObjectURL(msg.data);
        console.log(msg.data)
        setMessages([...messages, <p className="chat-window__message" key={key}><a href={url} download={'file.svg'}>Download File</a></p>])
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

    sendAudioClient.onmessage = msg => {
        key++
        console.log(msg)
        let url = URL.createObjectURL(msg.data);
        setMessages([...messages, <p className="chat-window__message" key={key}><audio controls={true} src={url} /></p>])
    }

    return (
        <div className="chats-page">
            {/*<div className="chats">
                <div className="chats__header">
                    <input placeholder="Add user"></input>
                    <button className="chats__add-button">+</button>
                </div>
                <div className="users">
                    <div className="users__user">
                        <h3 className="users__name">Username</h3>
                    </div>
                </div>
    </div>*/}
            <div className="chat-window">
                <div className="chat-window__header">
                    <h2 className="chat-window__title">Chat</h2>
                </div>
                <div className="chat-window__window" id="window">
                    {messages}
                    <div className="chat-window__input-block">
                        <input type="text" className="chat-window__input" placeholder="Enter message" onChange={event => setMessageInput(event.target.value)} value={messageInut}></input>
                        <button className="chat-window__send-button" onClick={(event) => sendMessage(event)}>Send</button>
                        <input type="file" className="chat-window__send-button" id='file' onChange={(event) => fileHandler(event)} />
                        <button className="chat-window__send-button" onClick={() => sendFile()}>Send file</button>
                        <button className="chat-window__send-button" onClick={() => sendAudio()}>Audio</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chats
