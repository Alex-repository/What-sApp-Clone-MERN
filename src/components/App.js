import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import Sidebar from './sidebar/Sidebar';
import Chat from './chatApp/Chat';
import Pusher from 'pusher-js';
import axios from '../axios';

function App() {
	const [ messages, setMessages ] = useState([]);

	useEffect(() => {
		axios.get('/api/messages/sync').then((response) => {
			console.log(response.data);
			setMessages(response.data);
		});
	}, []);

	useEffect(() => {
		const pusher = new Pusher('86e691ef0614fece6b8c', {
			cluster: 'mt1'
		});

		const channel = pusher.subscribe('messages');
		channel.bind('inserted', (newMessage) => {
			// alert(JSON.stringify(newMessage));
			setMessages([...messages, newMessage])
		});

		return () =>{
			channel.unbind_all();
			channel.unsubscribe();
		};
	}, [messages]);
console.log(messages)
	return (
		<div className="app">
			<div className="app__body">
				<Sidebar />
				<Chat messages={messages}/>
			</div>
		</div>
	);
}

export default App;
