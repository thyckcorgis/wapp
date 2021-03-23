import { v4 as uuidv4 } from "uuid";
import { compare, hashSync } from "bcrypt";

import { User, UserAttrs, UserRepo } from "../";
import { UserType } from "../../util/types";
import FlatFile, { FileObject, loadFromFile, saveToFile } from "./FlatFile";

interface IUserObject extends UserAttrs {
  id: string;
}

export class UserObject implements User, IUserObject {
  username: string;
  email: string;
  password: string;
  name: string;
  daily: number;
  currentIntake: number;
  friendIds: string[];
  notify: boolean;
  pushTokens: string[];

  reminders?: {
    wakeTime: number;
    sleepTime: number;
  };

  id: string;

  repo: UserJSON;

  constructor(user: IUserObject, repo: UserJSON) {
    // is there a better way to do this huhu
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
    this.daily = user.daily;
    this.currentIntake = user.currentIntake;
    this.reminders = (user.reminders && { ...user.reminders }) || undefined;
    this.pushTokens = [...user.pushTokens];
    this.friendIds = [...user.friendIds];
    this.repo = repo;
  }

  getId() {
    return this.id;
  }

  async addWater(intake: number) {
    this.currentIntake += intake;
    return this.currentIntake >= this.daily;
  }

  async addFriendById(friendId: string) {
    this.friendIds.push(friendId);
  }

  async getFriends() {
    const usersInFriendsList = await Promise.all(this.friendIds.map((id) => this.repo.getUser(id)));
    return usersInFriendsList.filter((user) => user.friendIds.includes(this.id));
  }

  async getNonFullyLinkedUsers() {
    // keys that are in friendIds or is the user id are replaced with undefined
    const undefineds = Object.fromEntries(this.friendIds.map((id) => [id, undefined]));
    const users = { ...this.repo.users, ...undefineds, [this.id]: undefined };
    // filter out those that have undefined values
    return Object.values(users).filter((user) => !!user) as UserObject[];
  }

  async getNonFriends() {
    const nonFriends = await this.getNonFullyLinkedUsers();
    return nonFriends.filter((user) => !user.friendIds.includes(this.id));
  }

  async getPendingRequests() {
    const nonFriends = await this.getNonFullyLinkedUsers();
    return nonFriends.filter((user) => user.friendIds.includes(this.id));
  }

  async getUsers(type: UserType) {
    const choices = {
      friends: this.getFriends,
      nonFriends: this.getNonFriends,
      pending: this.getPendingRequests,
    };
    return choices[type]();
  }

  comparePasswords(password: string) {
    return compare(password, this.password);
  }
}

export class UserJSON implements UserRepo, FlatFile {
  filePath: string;
  users: FileObject<UserObject>;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async load() {
    const users = await loadFromFile<IUserObject>(this.filePath);
    Object.values(users).forEach((user) => {
      const newUser = new UserObject(user, this);
      this.users[newUser.getId()] = newUser;
    });
  }

  async save() {
    await saveToFile<IUserObject>(this.filePath, this.users);
  }

  async doesNotExist(item: string, field: "username" | "email") {
    return Object.values(this.users).some((user) => user[field] !== item);
  }

  async getUser(userId: string) {
    const user = this.users[userId];
    if (!user) throw new Error("User not found");
    return user;
  }

  async newUser(username: string, email: string, password: string, name: string, daily: number) {
    const userAttrs: IUserObject = {
      id: uuidv4(),
      username,
      email,
      password: hashSync(password, 10),
      name,
      daily,
      currentIntake: 0,
      friendIds: [],
      pushTokens: [],
      notify: false,
    };
    const user = new UserObject(userAttrs, this);
    this.users[user.getId()] = user;
    return user;
  }

  async updateCurrentIntake(userId: string, currentIntake: number) {
    this.users[userId].currentIntake = currentIntake;
  }

  async updateDailyIntake(userId: string, daily: number) {
    this.users[userId].daily = daily;
  }

  async updateReminders(userId: string, wakeTime: number, sleepTime: number) {
    this.users[userId].reminders = { wakeTime, sleepTime };
  }

  async findByUsername(username: string) {
    const user = Object.values(this.users).find((user) => user.username === username);
    if (!user) throw new Error("User not found");
    return user;
  }

  async addPushToken(userId: string, pushToken: string) {
    const user = await this.getUser(userId);
    user.pushTokens.push(pushToken);
    user.notify = true;
  }

  async removePushToken(userId: string, pushToken: string) {
    const user = await this.getUser(userId);
    user.pushTokens.filter((token) => token !== pushToken);
  }

  async disableNotifications(userId: string) {
    const user = await this.getUser(userId);
    user.notify = false;
  }
}
