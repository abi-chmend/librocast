import express from "express";
import { searchBook, searchUser } from "../controllers/searchController";
import { addBook, deleteBook } from "../controllers/bookController";
import { addFriend, deleteFriend } from "../controllers/userController";

const apiRouter = express.Router();

apiRouter.get("/searchBook/:title/:genre?", searchBook);
apiRouter.get("/searchUser/:userName", searchUser);

apiRouter.get("/addBook/:userID/:bookID", addBook);
apiRouter.get("/addFriend/:userID/:friendID", addFriend);

apiRouter.get("/deleteBook/:userID/:bookID", deleteBook);
apiRouter.get("/deleteFriend/:userID/:friendID", deleteFriend);
//apiRouter.get("/setBookDB", csvToDB);

export default apiRouter;
