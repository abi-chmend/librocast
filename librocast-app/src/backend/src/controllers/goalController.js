import {db} from "../firestore";
import {firestore} from "firebase-admin";

// Add Goal
export const newGoal = async (req, res) => {
    const { description } = req.params;
    try{
        const result = await db.collection('goals').add({
            description : description
        });
        res.send("Added document with ID: " + result.id);
    } catch (err) {
        res.send("err: " + err);
    }
};

// Update Goal
export const addComments = async (req, res) => {
    const { userID, goal_id, progress } = req.params;
    let user = await db.collection("users").doc(userID).get();
    if (!user.exists) {
        res.send("user_id: " + userID + " does not exist");
    } else {
        user = await db.collection("users").doc(userID);
        user.set({goals : {[userID] : progress}} , {merge: true});
        res.send(userID + " goal " + goal_id + " updated");
    }
};