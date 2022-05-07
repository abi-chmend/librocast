export const addBook = async (req, res) => {
  const { bookID } = req.params;
  let filtered = results;
  let book = filtered.filter((o) => o.title.includes(title));
  if (!book) {
    res.json([]);
  } else {
    res.json(book);
  }
};
