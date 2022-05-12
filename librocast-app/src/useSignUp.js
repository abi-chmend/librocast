import { useState } from "react";
import { useAuthContext } from "./useAuthContext"
import { auth, db} from './utils/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

export const useSignUp = () => {
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()


    const signup = (email, password, displayName, picture) => {
        setError(null)
        console.log('signing up....')
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                dispatch({ type: 'LOGIN', payload: res.user})
                console.log('user signed up:', res.user)
                setDoc(doc(db, 'users', res.user.uid),{
                    book_reading: "",
                    books_read: 0,
                    bookshelf: [],
                    displayName,
                    email,
                    favorite_genres:[],
                    followers:[],
                    following:[],
                    goals:[],
                    picture
                }).then((res) => {
                    window.location.href = '/onboard'
                })
            })
            .catch((err) => {
                setError(err.message)
            })
    }

    return { error, signup }
}