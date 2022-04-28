import { GoogleAuthProvider } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDmJ-DArGgOLubEJi0efGj8OI9Ksxfa1lk",
    authDomain: "chatchat-352c8.firebaseapp.com",
    projectId: "chatchat-352c8",
    storageBucket: "chatchat-352c8.appspot.com",
    messagingSenderId: "512669549156",
    appId: "1:512669549156:web:87441b7a7d1c4771c45571"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);