import '../styles/globals.scss';
import { ChakraProvider } from '@chakra-ui/react';
import { ContextProvider } from '../context';

export default function App({ Component, pageProps }) {
	return (
		<>
			<ChakraProvider>
				<ContextProvider>
					<Component {...pageProps} />
				</ContextProvider>
			</ChakraProvider>
		</>
	);
}
