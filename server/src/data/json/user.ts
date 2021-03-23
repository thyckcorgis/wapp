import { User, UserRepo } from "../";
import { v4 as uuidv4 } from "uuid";
import { compare, hashSync } from "bcrypt";
import { UserType } from "src/util/types";

export class UserObj implements User {
  username: string;
  email: string;
  password: string;
  name: string;
  daily: number;
  currentIntake: number = 0;
  friendIds: string[] = [];
  notify: boolean = false;
  pushTokens: string[] = [];

  reminders?: {
    wakeTime: number;
    sleepTime: number;
  };

  id: string;

  repo: UserJSON;

  constructor(
    username: string,
    email: string,
    password: string,
    name: string,
    daily: number,
    repo: UserJSON
  ) {
    this.id = uuidv4();
    this.username = username;
    this.email = email;
    this.name = name;
    this.password = hashSync(password, 10);
    this.daily = daily;
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
    return Object.values(users).filter((user) => !!user) as UserObj[];
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

export class UserJSON implements UserRepo {
  filePath: string;
  users: { [k: string]: UserObj };
  constructor(filePath: string) {
    filePath;
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
    const user = new UserObj(username, email, password, name, daily, this);
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
