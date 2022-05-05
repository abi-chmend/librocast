import express from "express";
import { bookSearch, listGenres } from "../controllers/searchController";

const apiRouter = express.Router();

apiRouter.get("/search/:title/:genre?", bookSearch);
apiRouter.get("/GenreList", listGenres);

export default apiRouter;
