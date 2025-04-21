import dotenv from "dotenv";

interface IConfig {
  port: number;
  env: string;
}

export const config: IConfig = {
  port: parseInt(process?.env?.PORT ?? "") || 9000,
  env: process?.env?.ENV || "devlopment",
};
