import { Request, Response, NextFunction, RequestHandler } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validateRequest = (schema: AnyZodObject): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await schema.safeParse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      if(!result.success) {
        res.status(400).json(result.error);
        return;
      }
      next();
    } catch (error) {
      res.status(400).json({
        error: error instanceof ZodError ? error.message : error,
      });
    }
  };
};
