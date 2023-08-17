import { useState } from 'react';

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	FormControl,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	FormLabel,
	Text,
	Select,
	Flex,
	CircularProgress,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const LoadingOverlay = () => {
	return (
		<Flex
			h="100%"
			w="100%"
			alignItems={'center'}
			justifyContent={'center'}
			position="absolute"
			backgroundColor={'rgba(0,0,0,0.5)'}
		>
			<CircularProgress isIndeterminate color="purple.300" />
		</Flex>
	);
};

const GeneratedText = ({ returnedData }) => {
	return <Flex flexDirection={'column'}></Flex>;
};

const GenerateFrame = ({
	isOpen,
	onClose,
	chatsList,
	generateSummary,
	loading,
	returnedData,
}) => {
	console.log('chatsList: ', chatsList);
	const [chat, setChat] = useState(null);
	const [numMessages, setNumMessages] = useState(5);

	const postMessages = async () => {
		const data = {
			chat_id: chat,
			num_messages: numMessages,
		};

		const res = await fetch('/api/postMessagesTest', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		console.log(res);
		return res;
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={loading ? () => {} : onClose}
			isCentered
			size={'2xl'}
			height="400px"
		>
			<ModalOverlay />
			<ModalContent color="white" bg="#31343d">
				{loading ? <LoadingOverlay /> : null}
				{/* <LoadingOverlay /> */}
				<ModalHeader>Create Summary</ModalHeader>
				<ModalCloseButton isDisabled={loading} />
				<ModalBody>
					<Flex height="60px" alignItems={'center'}>
						<Text mr="16px">You are about to generate a summary of chat</Text>
						<Select
							// color="white"
							id="chat-select"
							onChange={(e) => setChat(e.target.value)}
							width={'300px'}
							isDisabled={loading}
						>
							{chatsList?.map((chat) => (
								<option
									value={chat}
									style={{
										color: 'black',
										backgroundColor: 'white',
									}}
								>
									{chat.title}
								</option>
							))}
						</Select>
					</Flex>

					<Flex height="60px" alignItems={'center'}>
						<FormLabel>
							Input the number of messages you want to summarize:
						</FormLabel>
						<NumberInput
							defaultValue={50}
							min={10}
							max={200}
							isDisabled={loading}
						>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					</Flex>
					{/* {returnedData ? : null} */}
					<Flex></Flex>
				</ModalBody>
				{returnedData ? null : (
					<ModalFooter>
						<Button
							bg="#726dfe"
							onClick={() => generateSummary()}
							color={'white'}
							isDisabled={loading}
						>
							Generate
						</Button>
						{/* <Button onClick={() => postMessages()}>Post Message</Button> */}
					</ModalFooter>
				)}
			</ModalContent>
		</Modal>
	);
};

export default GenerateFrame;
