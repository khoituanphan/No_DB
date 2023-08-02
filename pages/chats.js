import chats from '../styles/chats.module.css';
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
		}
	}, [username, secret]);

	if (!showChat) return <div />;

	return (
		<div className={chats.background}>
			<div style={{ maxWidth: '900px', margin: 'auto', padding: '30px' }}>
				<ChatEngine
					height="calc(100vh - 212px)"
					projectID="cf3629c6-c90a-4eed-b75c-212a6b54e1ec"
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
