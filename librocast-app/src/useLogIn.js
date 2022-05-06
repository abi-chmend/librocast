import { useState } from 'react';
import { useAuthContext } from "./useAuthContext"

import { auth } from './utils/firebase'
import { signInWithEmailAndPassword} from 'firebase/auth'

export const useLogIn = () => {
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()

    const login = (email, password) => {
        setError(null)
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                dispatch({type: 'LOGIN', payload: res.user})
                console.log('user logged in:', res.user)
                window.location.href = '/onboard';
            })
            .catch((err) => {
                alert("Invalid user ID and Password")
                setError(err.message)
            })
            .finally(() => {
            })
        }
    return { error, login }
}