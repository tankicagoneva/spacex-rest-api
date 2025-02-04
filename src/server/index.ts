import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { router as launchpadRouter } from "../routes/launchpads.js";
import "../db/connection.js";
import { getAllLaunchpads } from "../services/launchpadService.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

// Routes
app.use("/api/launchpads", launchpadRouter);


// PORT
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`🚀 SpaceX Launchpads API is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
