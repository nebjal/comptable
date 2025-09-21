// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, TwitterAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfD2LNCTgxTee21BoIFGoytZ_6uy1-Yb8",
  authDomain: "devc-9d97b.firebaseapp.com",
  projectId: "devc-9d97b",
  appId: "1:10925717623:web:4858c47d91f5830a45ee72"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const twitterProvider = new TwitterAuthProvider();
