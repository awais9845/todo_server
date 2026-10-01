import express from "express";

import { config } from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import router from "./routes/todoRoutes.js";

config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

connectDB();

app.use("/api", router);

// Test route
app.get("/", (req, res) => {
  res.send("Todo API is running...");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
