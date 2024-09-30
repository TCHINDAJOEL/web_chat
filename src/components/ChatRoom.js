// src/components/ChatRoom.js
import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore.collection('messages')
      .orderBy('createdAt')
      .onSnapshot(snapshot => {
        const messages = snapshot.docs.map(doc => doc.data());
        setMessages(messages);
      });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index}>
          <p>{msg.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatRoom;