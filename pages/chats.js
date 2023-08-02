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
	const chatId = router.query.chatId;
	const handleClick = async () => {
		const response = await fetch('/api/generateSum', {
			method: 'POST',
		});
		const json = await response.json();
		console.log('RESULT: ', json);
	};

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
		<>
			<head>
				<title>ARIS Chat Login</title>
			</head>
			<div
				style={{
					fontFamily: 'Satoshi',
				}}
			>
				<ChatEngine
					height="calc(100vh - 212px)"
					projectID={process.env.PROJECT_ID}
					userName={username}
					userSecret={secret}
					renderNewMessageForm={() => <MessageFormSocial />}
					onNewMessage={(chatId, message) => {
						// Do something with the new message here, like sending it to your API
						fetch('/api/postMessages', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(message),
						});
					}}
				/>
			</div>
			<div>
				<h1>This is where to generate summary</h1>
				<button className="button" onClick={handleClick}>
					Generate
				</button>
			</div>
		</>
	);
}
