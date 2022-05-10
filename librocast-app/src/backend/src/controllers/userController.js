import { db, admin } from "../firestore";

export const addFriend = async (req, res) => {
  const { userID, friendID } = req.params;
  let user = await db.collection("friendsList").doc(userID).get();
  if (!user.exists) {
    user.set({
      friendID: [],
    });
  }
  user = await db.collection("friendsList").doc(userID);
  user.update({
    friendID: admin.firestore.FieldValue.arrayUnion(friendID),
  });
  res.send("Successfully added friendID:" + friendID + " to userID:" + userID);
};

export const deleteFriend = async (req, res) => {
  const { userID, friendID } = req.params;
  let user = await db.collection("friendsList").doc(userID).get();
  if (!user.exists) {
    res.send("UserID: " + userID + " does not exist");
  } else {
    user = await db.collection("friendsList").doc(userID);
    user.update({
      bookID: admin.firestore.FieldValue.arrayRemove(friendID),
    });
    res.send(
      "Successfully deleted friendID:" + friendID + " from userID:" + userID
    );
  }
};
