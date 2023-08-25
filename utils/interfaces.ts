import mongoose from "mongoose";

export interface iUser {
  userName: string;
  userEmail: string;
  userPassword: string;
  userPicture: string;
  userPictureID: string;
}

export interface iUserService extends iUser, mongoose.Document {}


export interface iTask {
    name?: string;
    taskAvatar?: string;
    task?: string;
    priority?: string;
    taskStatus : string
    progress : {}[];
    // done : {}[]
  }

  export interface iTaskServices extends iTask, mongoose.Document {};