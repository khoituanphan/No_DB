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
	Menu,
	Select,
	MenuButton,
	MenuList,
	MenuItem,
	Flex,
} from '@chakra-ui/react';

import { ChevronDownIcon } from '@chakra-ui/icons';

const GenerateFrame = ({ isOpen, onClose, chatsList }) => {
	console.log('chatsList: ', chatsList);
	const [chat, setChat] = useState(null);
	const [numMessages, setNumMessages] = useState(5);

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			isCentered
			size={'2xl'}
			height="400px"
		>
			<ModalOverlay />
			<ModalContent color="white" bg="#31343d">
				<ModalHeader>Create Summary</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Flex height="60px" alignItems={'center'}>
						<Text mr="16px">You are about to generate a summary of chat</Text>
						<Select
							// color="white"
							id="chat-select"
							onChange={(e) => setChat(e.target.value)}
							width={'300px'}
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
						<NumberInput defaultValue={5} min={1} max={200}>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					</Flex>
				</ModalBody>

				<ModalFooter>
					<Button bg="#726dfe" onClick={onClose} color={'white'}>
						Generate
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default GenerateFrame;
