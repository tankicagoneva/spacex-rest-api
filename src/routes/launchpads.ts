import express from "express";

import {
  getAllLaunchpads,
  getLaunchpadById,
  createLaunchpad,
  updateLaunchpad,
  deleteLaunchpad,
} from "../controllers/launchpadController.ts";
import { validateRequest } from "../middleware/validateRequest.ts";
import { createLaunchpadValidator, deleteLaunchpadValidator, updateLaunchpadValidator, validateIdParam } from "../validators/launchpadsValidators.ts";

export const router = express.Router();

router.get("/", getAllLaunchpads);
router.get("/:id", validateRequest(validateIdParam), getLaunchpadById);
router.post("/", validateRequest(createLaunchpadValidator), createLaunchpad);
router.put("/:id", validateRequest(updateLaunchpadValidator), updateLaunchpad);
router.delete("/:id", validateRequest(validateIdParam), deleteLaunchpad);