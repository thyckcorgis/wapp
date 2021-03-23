import { UserType } from "../util/types";

export interface User<T = string> {
  username: string;
  email: string;
  password: string;
  name: string;
  daily: number;
  currentIntake: number;
  friendIds: T[];
  notify: boolean;
  pushTokens: string[];
  reminders?: {
    wakeTime: number;
    sleepTime: number;
  };

  getId(): T;
  addWater(intake: number): Promise<boolean>;
  addFriendById(friendId: string): Promise<void>;
  getFriends(): Promise<User<T>[]>;
  getNonFriends(): Promise<User<T>[]>;
  getPendingRequests(): Promise<User<T>[]>;
  getUsers(type: UserType): Promise<User<T>[]>;
  comparePasswords(password: string): Promise<boolean>;
}

export interface UserRepo<T = string> {
  doesNotExist(item: string, field: "username" | "email"): Promise<boolean>;
  getUser(userId: T): Promise<User<T>>;
  newUser(
    username: string,
    email: string,
    password: string,
    name: string,
    daily: number
  ): Promise<User<T>>;
  findByUsername(username: string): Promise<User<T>>;

  updateCurrentIntake(userId: T, currentIntake: number): Promise<void>;
  updateDailyIntake(userId: T, daily: number): Promise<void>;
  updateReminders(userId: T, wakeTime: number, sleepTime: number): Promise<void>;

  addPushToken(userId: T, pushToken: string): Promise<void>;
  removePushToken(userId: T, pushToken: string): Promise<void>;
  disableNotifications(userId: T): Promise<void>;
}
