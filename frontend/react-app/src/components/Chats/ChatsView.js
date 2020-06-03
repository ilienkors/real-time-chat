import React from 'react'
import { LeftPanel } from './LeftPanel'
import { ChatWindow } from './ChatWindow'

const ChatsView = ({login}) => {
    return (
        <div className="chats-page">
            <LeftPanel />
            <ChatWindow login={login}/>
        </div>
    )
}

export default ChatsView
