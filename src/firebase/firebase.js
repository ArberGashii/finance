import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAUVBgaSopC5sBJWDMNEEyQDFX_2MpxoU",
  authDomain: "finance-3ff43.firebaseapp.com",
  projectId: "finance-3ff43",
  storageBucket: "finance-3ff43.firebasestorage.app",
  messagingSenderId: "511330773272",
  appId: "1:511330773272:web:af2faa213c3eab5eed166d",
  measurementId: "G-P6DPHERPF0",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const firebaseAuth = getAuth(app);
