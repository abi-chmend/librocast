import db from "../firestore";
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
      console.log(doc._fieldsProto);
      users.push(doc._fieldsProto);
    }
  });
  res.json(users);
};

export const listGenres = async (req, res) => {
  let list = [];
  results.forEach((e) => {
    let tempList = e.genre_and_votes.split(" ");
    let text = "";
    tempList.forEach((s) => {
      if (isNaN(s)) {
        text = text + " " + s;
        console.log(s);
      } else {
        if (!list.includes(text)) {
          list.push(text);
        }
        text = "";
      }
    });
  });
  res.json(list);
};
