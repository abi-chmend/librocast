# API Endpoints

##SEARCH API ENDPOINTS

GET: Get user info

- Returns a JSON list of user data (pass unique user ID as parameter)

- /api/getUserInfo/:userID

GET: Search user

- Returns a JSON pair of unique user ID and user data that includes :userName as their displayValue. Returned data format: [ID, User Data]

- /api/searchUser/:userName

GET: Search for a book

- Returns a JSON list of books that includes :book_title as their title.

- /api/searchBook/:book_title/:genre?

##USER API ENDPOINTS

POST: Follow a user

- /api/follow/:userID/:targetUserID

DELETE: Unfollow a user

- /api/unfollow/:userID/:targetUserID

##BOOK API ENDPOINTS

POST: Add book to bookshelf (To-Be-Read)

- /api/addBook/to-be-read/:userID/:bookID

POST: Add book to bookshelf (In progress)

- /api/addBook/in-progress/:userID/:bookID

POST: Add book to bookshelf (Completed)

- /api/addBook/completed/:userID/:bookID

DELETE: Remove book from bookshelf (To-Be-Read)

- /api/removeBook/to-be-read/:userID/:bookID

DELETE: Remove book from bookshelf (In progress)

- /api/removeBook/in-progress/:userID/:bookID

DELETE: Remove book from bookshelf (Completed)

- /api/removeBook/completed/:userID/:bookID

##PROFILE API ENDPOINTS

POST: Edit bio of a user

- /api/editBio/:userID/:bio

POST: Edit profile picture

- /api/editProfilePicture/:userID/:picture
