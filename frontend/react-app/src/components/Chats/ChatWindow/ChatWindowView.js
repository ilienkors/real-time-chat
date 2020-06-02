import React from 'react'

const ChatWindowView = () => {
    return (
        <div className="chat-window">
            <div className="chat-window__header">
                <h2 className="chat-window__title">Chat</h2>
            </div>
            <div className="chat-window__window" id="window">
                <div className="chat-window__input-block">
                    <input type="text" className="chat-window__input" placeholder="Enter message"></input>
                    <button className="chat-window__send-button">Send</button>
                    <input type="file" className="chat-window__send-button" id='file' />
                    <button className="chat-window__send-button">Send file</button>
                    <button className="chat-window__send-button">Audio</button>
                </div>
            </div>
        </div>
    )
}

export default ChatWindowView
