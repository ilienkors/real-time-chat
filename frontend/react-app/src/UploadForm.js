import React, { useState } from 'react'

const UploadForm = () => {
    //const [recorderState, setRecordState] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)

    const fileHandler = (event) => {
        setSelectedFile(event.target.files[0])
        console.log(event.target.files[0])

    }

    const uploadFile = async (event) => {
        console.log('upload')
        event.preventDefault()
        let formData = new FormData();
        formData.append('file', selectedFile)
        try {
            fetch('http://127.0.0.1:5000/uploadFile', {
                method: 'POST',
                body: formData,
            }).then((response) => {
                return response
            }).then((data) => {
                console.log('Успех:', data)
            });
        } catch (error) {
            console.error('Ошибка:', error)
        }
    }

    let recorder, gumStream
    const toggleRecording = () => {
        if (recorder && recorder.state === "recording") {
            recorder.stop();
            gumStream.getAudioTracks()[0].stop();
        } else {
            navigator.mediaDevices.getUserMedia({
                audio: true
            }).then(function (stream) {
                gumStream = stream;
                recorder = new MediaRecorder(stream);
                recorder.ondataavailable = function (e) {
                    // let testFile = (new File([e.data], 'test.mp3')
                    var url = URL.createObjectURL(e.data);
                    console.log(url)
                    var preview = document.createElement('audio');
                    preview.controls = true;
                    preview.src = url;
                    document.getElementById('music').href = URL.createObjectURL(e.data);
                    document.getElementById('music').download = 'test'
                    document.body.appendChild(preview);
                };
                recorder.start();
            });
        }
    }

    return (
        <div>
            <form encType="multipart/form-data" onSubmit={(event) => uploadFile(event)}>
                <input type='file' name='file' onChange={event => fileHandler(event)} />
                <button type='submit'>Submit</button>
            </form>
            <button id="recordButton" onClick={() => toggleRecording()}>Record/Stop</button>
            <a id="music">download</a>
        </div>
    )
}

export default UploadForm
