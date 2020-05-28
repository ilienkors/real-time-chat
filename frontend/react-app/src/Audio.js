import React, { useEffect } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:5000/audio/1234/4567');

const Audio = () => {

    useEffect(() => {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        }
        client.onmessage = msg => {
            var url = URL.createObjectURL(msg.data);
            console.log(url)
            var preview = document.createElement('audio');
            preview.controls = true;
            preview.src = url;
            document.body.appendChild(preview);
        }
    }, [])



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
                    console.log('yes')
                    chunks.push(e.data);
                };
                recorder.onstop = function (e) {
                    const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
                    chunks = [];
                    client.send(blob)
                }
                recorder.start();
            });
        }
    }


    return (
        <div>
            <button className="chat-window__send-button" onClick={() => sendAudio()}>Audio</button>
        </div>
    )
}

export default Audio
