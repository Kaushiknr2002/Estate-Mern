// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-mern-4dff6.firebaseapp.com",
  projectId: "estate-mern-4dff6",
  storageBucket: "estate-mern-4dff6.firebasestorage.app",
  messagingSenderId: "1017423231922",
  appId: "1:1017423231922:web:6eea276266158a8a5b82ab"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);