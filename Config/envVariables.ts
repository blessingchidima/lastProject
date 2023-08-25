import env from "dotenv";
env.config();

export const environment = {
  PORT: process.env.PORT!,
  DATABASE: process.env.LOCAL!,
  NAME: process.env.NAME,
  KEY: process.env.KEY,
  SECRET: process.env.SECRET,
};
