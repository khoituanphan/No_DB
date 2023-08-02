import chats from '../styles/chats';

import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import axios from "axios";

const ChatEngine = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatEngine)
);
const MessageFormSocial = dynamic(() =>
  import("react-chat-engine").then((module) => module.MessageFormSocial)
);

export default function Home() {
  const { username, secret } = useContext(Context);
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();
  const chatId = router.query.chatId;


  useEffect(() => {
    if (typeof document !== undefined) {
      setShowChat(true);
    }
  }, []);

  useEffect(() => {
    if (username === '' || secret === '') {
      router.push('/');
    } else {
      // Get all messages in the chat when the component mounts
      fetch(`https://api.chatengine.io/chats/${chatId}/messages/`, {
        method: 'GET',
        headers: {
          'Project-ID': 'cf3629c6-c90a-4eed-b75c-212a6b54e1ec',
          'User-Name': 'khoiphantuan98@gmail.com',
          'User-Secret': 'Khoituanphan98@'
        },
      })
      .then(response => response.json())
      .then(data => {
        // Send each message to your API
        data.forEach(message => {
          fetch('../pages/api/postMessages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
          });
        });
      });
    }
  }, [username, secret]);
  

  if (!showChat) return <div />;


  return (
    <div style={chats.background}>
      <div style={chats.chatbox}>
        <ChatEngine
          height="calc(100vh - 212px)"
          projectID="cf3629c6-c90a-4eed-b75c-212a6b54e1ec"
          userName={username}
          userSecret={secret}
          renderNewMessageForm={() => <MessageFormSocial />}
          onNewMessage={(chatId) => {
            fetch(`https://api.chatengine.io/chats/${chatId}/messages/latest/1/`, {
              method: 'GET',
              headers: {
                'Project-ID': 'cf3629c6-c90a-4eed-b75c-212a6b54e1ec',
                'User-Name': 'khoiphantuan98@gmail.com',
                'User-Secret': 'Khoituanphan98@'
              },
            })
            .then(response => response.json())
            .then(data => {
              // Send the new message data to your API
              fetch('../pages/api/postMessages', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data[0]),  // The first message is the latest
              });
            });
          }}
          
        />
      </div>
    </div>
  );
}
