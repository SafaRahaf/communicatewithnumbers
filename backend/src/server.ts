// src/server.ts
import app from "./app";
import cors from "cors";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || "";

app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const start = async () => {
  await connectDB(MONGO_URL);
  // @ts-ignore
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
};

start();
