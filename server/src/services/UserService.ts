import User from "../models/user";
import * as validators from "../validations";

import { createToken } from "../helpers/auth";
import { sessionizeUser } from "../util/helpers";

export async function register(username: string, password: string, name: string, daily: number) {
  const { error } = validators.register.validate({ username, password, name, daily });
  if (error) throw error;

  const newUser = new User({ username, password, name, daily });
  await newUser.save();
  return createToken(sessionizeUser(newUser));
}

export async function login(username: string, password: string) {
  const { error } = validators.login.validate({ username, password });
  if (error) throw error;

  const user = await User.findOne({ username });
  if (user?.comparePasswords(password)) {
    return createToken(sessionizeUser(user));
  } else {
    throw new Error("Invalid login credentials");
  }
}
