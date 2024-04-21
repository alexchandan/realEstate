// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mernestate-c00a0.firebaseapp.com",
    projectId: "mernestate-c00a0",
    storageBucket: "mernestate-c00a0.appspot.com",
    messagingSenderId: "307917293304",
    appId: "1:307917293304:web:c1d51c277b7bf2626edd0d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);