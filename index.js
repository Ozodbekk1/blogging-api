/** @format */

import express from "express";
const app = express();
import { configDotenv } from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
configDotenv();

// Mongo DB Connections
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then((response) => {
    console.log("MongoDB Connection Succeeded. ✅");
  })
  .catch((error) => {
    console.log("Error in DB connection: " + error);
  });

// Middleware Connections
app.use(cors());
app.use(express.json());

// Routes

app.use("/api/v1", userRouter);
app.use("/api/v1", postRouter);

app.get("/", (req, res) => {
  res.send("your api is live ");
});

// Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("🥳 App running in port: " + PORT);
});
