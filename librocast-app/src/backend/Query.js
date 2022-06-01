import {useState, useEffect} from 'react'
import {collection, query, onSnapshot, where, getDocs} from "firebase/firestore"
import {db} from '../utils/firebase.js'
import {getAuth} from "firebase/auth";

/**
 * This file contains variations of firestore queries
 * @returns an array of documents that match the corresponding query. This can be iterated over
 * with the map() function. Each document contains an identifier id (document.id) and various fields
 * (document.data.field). The list can be empty if there are no matches in the database.
 */
export function GetUserProfile(userID) {
    if (arguments.length !== 1) {
        throw("Invalid number of arguments: GetUserProfile(userID) requires a user's unique id")
    }
    // store matching user profile
    const [userProfile, setUserProfile] = useState([])

    useEffect(() => {
        if (userID != null) {
            const taskColRef = query(collection(db, 'users'), where("__name__", "==", userID))
            onSnapshot(taskColRef, (snapshot) => {
                setUserProfile(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
        }
    }, [userID])

    return userProfile
}

export function GetUserPosts(userID) {
    if (arguments.length !== 1) {
        throw("Invalid number of arguments: GetUserPosts(userID) requires a user's unique id")
    }
    // store matching user posts
    const [userPosts, setUserPosts] = useState([])

    useEffect(() => {
        if (userID != null) {
            const taskColRef = query(collection(db, 'posts'), where("user_id", "==", userID))
            
            onSnapshot(taskColRef, (snapshot) => {
                setUserPosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
        }
    },[userID])
    return userPosts
}
