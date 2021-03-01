import JWT from "jsonwebtoken";
import { createHmac } from "crypto";
import { NextFunction, Request, Response } from "express";
import { User } from "./userdb";

if (process.env.NODE_ENV !== "production") require("dotenv").config();

export const JWT_KEY = process.env.JWT_KEY as string;
const HMAC_KEY = process.env.HMAC_KEY as string;

export const EXPIRES_IN = "30m";

export function hmacHash(text: string) {
  return createHmac("sha256", HMAC_KEY).update(text).digest("hex");
}

export function authFail(res: Response) {
  res.status(401).json({ message: "Auth failed" });
}
export interface AuthReq extends Request {
  userData?: User;
}

// Middleware for JSON webtoken authentication
// user data is stored in the request header as userData
export function checkAuth(req: AuthReq, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    req.userData = JWT.verify(
      token as string,
      process.env.JWT_KEY as string
    ) as User;
    next();
  } catch (err) {
    return authFail(res);
  }
}

export const createToken = (user: User) =>
  JWT.sign(user, JWT_KEY, { expiresIn: EXPIRES_IN });
