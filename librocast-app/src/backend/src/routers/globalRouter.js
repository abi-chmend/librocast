import express from "express";

const globalRouter = express.Router();

const dummy = (req, res) => res.send("HI LIBROCAST! THIS IS THE HOMEPAGE");

globalRouter.get("/", dummy);

export default globalRouter;
