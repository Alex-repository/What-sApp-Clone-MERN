import React from 'react'
import '../../styles/SidebarChat.css'
import { Avatar } from '@material-ui/core'

function SidebarChat() {
    return (
        <div className="sidebarChat">
            <Avatar src=''/>
            <div className="sidebarChat__info">
                <h2>Room name</h2>
                <p>Last message</p>
            </div>
        </div>
    )
}

export default SidebarChat
