import express from "express";

import {
  getAllLaunchpads,
  getLaunchpadById,
} from "../controllers/launchpadController.js";

export const router = express.Router();

router.get("/", getAllLaunchpads);
router.get("/:id", getLaunchpadById);
