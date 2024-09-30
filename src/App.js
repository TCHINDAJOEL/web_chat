// src/App.js
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Auth from './components/Auth';
import ChatRoom from './components/ChatRoom';
import SendMessage from './components/SendMessage';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {user ? (
        <>
          <ChatRoom />
          <SendMessage />
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;