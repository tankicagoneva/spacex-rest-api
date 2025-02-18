import { ValidationChain, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";


export const validateRequest = (validation: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validation.map((v) => v.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors });
          } else {
            next();
          }
    }
}