import styles from '../styles/auth';

import { ContextProvider } from '../context'

export default function App({ Component, pageProps }) {
  return (
    <div style={styles.background}>


      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>

    </div>
  );
}
