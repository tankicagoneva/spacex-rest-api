import express from "express";

import {
  getAllLaunchpads,
  getLaunchpadById,
  createLaunchpad,
  updateLaunchpad,
  deleteLaunchpad,
  getLaunchpadsByClosest,
} from "../controllers/launchpadController.ts";

export const router = express.Router();

router.get("/", getAllLaunchpads);
router.get('/closest', getLaunchpadsByClosest);
router.get("/:id", getLaunchpadById);
router.post("/", createLaunchpad);
router.put("/:id", updateLaunchpad);
router.delete("/:id", deleteLaunchpad);