# API Endpoints

Get user info

- Returns a Json list of user data (pass unique user ID)

- /api/getUserInfo/:userID

Search for a book

- Returns a Json list of books that includes :book_title as their title.

- /api/searchBook/:book_title/:genre?

Search user

- Returns a Json pair of unique user ID and user data that includes :userName as their displayValue. Returned data format: [ID, User Data]

- /api/searchUser/:userName

Add book to bookshelf (To-Be-Read)

- /api/addBook/to-be-read/:userID/:bookID

Add book to bookshelf (In progress)

- /api/addBook/in-progress/:userID/:bookID

Add book to bookshelf (Completed)

- /api/addBook/completed/:userID/:bookID

Delete book from bookshelf

- /api/deleteBook/:userID/:bookID

Follow a user

- /api/follow/:userID/:targetUserID

Unfollow a user

- /api/unfollow/:userID/:targetUserID
