// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };
const firebaseConfig = {
    apiKey: "AIzaSyAdICWmJT1uBSYikCV9wQPlabRzM5VhjbE",
    authDomain: "models-56671.firebaseapp.com",
    projectId: "models-56671",
    storageBucket: "models-56671.firebasestorage.app",
    messagingSenderId: "832579126289",
    appId: "1:832579126289:web:b43b39d957af762d649db0"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export  const auth = getAuth(app);