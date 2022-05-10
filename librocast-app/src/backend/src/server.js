// run "npm run dev" to automatically restarting the node application when
// file changes in the directory are detected (nodemon module).

import express from "express";
// HTTP request logger middleware
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";
import cors from "cors";

// Initialization
const PORT = 4000;
const app = express();
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/", globalRouter);
app.use("/api", apiRouter);

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
