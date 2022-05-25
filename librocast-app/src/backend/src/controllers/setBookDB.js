import results from "../data/csvParser";
import { db, admin } from "../firestore";

export const csvToDB = async (req, res) => {
  const booksDb = await db.collection("book_database");
  /*
  for (let i = 5000; i < 10000; i++) {
    let book = results[i];
    booksDb.doc(book.id).set({
      author: book.author,
      average_rating: book.average_rating,
      date_published: book.date_published,
      description: book.description,
      genre_and_votes: book.genre_and_votes,
      imageURL: book.cover_link,
      isbn: book.isbn,
      isbn13: book.isbn13,
      link: book.link,
      number_of_pages: book.number_of_pages,
      publisher: book.publisher,
      rating_count: book.rating_count,
      review_count: book.review_count,
      series: book.series,
      title: book.title,
    });
  }
  console.log("Done");*/
  db.collection("book_database")
    .get()
    .then(function (querySnapshot) {
      console.log(querySnapshot.size);
    });
  res.send("done");
};
