import express from "express";
import { searchBook, searchUser } from "../controllers/searchController";
import { csvToDB } from "../controllers/setBookDB";
import { addBook } from "../controllers/bookController";
import { addFriend } from "../controllers/userController";

const apiRouter = express.Router();

apiRouter.get("/searchBook/:title/:genre?", searchBook);
apiRouter.get("/searchUser/:userName", searchUser);

apiRouter.get("/addBook/:userID/:bookID", addBook);
apiRouter.get("/addFriend/:userID/:friendID", addFriend);
//apiRouter.get("/setBookDB", csvToDB);

export default apiRouter;
