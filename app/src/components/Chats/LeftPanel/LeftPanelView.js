import React from 'react'

const LeftPanelView = () => {
    return (
        <div className="chats">
            <div className="chats__header">
                <input placeholder="Add user"></input>
                <button className="chats__add-button">+</button>
            </div>
            <div className="users">
                <div className="users__user">
                    <h3 className="users__name">Username</h3>
                </div>
            </div>
        </div>
    )
}

export default LeftPanelView
