import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1zVOUqoewU2MdJFC-cHGXOtFJpektieo",
  authDomain: "lovelesly-a4666.firebaseapp.com",
  projectId: "lovelesly-a4666",
  storageBucket: "lovelesly-a4666.firebasestorage.app",
  messagingSenderId: "110900939899",
  appId: "1:110900939899:web:7e38b11b04d2a0e2aee6de",
  measurementId: "G-L5QG6DW5Y3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);