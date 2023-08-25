import { Request, Response, NextFunction } from "express";
import { STATUS, errorNotes } from "./errorNotes";

const errorField = (error: errorNotes, res: Response) => {
  return res.status(STATUS.BAD).json({
    name: error.errorName,
    message: error.errorMessage,
    status: error.errorStatus,
    success: error.errorSuccess,
    stack: error.stack,
    error,
  });
};

export const errorSetUp = (
  error: errorNotes,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  errorField(error, res);
};
