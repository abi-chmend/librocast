import express from "express";
import { search } from "../controllers/searchController";

const searchRouter = express.Router();

searchRouter.get("/", search);

export default searchRouter;
