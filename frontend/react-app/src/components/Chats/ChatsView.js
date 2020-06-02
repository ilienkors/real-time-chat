import React from 'react'
import { LeftPanel } from './LeftPanel'
import { ChatWindow } from './ChatWindow'

const ChatsView = () => {
    return (
        <div className="chats-page">
            <LeftPanel />
            <ChatWindow />
        </div>
    )
}

export default ChatsView
