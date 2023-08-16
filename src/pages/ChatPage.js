import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../context';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import GenerateButton from '../generate/GenerateButton';
import GenerateFrame from '../generate/GenerateFrame';
import { useDisclosure } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';

const ChatEngine = dynamic(() =>
	import('react-chat-engine').then((module) => module.ChatEngine)
);
const MessageFormSocial = dynamic(() =>
	import('react-chat-engine').then((module) => module.MessageFormSocial)
);

const ChatForm = dynamic(() =>
	import('react-chat-engine').then((module) => module.NewChatForm)
);

const CustomChatForm = ({ creds, handleModalOpen }) => {
	return (
		<Flex flexDirection={'column'}>
			<ChatForm {...creds} />
			<GenerateButton onClick={handleModalOpen}>Summarize</GenerateButton>
		</Flex>
	);
};

const getChats = async (creds, setChatList) => {
	const response = await fetch('https://api.chatengine.io/chats', {
		method: 'GET',
		headers: {
			'Project-ID': creds.projectID,
			'User-Name': creds.userName,
			'User-Secret': creds.userSecret,
		},
	});
	const json = await response.json();
	// setChatList(json);
	return json;
};

export default function ChatPage() {
	const [chatsList, setChatList] = useState(null);
	const [showChat, setShowChat] = useState(false);
	const [loading, setLoading] = useState(false);

	const [returnedData, setReturnedData] = useState(null); // [ { chatID: 1, summary: 'blah blah blah' }, ...
	const { username, secret } = useContext(Context);

	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const generateSummary = async () => {
		setLoading(true);
		const response = await fetch('/api/generateSum', {
			method: 'POST',
		});
		// TODO: add body and get data from chatengine
		const json = await response.json();

		setReturnedData(json);
		setLoading(false);

		console.log('RESULT: ', json);
		// return json;
	};

	useEffect(() => {
		if (username === '' || secret === '') {
			router.push('/');
		}
	}, [username, secret]);

	useEffect(() => {
		if (typeof document !== 'undefined') {
			setShowChat(true);
		}
	});

	useEffect(() => {
		if (!chatsList) {
			const res = getChats({
				projectID: 'cf3629c6-c90a-4eed-b75c-212a6b54e1ec',
				userName: username,
				userSecret: secret,
			});
			res
				.then((response) => {
					setChatList(response);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	});

	return (
		<>
			{showChat && (
				<>
					<div
						style={{
							fontFamily: 'Satoshi',
						}}
					>
						<ChatEngine
							height="100vh"
							projectID={'cf3629c6-c90a-4eed-b75c-212a6b54e1ec'}
							userName={username}
							userSecret={secret}
							renderNewMessageForm={() => <MessageFormSocial />}
							renderNewChatForm={(creds) => (
								<CustomChatForm creds={creds} handleModalOpen={onOpen} />
							)}
						/>
					</div>
					<GenerateFrame
						isOpen={isOpen}
						onClose={onClose}
						chatsList={chatsList}
						generateSummary={generateSummary}
						loading={loading}
					/>
				</>
			)}
		</>
	);
}
