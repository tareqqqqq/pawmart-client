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
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6b3HXJh8VxMspE_cehEwM7Vjg0Dd37fA",
  authDomain: "pawmart-94f37.firebaseapp.com",
  projectId: "pawmart-94f37",
  storageBucket: "pawmart-94f37.firebasestorage.app",
  messagingSenderId: "756211596171",
  appId: "1:756211596171:web:aa2ee0c575b0fcda784d8e"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export  const auth = getAuth(app);