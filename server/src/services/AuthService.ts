import jwt from "jsonwebtoken";

import { UserData } from "../util/types";
import { JWT_KEY, EXPIRES_IN } from "../util/config";

export const createToken = (user: UserData) => jwt.sign(user, JWT_KEY, { expiresIn: EXPIRES_IN });
