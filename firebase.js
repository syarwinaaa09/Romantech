// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMXG2bGTRI2Kc0lki3GACp6MPv0hfwGwM",
  authDomain: "romantech-1e397.firebaseapp.com",
  projectId: "romantech-1e397",
  storageBucket: "romantech-1e397.appspot.com",
  messagingSenderId: "1050005367404",
  appId: "1:1050005367404:web:58e1a30bf9624b2a310649"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db }