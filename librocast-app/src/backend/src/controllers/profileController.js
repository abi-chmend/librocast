import { db, admin } from "../firestore";

// Edit bio of a user
export const editBio = async (req, res) => {
  const { userID, _bio } = req.params;
  let user = await db.collection("users").doc(userID).get();
  console.log(_bio);
  if (!user.exists) {
    res.send("UserID: " + userID + " does not exist");
  } else {
    user = await db.collection("users").doc(userID);
    user.update({
      bio: _bio,
    });
    res.send("Successfully updated bio of " + userID);
  }
};

// Edit profile picture of a user
export const editProfilePicture = async (req, res) => {
  const { userID, _picture } = req.params;
  let user = await db.collection("users").doc(userID).get();
  if (!user.exists) {
    res.send("UserID: " + userID + " does not exist");
  } else {
    user = await db.collection("users").doc(userID);
    user.update({
      picture: _picture,
    });
    res.send("Successfully updated picture of " + userID);
  }
};
