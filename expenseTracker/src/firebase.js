// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJwNT0cgS82tPKXhQL7h7Dd62Okn3D3zE",
  authDomain: "expensetracker-dfbd2.firebaseapp.com",
  projectId: "expensetracker-dfbd2",
  storageBucket: "expensetracker-dfbd2.firebasestorage.app",
  messagingSenderId: "936441444013",
  appId: "1:936441444013:web:fb7359faa2dd7e433cb824",
  measurementId: "G-YLKCHK9YDS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);