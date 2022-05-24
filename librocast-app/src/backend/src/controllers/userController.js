import { db, admin } from "../firestore";
import results from "../data/csvParser";

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
    user = await db.collection("users").doc(userID);
    friend = await db.collection("users").doc(fid);
    user.update({
      following: admin.firestore.FieldValue.arrayUnion(fid),
    });
    friend.update({
      followers: admin.firestore.FieldValue.arrayUnion(userID),
    });
    res.send(userID + " started to follow " + fid);
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
    user = await db.collection("users").doc(userID);
    friend = await db.collection("users").doc(fid);
    user.update({
      following: admin.firestore.FieldValue.arrayRemove(fid),
    });
    friend.update({
      followers: admin.firestore.FieldValue.arrayRemove(userID),
    });
    res.send(userID + " is not unfollowing " + fid);
  }
};

export const newPost = async (req, res) => {
  const { userID, book_id, contents } = req.params;
  // const book = results.filter((o) => {return o.id === book_id});
  try{
      const res = await db.collection('posts').add({
          book_id : book_id,
          contents : contents,
          user_id : userID
          //book_title : book.title,
          //book_img : book.cover_link
      });
      res.send("Added document with ID: " , res.id);
  } catch (err) {
      // alert(err)
  }
};