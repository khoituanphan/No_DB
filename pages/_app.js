import styles from '../styles/auth.module.css';

import { ContextProvider } from '../context';

export default function App({ Component, pageProps }) {
	return (
		<div className={styles.background}>
			<ContextProvider>
				<Component {...pageProps} />
			</ContextProvider>
		</div>
	);
}
