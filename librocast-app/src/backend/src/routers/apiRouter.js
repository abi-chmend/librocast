import express from "express";
import {
  searchBook,
  searchUser,
  getUserInfo,
} from "../controllers/searchController";
import { addBook, deleteBook } from "../controllers/bookshelfController";
import { follow, unfollow } from "../controllers/userController";

const apiRouter = express.Router();

apiRouter.get("/searchBook/:title/:genre?", searchBook);
apiRouter.get("/searchUser/:userName", searchUser);
apiRouter.get("/getUserInfo/:userID", getUserInfo);

apiRouter.get("/addBook/:userID/:bookID", addBook);
apiRouter.get("/deleteBook/:userID/:bookID", deleteBook);

apiRouter.get("/follow/:userID/:fid", follow);
apiRouter.get("/unfollow/:userID/:fid", unfollow);

//apiRouter.get("/setBookDB", csvToDB);

export default apiRouter;
