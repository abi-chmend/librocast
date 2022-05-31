import express from "express";
import {
  searchBook,
  searchUser,
  getUserByID,
  getBookByID,
} from "../controllers/searchController";
import {
  addBook_to_be_read,
  addBook_in_progress,
  addBook_completed,
  removeBook_to_be_read,
  removeBook_in_progress,
  removeBook_completed,
} from "../controllers/bookshelfController";
import { follow, unfollow } from "../controllers/userController";
import { newPost, readPosts, addLikes, addComments } from "../controllers/postController";
import { editBio, editProfilePicture } from "../controllers/profileController";
import { csvToDB } from "../controllers/setBookDB";

const apiRouter = express.Router();

// Search/Get handler
apiRouter.get("/searchBook/:title/:genre?", searchBook);
apiRouter.get("/searchUser/:userName", searchUser);
apiRouter.get("/getUserByID/:userID", getUserByID);
apiRouter.get("/getBookByID/:bookID", getBookByID);

// Bookshelf handler
apiRouter.post("/addBook/to-be-read/:userID/:bookID", addBook_to_be_read);
apiRouter.post("/addBook/in-progress/:userID/:bookID", addBook_in_progress);
apiRouter.post("/addBook/completed/:userID/:bookID", addBook_completed);

apiRouter.delete(
  "/removeBook/to-be-read/:userID/:bookID",
  removeBook_to_be_read
);
apiRouter.delete(
  "/removeBook/in-progress/:userID/:bookID",
  removeBook_in_progress
);
apiRouter.delete("/removeBook/completed/:userID/:bookID", removeBook_completed);

apiRouter.post("/newPost/:userID/:book_id/:contents", newPost);
apiRouter.get("/readPosts/:userID", readPosts);


// User handler
apiRouter.post("/follow/:userID/:fid", follow);
apiRouter.delete("/unfollow/:userID/:fid", unfollow);

// Profile handler
apiRouter.post("/editBio/:userID/:_bio", editBio);
apiRouter.post("/editProfilePicture/:userID/:_picture", editProfilePicture);

apiRouter.get("/setBookDB", csvToDB);

export default apiRouter;
