import { RequestHandler, Request, Response, NextFunction } from "express";
import * as launchpadService from "../services/launchpadService.ts";
import { latLngSchema, statusSchema } from "../schema/launchpadSchemas.ts";

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
export const getAllLaunchpads: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const statusParseResult = statusSchema.safeParse(req.query.status);

    const launchpads = await launchpadService.getAllLaunchpads(
      statusParseResult.success ? statusParseResult.data : undefined
    );
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
export const getLaunchpadById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
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

/**
 * Handles the request to create a new launchpad.
 * 
 * @param req - The request object, containing the launchpad data in the body.
 * @param res - The response object, used to send back the created launchpad data or an error message.
 * @param next - The next  function in the stack.
 * 
 * @returns A JSON response with the created launchpad data.
 * 
 * @throws Will pass any errors to the next function.
 */
export const createLaunchpad: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const launchpad = await launchpadService.createLaunchpad(req.body);
    res.status(201).json(launchpad);
  } catch (error) {
    next(error);
  }
};

/**
 * Handles the request to update a launchpad by its ID.
 * 
 * @param req - The request object, containing the launchpad ID in the parameters and the updated data in the body.
 * @param res - The response object, used to send back the updated launchpad data or an error message.
 * @param next - The next middleware function in the stack.
 * 
 * @returns A JSON response with the updated launchpad data.
 * 
 * @throws Will pass any errors to the next function.
 */
export const updateLaunchpad: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const launchpad = await launchpadService.updateLaunchpad(req.params.id, req.body);
    res.status(200).json(launchpad);
  } catch (error) {
    next(error);
  }
};

/**
 * Handles the request to delete a launchpad by its ID.
 * 
 * @param req - The request object, containing the launchpad ID in the parameters.
 * @param res - The response object, used to send back a success message or an error message.
 * @param next - The next  function in the stack.
 * 
 * @returns A JSON response with a success message.
 * 
 * @throws Will pass any errors to the next function.
 */ 
export const deleteLaunchpad: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await launchpadService.deleteLaunchpad(req.params.id);
    res.status(200).json({ message: `Launchpad with id ${req.params.id} deleted` });
  } catch (error) {
    next(error);
  }
};


export const getLaunchpadsByClosest: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const coordinates = latLngSchema.safeParse({
        latitude: req.query.latitude,
        longitude: req.query.longitude,
      });

     if(!coordinates.success) {
       res.status(400).json({  message: "Invalid coordinates", error: coordinates.error.message });
       return;
    }
    
    const closestLaunchpads  = await launchpadService.getLaunchpadsByClosest(coordinates.data);
    res.status(200).json(closestLaunchpads);
  } catch (error) {
    next(error);
  }
}