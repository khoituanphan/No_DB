import { Button } from '@chakra-ui/react';

const GenerateButton = ({ onClick, children }) => {
	return (
		<Button
			// colorScheme="blue"
			// position={'absolute'}
			onClick={onClick}
			// zIndex="100"
			bg="#726dfe"
			color="white"
			mb="16px"
			ml={'auto'}
			mr="16px"
			_hover={{ bg: '#5c59e6' }}
			// width={'100px'}
		>
			{children}
		</Button>
	);
};

export default GenerateButton;
