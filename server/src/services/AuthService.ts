import jwt from "jsonwebtoken";

import { UserData } from "../util/types";
import { JWT_KEY, EXPIRES_IN } from "../config";

export const CreateToken = (user: UserData) => jwt.sign(user, JWT_KEY, { expiresIn: EXPIRES_IN });
