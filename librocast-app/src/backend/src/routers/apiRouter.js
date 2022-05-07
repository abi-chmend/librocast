import express from "express";
import { searchBook, searchUser } from "../controllers/searchController";
import { csvToDB } from "../controllers/setBookDB";

const apiRouter = express.Router();

apiRouter.get("/searchBook/:title/:genre?", searchBook);
apiRouter.get("/searchUser/:userName", searchUser);
//apiRouter.get("/setBookDB", csvToDB);

export default apiRouter;
