// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxm4wE17ra1Xy4a1QEGthOD4UYaIuXLFk",
  authDomain: "netflixgpt-4a2f0.firebaseapp.com",
  projectId: "netflixgpt-4a2f0",
  storageBucket: "netflixgpt-4a2f0.firebasestorage.app",
  messagingSenderId: "440571295053",
  appId: "1:440571295053:web:ff3fc7902d6d4d4368f304",
  measurementId: "G-EYT3J75TNE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();