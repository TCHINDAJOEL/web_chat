// src/firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCmNeAP6Kbhk6jb3XMRFGU719bQwlSK9YA",
  authDomain: "game-chat-3988b.firebaseapp.com",
  projectId: "game-chat-3988b",
  storageBucket: "game-chat-3988b.appspot.com",
  messagingSenderId: "226536125260",
  appId: "1:226536125260:web:87fbf3407ccdb2bc8195e9"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };