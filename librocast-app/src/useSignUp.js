import { useState } from "react";
import { useAuthContext } from "./useAuthContext"
import { auth, db } from './utils/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

export const useSignUp = () => {
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()


    const signup = (email, password, displayName) => {
        setError(null)
        console.log('signing up....')
        createUserWithEmailAndPassword(auth, email, password, displayName)
            .then((res) => {
                dispatch({ type: 'LOGIN', payload: res.user})
                console.log('user signed up:', res.user)
                setDoc(doc(db, 'users', res.user.uid),{
                    email,
                    displayName
                })
                window.location.href = '/onboard'
            })
            .catch((err) => {
                setError(err.message)
            })
    }

    return { error, signup }
}