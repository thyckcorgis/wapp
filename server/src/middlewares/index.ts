import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { UserData } from "../util/types";

export interface AuthReq extends Request {
  userData?: UserData;
}

export function checkAuth(req: AuthReq, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    req.userData = jwt.verify(token as string, process.env.JWT_KEY as string) as UserData;
    next();
  } catch (err) {
    res.status(401).send("Auth failed");
  }
}
