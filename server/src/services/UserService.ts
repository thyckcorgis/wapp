import User from "../models/user";
import * as validators from "../validations";

import { createToken } from "../helpers/auth";
import { sessionizeUser } from "../util/helpers";

export async function register(username: string, password: string, name: string, daily: number) {
  const { error } = validators.register.validate({ username, password, name, daily });
  if (error) throw error;
  const newUser = new User({ username, password, name, daily });
  const token = createToken(sessionizeUser(newUser));
  await newUser.save();
  return token;
}
