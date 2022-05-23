# API Endpoints

GET: Get user info

- Returns a JSON list of user data (pass unique user ID as parameter)

- /api/getUserInfo/:userID

GET: Search for a book

- Returns a JSON list of books that includes :book_title as their title.

- /api/searchBook/:book_title/:genre?

GET: Search user

- Returns a JSON pair of unique user ID and user data that includes :userName as their displayValue. Returned data format: [ID, User Data]

- /api/searchUser/:userName

POST: Add book to bookshelf (To-Be-Read)

- /api/addBook/to-be-read/:userID/:bookID

POST: Add book to bookshelf (In progress)

- /api/addBook/in-progress/:userID/:bookID

POST: Add book to bookshelf (Completed)

- /api/addBook/completed/:userID/:bookID

POST: Remove book from bookshelf (To-Be-Read)

- /api/removeBook/to-be-read/:userID/:bookID

POST: Remove book from bookshelf (In progress)

- /api/removeBook/in-progress/:userID/:bookID

POST: Remove book from bookshelf (Completed)

- /api/removeBook/completed/:userID/:bookID

POST: Follow a user

- /api/follow/:userID/:targetUserID

POST: Unfollow a user

- /api/unfollow/:userID/:targetUserID
