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

export const search = (req, res) => {
  let title = "Jude";
  let resultText = "Searched for: " + title;
  let book = results.find((o) => o.title === title);
  if (book === undefined) {
    res.send(resultText + " Book not found");
  } else {
    res.send(resultText + " isbn: " + book.isbn);
  }
};
