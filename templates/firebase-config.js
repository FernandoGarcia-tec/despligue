// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDgmC8f19bp-Ab_EueWOO5XlLBUJjSWic",
  authDomain: "rutasabor-25dd3.firebaseapp.com",
  projectId: "rutasabor-25dd3",
  storageBucket: "rutasabor-25dd3.appspot.com",
  messagingSenderId: "778820080885",
  appId: "1:778820080885:web:8e8dbe3f0585e55a0d21bc",
  measurementId: "G-M7XZ1L6YTQ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
