// run "npm run dev" to run server.js
import express from "express";

const PORT = 4000;

const app = express();

app.listen(PORT, () => {
  console.log("HI LIBROCAST");
});
