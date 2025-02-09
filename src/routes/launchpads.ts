import express from "express";

import {
  getAllLaunchpads,
  getLaunchpadById,
  createLaunchpad,
  updateLaunchpad,
  deleteLaunchpad,
} from "../controllers/launchpadController.js";

export const router = express.Router();

router.get("/", getAllLaunchpads);
router.get("/:id", getLaunchpadById);
router.post("/", createLaunchpad);
router.put("/:id", updateLaunchpad);
router.delete("/:id", deleteLaunchpad);