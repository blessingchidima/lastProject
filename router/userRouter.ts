import { Router } from "express";
import { Upload } from "../Utils/picsConfig";
import {
  LoginUser,
  RegisterUser,
  deleteOneUser,
  getOneUser,
  getUser,
} from "../Controller/userController";

const user: Router = Router();

user.route("/register").post(Upload, RegisterUser);
user.route("/login").post(LoginUser);
user.route("/read").get(getUser);
user.route("/:userID/read").get(getOneUser);
user.route("/:userID/del").get(deleteOneUser);

export default user;
