import styles from '../styles/chats.module.css';
import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../context';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import axios from 'axios';
const ChatEngine = dynamic(() =>
	import('react-chat-engine').then((module) => module.ChatEngine)
);
const MessageFormSocial = dynamic(() =>
	import('react-chat-engine').then((module) => module.MessageFormSocial)
);

export default function Home() {
	const { username, secret } = useContext(Context);
	const [showChat, setShowChat] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (typeof document !== 'undefined') {
			setShowChat(true);
		}
	}, []);

	useEffect(() => {
		if (username === '' || secret === '') {
			router.push('/');
		} else {
			getChats({ projectID: process.env.PROJECT_ID }, (chatAppState) => {
				const { chats, activeChat } = chatAppState;
				chats[activeChat].on('message', (chatId, message) => {
					// Send the new message to your API
					fetch('/api/postMessage', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(message),
					});
				});
			});
		}
	}, [username, secret]);

	if (!showChat) return <div />;

	return (
		<div style={{ background: '#FAFAFA', height: '100vh' }}>
			<div style={{ maxWidth: '900px', margin: 'auto', padding: '30px' }}>
				<ChatEngine
					className={styles.chatContainer}
					projectID={process.env.PROJECT_ID}
					userName={username}
					userSecret={secret}
					renderNewMessageForm={() => <MessageFormSocial />}
					// onNewMessage={(chatId, message) => {
					// 	// Do something with the new message here, like sending it to your API
					// 	fetch('/api/postMessage', {
					// 		method: 'POST',
					// 		headers: {
					// 			'Content-Type': 'application/json',
					// 		},
					// 		body: JSON.stringify(message),
					// 	});
					// }}
				/>
			</div>
		</div>
	);
}
