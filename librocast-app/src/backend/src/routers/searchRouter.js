import express from "express";
import { bookSearch } from "../controllers/searchController";

const searchRouter = express.Router();

searchRouter.get("/", bookSearch);

export default searchRouter;
