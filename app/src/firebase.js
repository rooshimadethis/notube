import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// You can find these values in your Firebase Console -> Project Settings
const firebaseConfig = {
  apiKey: "AIzaSyCO6KFPYfTS61Y1EBCUSdIUwk9WvZYNeT4",
  authDomain: "notube-ee552.firebaseapp.com",
  projectId: "notube-ee552",
  storageBucket: "notube-ee552.firebasestorage.app",
  messagingSenderId: "459361316888",
  appId: "1:459361316888:web:5c6a734a76aad25639d36d",
  measurementId: "G-48WW0F49Z5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
