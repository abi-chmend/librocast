// import firebase from "./firebase"
// import "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDqSMPvorj0QIpvZNMRxLlKn2c3EWKQ_dI",
  authDomain: "librocast-be5ba.firebaseapp.com",
  databaseURL: "https://librocast-be5ba-default-rtdb.firebaseio.com",
  projectId: "librocast-be5ba",
  storageBucket: "librocast-be5ba.appspot.com",
  messagingSenderId: "785206405414",
  appId: "1:785206405414:web:6b0db8744d58815c81b9e7",
  measurementId: "G-W98GX6YLS4"
};

// JavaScript
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
// Code Snippets based on:
// https://blog.logrocket.com/build-crud-application-react-firebase-web-sdk-v9/

// Snippet to INSERT value to user database
/**
 import {db} from 'librocast-app/src/backend/src/firebase'
 import {collection, addDoc, Timestamp} from 'firebase/firestore'

 // insert into event handler. Adddoc automatically generates unique id for each
 // insertion.
 try {
    await addDoc(collection(db, 'users'), {
        username: USERNAME_HERE,
        friends: FRIENDS_HERE(Comma-Separated),
        books: BOOKS_HERE(Comma-Separated),
        achievements: ACHIEVEMENTS_HERE(Comma-Separated)
    })
} catch (err) {
    alert(err)
}
 */

// Snippet to QUERY and display value to user database
/**
 import {useState, useEffect} from 'react'
 import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
 import {db} from 'backend/src/firebase'

 // change variables as seen fit
 const [results, setResults] = useState([])

 // function to get all results from firestore user database in realtime
 useEffect(() => {
    const taskColRef = query(collection(db, 'users'), orderBy('created', 'desc'))
    onSnapshot(taskColRef, (snapshot) => {
        setResults(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        })))
    })
},[])

 // insert into element to display
 {results.map((result) => (
    <Result
        id={result.id}
        displayName={profile.displayName}
        bookshelf={result.data.bookshelf}
        followers={result.data.followers}
        following={result.data.following}
        achievements={result.data.goals}
        picture={result.data.picture}
    />
))}
 */

// Snippet to UPDATE value in user database
/**
 import { doc, updateDoc } from "firebase/firestore";
 import {db} from 'src/firebase'

 // function to update value in firestore user database
 const handleCheckedChange = async () => {
    const taskDocRef = doc(db, 'users', id)
    try{
      await updateDoc(taskDocRef, {
        field: UPDATED_VALUE
      })
    } catch (err) {
      alert(err)
    }
  }

 * // insert function into event handler
 */

// Snippet to DELETE value in user database
/**
 import { doc, updateDoc, deleteDoc} from "firebase/firestore";
 import {db} from 'src/firebase'

 // function to delete value in firestore user database
 const handleDelete = async () => {
      const taskDocRef = doc(db, 'users', id)
      try{
          await deleteDoc(taskDocRef)
      } catch (err) {
          alert(err)
      }
  }

 // insert function into event handler

 */

