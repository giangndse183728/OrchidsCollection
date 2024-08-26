// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth, signInWithPopup} from  "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqHb9jnbpRa_UUUJm8XY3Iqx9oB8N0o8s",
  authDomain: "react-6cb6d.firebaseapp.com",
  projectId: "react-6cb6d",
  storageBucket: "react-6cb6d.appspot.com",
  messagingSenderId: "212060164537",
  appId: "1:212060164537:web:5617a1ada411bb5abea668"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
        .then((result) => {
            // Successful sign-in
            const token = result.user.accessToken;
            const user = result.user;
            localStorage.setItem('authToken', token);
            localStorage.setItem('userPhoto', user.photoURL);
            localStorage.setItem('userName', user.displayName);
            localStorage.setItem('userEmail', user.email);
            console.log('Google sign-in successful:', result);
            return result;
        })
        .catch((error) => {
            // Handle Errors here.
            console.error('Error during Google sign-in:', error);
            throw error;
        });
};