import { IUserDocument } from "../models/user";

export const parseError = (err: any) => {
  if (err.isJoi) return err.details[0];
  return JSON.stringify(err, Object.getOwnPropertyNames(err));
};

export const sessionizeUser = (user: IUserDocument) => {
  return { userId: user.id, username: user.username };
};
