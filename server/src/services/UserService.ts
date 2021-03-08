import User from "../models/user";

import { CreateToken } from "./AuthService";

import { validate, setReminders, setIntake, register, login } from "../util/validations";
import { sessionizeUser } from "../util/helpers";

export async function DailyReminders(userId: string, wakeTime: number, sleepTime: number) {
  await validate(setReminders, { wakeTime, sleepTime });
  await User.findByIdAndUpdate(userId, { reminders: { wakeTime, sleepTime } }).exec();
}

export async function DailyIntake(userId: string, daily: number) {
  await validate(setIntake, { daily });
  await User.findByIdAndUpdate(userId, { daily }).exec();
}

export async function Register(username: string, password: string, name: string, daily: number) {
  await validate(register, { username, password, name, daily });
  const newUser = new User({ username, password, name, daily });
  await newUser.save();
  return CreateToken(sessionizeUser(newUser));
}

export async function Login(username: string, password: string) {
  await validate(login, { username, password });
  const user = await User.findByUsername(username);
  if (!user.comparePasswords(password)) throw new Error("Invalid login credentials");
  return CreateToken(sessionizeUser(user));
}
