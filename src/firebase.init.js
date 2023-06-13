// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvkIRMu-WW_nfAdpogj02fXoDScgA8Ges",
  authDomain: "ielts-proficiency-8e24f.firebaseapp.com",
  projectId: "ielts-proficiency-8e24f",
  storageBucket: "ielts-proficiency-8e24f.appspot.com",
  messagingSenderId: "1040794209673",
  appId: "1:1040794209673:web:5fa73f95d9a0b46d04e558"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;