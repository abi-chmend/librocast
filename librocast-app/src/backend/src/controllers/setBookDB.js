import results from "../data/csvParser";
import db from "../firestore";

export const csvToDB = async (req, res) => {
  const booksDb = await db.collection("books").get();
  let i = 0;
  results.forEach((book) => {
    booksDb.doc(book.id).set({
      title: book.title,
      imageURL: book.cover_link,
      rating: book.average_rating,
      numPages: book.number_of_pages,
    });
    console.log(i);
    i = i + 1;
  });
  /*
  booksDb.forEach((doc) => {
    i = i + 1;
  });
  console.log(i)*/
};
