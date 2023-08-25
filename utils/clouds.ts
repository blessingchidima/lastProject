import { v2 as cloudinary } from "cloudinary";
import { environment } from "../Config/envVariables";

cloudinary.config({
  cloud_name: environment.NAME,
  api_key: environment.KEY,
  api_secret: environment.SECRET,
  secure: true,
});

export default cloudinary;
