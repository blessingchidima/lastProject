import { environment } from "./Config/envVariables";
import express, { Application } from "express";
import { myAppConnect } from "./myAppConnect";
import { localConfig } from "./Config/localConfig";

const port: number = parseInt(environment.PORT);

const app: Application = express();
myAppConnect(app);

const serverSettings = app.listen(process.env.PORT || port, () => {
  localConfig();
});

process.on("uncaughtException", (error: any) => {
  console.log("uncaught exception: ", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("unhandledRejection: ", reason);
  serverSettings.close(() => {
    process.exit(1);
  });
});
