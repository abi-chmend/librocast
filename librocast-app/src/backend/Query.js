import {useState, useEffect} from 'react'
import {collection, query, onSnapshot, where} from "firebase/firestore"
import {db} from '../utils/firebase.js'
import {getAuth} from "firebase/auth";

/**
 * This file contains variations of firestore queries
 * @returns a list of documents that match the corresponding query. This list can be iterated over
 * with the map() function. Each document contains an identifier id (document.id) and various fields
 * (document.data.field)
 */


export function GetUserProfile() {
    const auth = getAuth();
    const user = auth.currentUser;
    // store matching user profile
    const [userProfile, setUserProfile] = useState([])

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        const userID = user.uid;
        const taskColRef = query(collection(db, 'users'), where("__name__", "==", userID))
        onSnapshot(taskColRef, (snapshot) => {
            setUserProfile(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])

    return userProfile
}

export function GetUserPosts() {
    // store matching user posts
    const [userPosts, setUserPosts] = useState([])

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        const userID = user.uid;
        const taskColRef = query(collection(db, 'posts'), where("user_id", "==", userID))
        onSnapshot(taskColRef, (snapshot) => {
            setUserPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    },[])

    return userPosts
}