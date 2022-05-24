import express from "express";
import {
  searchBook,
  searchUser,
  getUserInfo,
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

const apiRouter = express.Router();

// Search/Get handler
apiRouter.get("/searchBook/:title/:genre?", searchBook);
apiRouter.get("/searchUser/:userName", searchUser);
apiRouter.get("/getUserInfo/:userID", getUserInfo);

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

// Follow/Unfollwe handler
apiRouter.post("/follow/:userID/:fid", follow);
apiRouter.delete("/unfollow/:userID/:fid", unfollow);

//apiRouter.get("/setBookDB", csvToDB);

export default apiRouter;
