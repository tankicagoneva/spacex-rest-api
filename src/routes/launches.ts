import express from "express";
import { getAllLaunches } from "../controllers/launchController.ts";

export const router = express.Router();


router.get('/', getAllLaunches);