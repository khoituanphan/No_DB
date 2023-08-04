import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../context';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import GenerateButton from '../generate/GenerateButton';
import GenerateFrame from '../generate/GenerateFrame';
import { useDisclosure } from '@chakra-ui/react';

const ChatEngine = dynamic(() =>
	import('react-chat-engine').then((module) => module.ChatEngine)
);
const MessageFormSocial = dynamic(() =>
	import('react-chat-engine').then((module) => module.MessageFormSocial)
);

const ChatList = dynamic(() =>
	import('react-chat-engine').then((module) => module.ChatList)
);

const ChatForm = dynamic(() =>
	import('react-chat-engine').then((module) => module.NewChatForm)
);

const CustomChatList = ({ chatAppState, onOpen }) => {
	console.log('PROPS: ', chatAppState);
	return (
		<>
			<ChatList {...chatAppState} />
			<GenerateButton onClick={onOpen} />
		</>
	);
};

const CustomChatForm = (props) => {
	return (
		<>
			<ChatForm {...props} />
		</>
	);
};

export default function ChatPage() {
	const { username, secret } = useContext(Context);
	const [showChat, setShowChat] = useState(false);

	const { isOpen, onOpen, onClose } = useDisclosure();

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
					renderNewChatForm={(creds) => <CustomChatForm {...creds} />}
				/>
			</div>
			<GenerateFrame isOpen={isOpen} onClose={onClose} />
		</>
	);
}
