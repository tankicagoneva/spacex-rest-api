import express from "express";

import {
  getAllLaunchpads,
  getLaunchpadById,
  createLaunchpad,
  updateLaunchpad,
  deleteLaunchpad,
  getLaunchpadsByClosest,
} from "../controllers/launchpadController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { createLaunchpadsSchema, updateLaunchpadsSchema, getLaunchpadsByIdSchema } from "../validators/launchpadsValidators.ts";

export const router = express.Router();

router.get("/", getAllLaunchpads);
router.get("/closest", getLaunchpadsByClosest);
router.get("/:id", validateRequest(getLaunchpadsByIdSchema), getLaunchpadById);
router.post("/", validateRequest(createLaunchpadsSchema), createLaunchpad);
router.put("/:id", validateRequest(updateLaunchpadsSchema), updateLaunchpad);
router.delete("/:id", deleteLaunchpad);
