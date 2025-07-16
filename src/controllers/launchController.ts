import prisma from '../db/client.js';
import { Request, Response, NextFunction } from 'express';
export const getAllLaunches = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const launches = await prisma.launches.findMany();
     res.status(200).json(launches);
  } catch (error) {
    next(error);
  }
};