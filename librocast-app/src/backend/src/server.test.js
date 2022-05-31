import 'regenerator-runtime/runtime'

const server = require("./server");
const supertest = require("supertest");
const request = supertest(server);
const express = require('express');
const app = express();
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";
app.use(morgan("dev"));

// Routes
app.use("/", globalRouter);
app.use("/api", apiRouter);

test("/api/searchUser/:userName", async () => {
  const userName = "kihoon";

  await supertest(app)
    .get("/api/searchUser/" + userName)
    .expect(200)
    .then((response) => {
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);
    });
    return;
});
