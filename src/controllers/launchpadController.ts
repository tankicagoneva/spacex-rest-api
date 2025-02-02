import { RequestHandler } from "express";
import * as launchpadService from "../services/launchpadService.js";



/**
 * Retrieves all launchpads and sends them in the response.
 * 
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 * 
 * @returns A JSON response with the list of all launchpads.
 * 
 * @throws Passes any errors to the next function.
 */
export const getAllLaunchpads: RequestHandler = async (req, res, next) => {
  try {
    const launchpads = await launchpadService.getAllLaunchpads();
    res.status(200).json(launchpads);
  } catch (error) {
    next(error);
  }
};


/**
 * Handles the request to get a launchpad by its ID.
 * 
 * @param req - The request object, containing the launchpad ID in the parameters.
 * @param res - The response object, used to send back the launchpad data or an error message.
 * @param next - The next middleware function in the stack.
 * 
 * @returns A JSON response with the launchpad data if found, or a 404 error message if not found.
 * 
 * @throws Will pass any errors to the next function.
 */
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
