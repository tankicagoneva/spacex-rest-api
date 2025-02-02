import { RequestHandler } from "express";
import * as launchpadService from "../services/launchpadService.js";

export const getAllLaunchpads: RequestHandler = async (req, res, next) => {
  try {
    const launchpads = await launchpadService.getAllLaunchpads();
    res.status(200).json(launchpads);
  } catch (error) {
    next(error);
  }
};

export const getLaunchpadById: RequestHandler = async (req, res, next) => {
  try {
    const launchpad = await launchpadService.getLaunchpadById(req.params.id);
    if (!launchpad) {
      res
        .status(404)
        .json({ message: `Launchpad with id ${req.params.id} not found` });
      res.end();
    }
    res.status(200).json(launchpad);
  } catch (error) {
    next(error);
  }
};
