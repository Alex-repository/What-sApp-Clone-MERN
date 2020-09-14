import React, { useState } from 'react';
import '../../styles/Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import MicIcon from '@material-ui/icons/Mic';
import axios from '../../axios';
function Chat({ messages }) {
	const [ input, setInput ] = useState('');
	const sendMessage = async (e) => {
		e.preventDefault();
		await axios.post('/api/messages/new', {
			message: input,
			name: 'Demo',
			timestamp: 'now',
			received: false
		});
		setInput('');
	};
	return (
		<div className="chat">
			<div className="chat__header">
				<Avatar />
				<div className="chat__headerInfo">
					<h3>Room name</h3>
					<p>Last seen at...</p>
				</div>
				<div className="chat__headerRight">
					<IconButton>
						<SearchOutlinedIcon />
					</IconButton>
					<IconButton>
						<AttachFileOutlinedIcon />
					</IconButton>
					<IconButton>
						<MoreVertOutlinedIcon />
					</IconButton>
				</div>
			</div>
			<div className="chat__body">
				{messages.map((message) => {
					return (
						<p key={message._id} className={`chat__message ${message.received && 'chat__reciever'}`}>
							<span className="chat__name">{message.name}</span>
							{message.message}
							<span className="chat__timestamp">
								{message.timestamp}
								{/* {new Date(message.timestamp?.toDate()).toUTCString()} */}
							</span>
						</p>
					);
				})}
			</div>
			<div className="chat__footer">
				<IconButton>
					<EmojiEmotionsIcon />
				</IconButton>
				<form>
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="type a message"
						type="text"
					/>
					<button onClick={sendMessage} type="submit">
						send message
					</button>
				</form>
				<IconButton>
					<MicIcon />
				</IconButton>
			</div>
		</div>
	);
}

export default Chat;
