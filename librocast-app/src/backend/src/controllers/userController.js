import { db, admin } from "../firestore";

// Follow a user if only if the given user and follower exits.
export const follow = async (req, res) => {
  const { userID, fid } = req.params;
  let user = await db.collection("users").doc(userID).get();
  let friend = await db.collection("users").doc(fid).get();
  if (!user.exists) {
    res.send("UserID: " + userID + " does not exist");
  } else if (!friend.exists) {
    res.send("Following ID: " + fid + " does not exist");
  } else {
    user.update({
      following: admin.firestore.FieldValue.arrayUnion(fid),
    });
    friend.update({
      followers: admin.firestore.FieldValue.arrayUnion(userID),
    });
    res.send(userID + " started to follow " + friend);
  }
};

// Unfollow a user if only if the given user and follower exits and user is
// follwing the given follower.
export const unfollow = async (req, res) => {
  const { userID, fid } = req.params;
  let user = await db.collection("users").doc(userID).get();
  let friend = await db.collection("users").doc(fid).get();
  if (!user.exists) {
    res.send("UserID: " + userID + " does not exist");
  } else if (!friend.exists) {
    res.send("Following ID: " + fid + " does not exist");
  } else {
    user.update({
      following: admin.firestore.FieldValue.arrayRemove(fid),
    });
    friend.update({
      followers: admin.firestore.FieldValue.arrayRemove(userID),
    });
    res.send(userID + " is not unfollowing " + friend);
  }
};
