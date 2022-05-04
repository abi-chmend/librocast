import express from "express";
import { bookSearch } from "../controllers/searchController";

const apiRouter = express.Router();

apiRouter.get("/search/:title/:genre?", bookSearch);

export default apiRouter;
