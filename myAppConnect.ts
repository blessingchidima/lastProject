import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { STATUS, errorNotes } from "./error/errorNotes";
import { errorSetUp } from "./error/errorSetUp";
import user from "./Router/userRouter";
import router from "./router/taskRouter";

export const myAppConnect = (app: Application) => {
  app.use(express.json()).use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE"],
    })
  );
  app.get("/", (req: Request, res: Response) => {
    return res.status(STATUS.OK).json({
      message: "API is available",
    });
  });
  app.use("/api", user);
  app.use("/api", router);
  app
    .all("*", (req: Request, res: Response, next: NextFunction) => {
      next(
        new errorNotes({
          errorName: "API routes not available",
          errorMessage: `This error occurred while trying to fetch API due to ${req.originalUrl} is invalid`,
          errorStatus: STATUS.BAD,
          errorSuccess: false,
        })
      );
    })
    .use(errorSetUp);
};
