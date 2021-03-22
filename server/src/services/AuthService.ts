import jwt from "jsonwebtoken";

import { UserData } from "../util/types";
import { JWT_KEY, EXPIRES_IN } from "../config";

export class AuthService {
  private jwtKey: string;
  private expiresIn: string;

  constructor(jwtKey: string, expiresIn: string) {
    this.jwtKey = jwtKey;
    this.expiresIn = expiresIn;
  }
  createToken(user: UserData) {
    return jwt.sign(user, this.jwtKey, { expiresIn: this.expiresIn });
  }
}

export default new AuthService(JWT_KEY, EXPIRES_IN);
