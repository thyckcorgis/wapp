import { User } from "../data";

export const parseError = (err: any) => {
  if (err.isJoi) return err.details[0];
  return JSON.stringify(err, Object.getOwnPropertyNames(err));
};

export const sessionizeUser = (user: User) => {
  return { userId: user.getId(), username: user.username };
};
