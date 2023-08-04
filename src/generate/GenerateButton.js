import { Button } from '@chakra-ui/react';

const GenerateButton = ({ onClick }) => {
	return (
		<Button
			colorScheme="blue"
			position={'absolute'}
			onClick={onClick}
			zIndex="100"
		>
			Generate
		</Button>
	);
};

export default GenerateButton;
