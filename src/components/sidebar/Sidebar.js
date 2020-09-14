import React from 'react';
import '../../styles/Sidebar.css';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { IconButton, Avatar } from '@material-ui/core';
import SidebarChat from './SidebarChat';

function Sidebar() {
	return (
		<div className="sidebar">
			<div className="sidebar__header">
				<Avatar src="https://lh3.googleusercontent.com/ogw/ADGmqu_RYpHiOzqsuG8Z52kEekR1tN5_DgqFmk2oslv7=s83-c-mo" />
				<div className="sidebar__headerRight">
					<IconButton>
						<DonutLargeIcon />
					</IconButton>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>
			<div className="sidebar__search">
				<div className="sidebar__searchContainer">
					<SearchOutlinedIcon />
                    <input type="text" placeholder={`Search`}/>
				</div>
			</div>
            <div className="sidebar__chats">
                <SidebarChat/>
                <SidebarChat/>
            </div>
		</div>
	);
}

export default Sidebar;
