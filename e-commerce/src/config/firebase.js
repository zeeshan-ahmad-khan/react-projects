import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBUZi5ffqaN8z_yhIxBKFimae5P82XDFz8",
    authDomain: "cardverse-179d7.firebaseapp.com",
    projectId: "cardverse-179d7",
    storageBucket: "cardverse-179d7.appspot.com",
    messagingSenderId: "729013306749",
    appId: "1:729013306749:web:c09515b50a3f96cf073814"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// https://cardverse-179d7-default-rtdb.firebaseio.com/json