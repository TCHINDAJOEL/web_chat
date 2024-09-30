// src/components/SendMessage.js
import React, { useState } from 'react';
import { firestore, auth } from '../firebase';
import firebase from 'firebase/compat/app';

const SendMessage = () => {
  const [message, setMessage] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await firestore.collection('messages').add({
      text: message,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setMessage('');
  };

  return (
    <form onSubmit={sendMessage}>
      <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Say something..." />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;