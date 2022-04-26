// import firebase from "./firebase"
// import "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDqSMPvorj0QIpvZNMRxLlKn2c3EWKQ_dI",
  authDomain: "librocast-be5ba.firebaseapp.com",
  projectId: "librocast-be5ba",
  storageBucket: "librocast-be5ba.appspot.com",
  messagingSenderId: "785206405414",
  appId: "1:785206405414:web:6b0db8744d58815c81b9e7",
  measurementId: "G-W98GX6YLS4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// export const db = firebase.firestore();
export const db = getFirestore();
export const auth = getAuth();
// export default firebase;
