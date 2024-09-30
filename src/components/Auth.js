// src/components/Auth.js
import React from 'react';
import { auth } from '../firebase';
import firebase from 'firebase/compat/app';

const Auth = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

export default Auth;