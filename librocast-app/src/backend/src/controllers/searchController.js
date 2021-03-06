import { db } from "../firestore";
import results from "../data/csvParser";

// book search
export const searchBook = async (req, res) => {
  const { title, genre } = req.params;
  let filtered = results;
  let book = filtered.filter((o) =>
    o.title.toLowerCase().includes(title.toLowerCase())
  );
  if (!book) {
    res.json([]);
  } else {
    res.json(book);
  }
};

// User Search
export const searchUser = async (req, res) => {
  const { userName } = req.params;
  const data = await db.collection("users").get();
  let users = [];
  data.forEach((doc) => {
    if (
      doc._fieldsProto.displayName.stringValue
        .toLowerCase()
        .includes(userName.toLowerCase())
    ) {
      users.push([doc.id, doc._fieldsProto]);
    }
  });
  res.json(users);
};

// Goal Search
export const searchGoal = async (req, res) => {
  const { goal } = req.params;
  const data = await db.collection("goals").get();
  let matchingGoals = [];
  data.forEach((doc) => {
    if (
        doc._fieldsProto.SOMETHING.stringValue
            .toLowerCase()
            .includes(userName.toLowerCase())
    ) {
      matchingGoals.push([doc.id, doc._fieldsProto]);
    }
  });
  res.json(matchingGoals);
};

// get user info with user ID
export const getUserByID = async (req, res) => {
  const { userID } = req.params;
  let user = await db.collection("users").doc(userID).get();
  if (!user.exists) {
    res.send("UserID: " + userID + " does not exist");
  } else {
    res.json(user._fieldsProto);
  }
};

// get user info with user ID
export const getBookByID = async (req, res) => {
  const { bookID } = req.params;
  let book = await db.collection("book_database").doc(bookID).get();
  if (!book.exists) {
    res.send("Book ID: " + bookID + " does not exist");
  } else {
    res.json(book._fieldsProto);
  }
};
