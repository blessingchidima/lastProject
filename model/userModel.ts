import mongoose from "mongoose";
import { iUser, iUserService } from "../utils/interfaces";

const userModel = new mongoose.Schema<iUser>(
  {
    userName: {
      type: String,
    },
    userEmail: {
      type: String,
      trim: true,
      unique: true,
    },
    userPassword: {
      type: String,
    },
    userPicture: {
      type: String,
    },
    userPictureID: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<iUserService>("users", userModel);
