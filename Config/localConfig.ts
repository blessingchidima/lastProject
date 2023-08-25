import mongoose from "mongoose";
import { environment } from "./envVariables";

const LOCAL: string = environment.DATABASE;

export const localConfig = () => {
  mongoose.connect(LOCAL).then(() => {
    console.log("connected to local database");
  });
};
