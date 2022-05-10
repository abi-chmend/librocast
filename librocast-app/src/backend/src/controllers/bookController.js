import { db, admin } from "../firestore";

export const addBook = async (req, res) => {
  const { userID, bookID } = req.params;
  let user = await db.collection("bookshelf").doc(userID).get();
  if (!user.exists) {
    user.set({
      bookID: [],
    });
  }
  user = await db.collection("bookshelf").doc(userID);
  user.update({
    bookID: admin.firestore.FieldValue.arrayUnion(bookID),
  });
  res.send("Successfully added bookID:" + bookID + " to userID:" + userID);
};

export const deleteBook = async (req, res) => {
  const { userID, bookID } = req.params;
  const user = await db.collection("bookshelf").doc(userID);
  if (!user.get().exists) {
    res.send("UserID: " + userID + " does not exist");
  } else {
    await user.update({
      bookID: admin.firestore.FieldValue.arrayRemove(bookID),
    });
    res.send(
      "Successfully deleted bookID:" + bookID + " from userID:" + userID
    );
  }
};
