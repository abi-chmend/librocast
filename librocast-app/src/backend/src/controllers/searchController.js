const csv = require("csv-parser");
const fs = require("fs");
const filePath = "./src/data/goodreads_books.csv";
const results = [];
fs.createReadStream(filePath)
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    console.log("Successfully parsed the csv file!");
  });

export const bookSearch = async (req, res) => {
  //let { title, genre } = req.params;
  let title = "sdsds";
  let resultText = "Searched for: " + title;
  let genre = undefined;
  if (genre) {
    results = await results.filter((o) => (o.genre = genre));
  }
  let book = results.filter((o) => o.title.includes(title));
  if (!book) {
    res.json([]);
  } else {
    res.json(book);
  }
};
/*
export const userSearch = (req, res) => {
  if (type is name) {

  } else if (type is userID) {

  }
  let users;
  let user = users.find(o) => o.name.includes(name)
  if (name === undefined) {
    res.send(resultText + "User not fiound");
  } else {
    res.send(user info);
  }
}*/
