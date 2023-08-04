import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { Context } from '../../context';
import {
	Box,
	Flex,
	Form,
	FormControl,
	Button,
	Input,
	Text,
	useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const AuthPage = () => {
	const { username, setUsername, secret, setSecret } = useContext(Context);
	const router = useRouter();
	// console.log(process.env.PRIVATE_KEY);
	const toast = useToast();

	function onSubmit(e) {
		e.preventDefault();

		if (username.length === 0 || secret.length === 0) return;
		// console.log(username, secret);

		axios
			.put(
				'https://api.chatengine.io/users/',
				{ username, secret },
				{ headers: { 'Private-Key': '2d30e6b4-bc9b-4419-a61d-69ab57a8fb5a' } }
			)
			.then((response) => {
				router.push('/chats');
			})
			.catch((error) => {
				console.error(error);
				toast({
					position: 'top',
					variant: 'solid',
					isClosable: true,
					description: 'Invalid username or password',
					status: 'error',
				});
			});
	}

	return (
		<Flex
			justifyContent={'center'}
			alignItems={'center'}
			h="100vh"
			w="100vw"
			bg={'linear-gradient(150deg, #d9dbe2, #808aac 100%, #282d39 0)'}
		>
			<Flex
				flexDir={'column'}
				alignItems="center"
				justifyContent={'center'}
				h="400px"
				aspectRatio={'16/10'}
				bg="#31343d"
				borderRadius={'20px'}
				padding={'32px'}
			>
				<Text marginBottom="32px" fontSize="3xl" color="white">
					ARIS Chat
				</Text>

				<form
					onSubmit={(e) => onSubmit(e)}
					style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Input
						placeholder="Email"
						onChange={(e) => setUsername(e.target.value)}
						margin={'8px 0'}
						width={'80%'}
						color={'white'}
						size={'lg'}
					/>
					<Input
						placeholder="Password"
						type="password"
						onChange={(e) => setSecret(e.target.value)}
						margin={'8px 0'}
						width={'80%'}
						color={'white'}
						size={'lg'}
					/>

					<Button
						type="submit"
						onClick={(e) => onSubmit(e)}
						// variant={'ghost.'}
						colorScheme="gray"
						marginTop="16px"
					>
						Login / Sign Up
					</Button>
				</form>
			</Flex>
		</Flex>
	);
};

export default AuthPage;
