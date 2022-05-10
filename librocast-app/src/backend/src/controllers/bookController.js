import { db, admin } from "../firestore";

export const addBook = async (req, res) => {
  const { userID, bookID } = req.params;
  const user = await db.collection("bookshelf").doc(userID);
  if (!user.get().exists) {
    const newDoc = db.collection("bookshelf");
    newDoc.doc(userID).set({
      bookID: [],
    });
  }
  user.update({
    bookID: admin.firestore.FieldValue.arrayUnion(bookID),
  });
  res.send("Successfully added bookID:" + bookID + " to userID:" + userID);
};
