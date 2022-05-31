const csv = require("csv-parser");
const fs = require("fs");
const filePath = "./src/data/goodreads_books.csv";
const results = [];
fs.createReadStream(filePath)
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    console.log("Successfully parsed the csv file!");
    console.log("results array has " + results.length + " books.");
  });

export default results;
