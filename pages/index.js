import styles from '../styles/auth';

import React, { useContext } from "react"
import { Context } from "../context"
import { useRouter } from "next/router"

import axios from "axios"


export default function Auth() {
  const{ username, setUsername, secret, setSecret} = useContext(Context);
  const router = useRouter();


function onSubmit(e) {
  e.preventDefault();

  if (username.length === 0 || secret.length === 0) return;

  axios.put(
    "https://api.chatengine.io/users/",
    {username, secret},
    {headers: { "Private-Key": "2d30e6b4-bc9b-4419-a61d-69ab57a8fb5a"}}
  )
  .then((r) => {
    router.push("/chats");
  });
}

  return (
    <div style={styles.background}>
      <div style={styles.authContainer}>
        <form style={styles.authForm} onSubmit={(e) => onSubmit(e)}>
          <div style={styles.authTitle}>SECOND</div>

              <input 
                style={styles.textInput}
                placeholder='Email:'
                onChange={(e) => setUsername(e.target.value)}
              />

              <input 
                style={styles.textInput}
                placeholder='Password:'
                onChange={(e) => setSecret(e.target.value)}
              />

              <button type='submit' style={styles.submitButton} >
                Login / Signup
              </button>
        </form>
      </div>
    </div>

  )
}
