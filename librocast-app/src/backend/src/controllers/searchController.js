import { db } from "../firestore";
import results from "../data/csvParser";

// book search
export const searchBook = async (req, res) => {
  const { title, genre } = req.params;
  let filtered = results;
  let book = filtered.filter((o) => o.title.includes(title));
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
      console.log(doc.id);
      users.push([doc.id, doc._fieldsProto]);
    }
  });
  res.json(users);
};
