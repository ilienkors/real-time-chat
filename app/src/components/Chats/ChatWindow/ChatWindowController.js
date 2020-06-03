import React, { useState, useEffect } from 'react'
import ChatWindowView from './ChatWindowView'
import { w3cwebsocket as W3CWebSocket } from "websocket";

const login = localStorage.getItem('login')
const chatId = 1
const sendMessageClient = new W3CWebSocket('ws://127.0.0.1:5000/ws/startSocket/message/' + chatId + '/' + login);
const sendFileClient = new W3CWebSocket('ws://127.0.0.1:5000/ws/startSocket/file/' + chatId + '/' + login);
const sendAudioClient = new W3CWebSocket('ws://127.0.0.1:5000/ws/startSocket/audio/' + chatId + '/' + login);

let key = 0
const ChatWindowController = () => {
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
        sendMessageClient.send(JSON.stringify({ login, messageInut }))
        setMessageInput('')
    }

    sendMessageClient.onmessage = msg => {
        key++
        let message = JSON.parse(msg.data)
        console.log(message)
        setMessages([...messages, <p className="chat-window__message" key={key}>{message.login + ': ' + message.messageInut}</p>])
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

    return <ChatWindowView
        messages={messages}
        setMessageInput={setMessageInput}
        messageInut={messageInut}
        sendMessage={sendMessage}
        fileHandler={fileHandler}
        sendFile={sendFile}
        sendAudio={sendAudio} />
}

export default ChatWindowController
