import { doc, updateDoc, addDoc, arrayUnion, collection } from "firebase/firestore";
import {db} from '../utils/firebase.js'
//import {db} from './src/firebase'

// function to create new goal, returning the new goal's id as a promise that can be accessed with .then
/*export async function InsertGoal(description) {
    try {
        const docRef = await addDoc(collection(db, 'goals'), {
            description
        })
        return docRef.id
    } catch (err) {
        alert(err)
    }
}
*/


// function to insert new goal for a user
export async function InsertNewUserGoal(userID, description, progress) {
    const taskDocRef = doc(db, 'users', userID)

    try{
        await addDoc(collection(db, 'goals'), {
            description
        }).then((docRef) => {
            const goal = {
                "goal_id" : docRef.id,
                "progress" : progress
            }
            updateDoc(taskDocRef, {
                f: arrayUnion(goal)
            })
        })
    } catch (err) {
        alert(err)
    }
}