// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0ObJnb1RhMxanK5qOo_jM2cOpFr_6dZQ",
  authDomain: "notes-app-24b09.firebaseapp.com",
  projectId: "notes-app-24b09",
  storageBucket: "notes-app-24b09.appspot.com",
  messagingSenderId: "695673696990",
  appId: "1:695673696990:web:73cd255e1c607c29f5884f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
