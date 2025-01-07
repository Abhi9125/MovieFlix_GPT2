// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhZdcZEFnqTa64hpdpcSbqYLm3JCMWb-8",
  authDomain: "movieflixwithgpt-2.firebaseapp.com",
  projectId: "movieflixwithgpt-2",
  storageBucket: "movieflixwithgpt-2.firebasestorage.app",
  messagingSenderId: "1017681292349",
  appId: "1:1017681292349:web:e71f0ca2f054338547ce54",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
