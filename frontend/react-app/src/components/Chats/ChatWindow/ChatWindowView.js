import React from 'react'

const ChatWindowView = ({ messages, setMessageInput, messageInut, sendMessage, fileHandler, sendFile, sendAudio }) => {
    return (
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
    )
}

export default ChatWindowView
