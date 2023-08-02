import styles from '../styles/auth.module.css';

import React, { useContext } from 'react';
import { Context } from '../context';
import { useRouter } from 'next/router';

import axios from 'axios';

export default function Auth() {
	const { username, setUsername, secret, setSecret } = useContext(Context);
	const router = useRouter();

	function onSubmit(e) {
		e.preventDefault();

		if (username.length === 0 || secret.length === 0) return;

		axios
			.put(
				'https://api.chatengine.io/users/',
				{ username, secret },
				{ headers: { 'Private-Key': process.env.PRIVATE_KEY } }
			)
			.then((r) => {
				router.push('/chats');
			});
	}

	return (
		<>
			<head>
				<title>ARIS Chat Login</title>
			</head>
			<div className={styles.background}>
				<div className={styles.authContainer}>
					<form className={styles.authForm} onSubmit={(e) => onSubmit(e)}>
						<div className={styles.authTitle}>ARIS Chat</div>

						<input
							className={styles.textInput}
							placeholder="Email:"
							onChange={(e) => setUsername(e.target.value)}
						/>

						<input
							className={styles.textInput}
							placeholder="Password:"
							onChange={(e) => setSecret(e.target.value)}
						/>

						<button type="submit" className={styles.submitButton}>
							Login / Signup
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
