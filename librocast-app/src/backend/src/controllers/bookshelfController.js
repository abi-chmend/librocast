import { db, admin } from "../firestore";

export const addBook_to_be_read = async (req, res) => {
  const { userID, bookID } = req.params;
  let user = await db.collection("users").doc(userID).get();
  if (!user.exists) {
    res.send("UserID: " + userID + " does not exist");
  } else {
    user = user = await db.collection("users").doc(userID);
    user.update({
      to_be_read: admin.firestore.FieldValue.arrayUnion(bookID),
    });
    res.send(bookID + " was added to " + userID + " 's to_be_Read bookshelf");
  }
};

export const addBook_in_progress = async (req, res) => {
  const { userID, bookID } = req.params;
  let user = await db.collection("users").doc(userID).get();
  if (!user.exists) {
    res.send("UserID: " + userID + " does not exist");
  } else {
    user = user = await db.collection("users").doc(userID);
    user.update({
      bookshelf: admin.firestore.FieldValue.arrayUnion(bookID),
    });
    res.send(bookID + " was added to " + userID + " 's in_progress bookshelf");
  }
};

export const addBook_completed = async (req, res) => {
  const { userID, bookID } = req.params;
  let user = await db.collection("users").doc(userID).get();
  if (!user.exists) {
    res.send("UserID: " + userID + " does not exist");
  } else {
    user = user = await db.collection("users").doc(userID);
    user.update({
      read: admin.firestore.FieldValue.arrayUnion(bookID),
    });
    res.send(bookID + " was added to " + userID + " 's completed bookshelf");
  }
};

export const removeBook_to_be_read = async (req, res) => {
  const { userID, bookID } = req.params;
  let user = await db.collection("users").doc(userID).get();
  if (!user.exists) {
    res.send("UserID: " + userID + " does not exist");
  } else {
    user = user = await db.collection("users").doc(userID);
    user.update({
      to_be_read: admin.firestore.FieldValue.arrayRemove(bookID),
    });
    res.send(
      bookID + " was removed from " + userID + " 's to_be_Read bookshelf"
    );
  }
};

export const removeBook_in_progress = async (req, res) => {
  const { userID, bookID } = req.params;
  let user = await db.collection("users").doc(userID).get();
  if (!user.exists) {
    res.send("UserID: " + userID + " does not exist");
  } else {
    user = user = await db.collection("users").doc(userID);
    user.update({
      bookshelf: admin.firestore.FieldValue.arrayRemove(bookID),
    });
    res.send(
      bookID + " was removed from " + userID + " 's in_progress bookshelf"
    );
  }
};

export const removeBook_completed = async (req, res) => {
  const { userID, bookID } = req.params;
  let user = await db.collection("users").doc(userID).get();
  if (!user.exists) {
    res.send("UserID: " + userID + " does not exist");
  } else {
    user = user = await db.collection("users").doc(userID);
    user.update({
      read: admin.firestore.FieldValue.arrayRemove(bookID),
    });
    res.send(
      bookID + " was removed from " + userID + " 's completed bookshelf"
    );
  }
};
