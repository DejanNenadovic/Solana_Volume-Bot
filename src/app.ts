import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import passport from "passport";
// import passport_jwt from "passport-jwt";

import routeAdmins from "./routes/admin.routes";

import dotenv from "dotenv";
dotenv.config();

// passport_jwt(passport);

export const run = async (bot: any): Promise<void> => {
  const app: Express = express();

  app.use(cors());

  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
    );
    next();
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(passport.initialize());
  app.use("/api", routeAdmins());

  const port = process.env.PORT;

  console.log(`Server up and running on port ${port} !`);
  app.listen(port);
};
