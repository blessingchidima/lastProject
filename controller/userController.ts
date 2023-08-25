import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../Model/userModel";
import { STATUS } from "../error/errorNotes";
import cloudinary from "../Utils/clouds";

export const RegisterUser = async (req: Request, res: Response) => {
  try {
    const { userName, userEmail, userPassword } = req.body;
    const salted = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(userPassword, salted);
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file?.path!
    );
    const register = await userModel.create({
      userName,
      userEmail,
      userPassword: hashed,
      userPicture: secure_url,
      userPictureID: public_id,
    });

    return res.status(STATUS.CREATE).json({
      message: "User created",
      data: register,
    });
  } catch (error: any) {
    return res.status(STATUS.BAD).json({
      message: error,
    });
  }
};

export const LoginUser = async (req: Request, res: Response) => {
  try {
    const { userEmail, userPassword } = req.body;
    const user = await userModel.findOne({ userEmail });

    if (user) {
      const checkUserPassword = await bcrypt.compare(
        userPassword,
        user.userPassword
      );

      if (checkUserPassword) {
        return res.status(STATUS.CREATE).json({
          message: `Welcome ${user.userName}`,
          data: user._id,
        });
      } else {
        return res.status(STATUS.BAD).json({
          message: `Invalid user password`,
        });
      }
    } else {
      return res.status(STATUS.CREATE).json({
        message: "User is not found",
      });
    }
  } catch (error: any) {
    return res.status(STATUS.BAD).json({
      message: error,
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const findUser = await userModel.find().sort({ createdAt: -1 });

    return res.status(STATUS.OK).json({
      message: "User found",
      data: findUser,
    });
  } catch (error: any) {
    return res.status(STATUS.BAD).json({
      message: error,
    });
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const findUser = await userModel.findById(userID);

    return res.status(STATUS.OK).json({
      message: "One User found",
      data: findUser,
    });
  } catch (error: any) {
    return res.status(STATUS.BAD).json({
      message: error,
    });
  }
};

export const deleteOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const findUser = await userModel.findByIdAndDelete(userID);

    return res.status(STATUS.OK).json({
      message: "One User found",
      data: findUser,
    });
  } catch (error: any) {
    return res.status(STATUS.BAD).json({
      message: error,
    });
  }
};
