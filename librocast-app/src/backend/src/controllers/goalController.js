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