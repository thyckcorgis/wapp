// "Database" file
import { ExpoPushToken } from "expo-server-sdk";
import { readFileSync, writeFileSync } from "fs";

export function newUser(
  username: string,
  password: string,
  name: string,
  daily: number
): User {
  return {
    username,
    password,
    name,
    daily,
    currentIntake: 0,
    pendingRequests: [],
    friends: [],
    // reminders: {
    //   wakeTime:
    // }
  };
}

class Users {
  users: User[];
  filePath: string;
  constructor(path: string) {
    this.filePath = path;
    try {
      // read file if there is an existing json file
      this.users = JSON.parse(readFileSync(this.filePath).toString());
    } catch (err) {
      // create file
      this.users = [];
    }
    this.saveFile();
  }

  saveFile() {
    writeFileSync(
      this.filePath,
      Buffer.from(JSON.stringify(this.users, null, 2))
    );
  }

  getUser(username: string) {
    return this.users.find((u) => u.username === username);
  }

  addUser(user: User) {
    const length = this.users.push(user);
    this.saveFile();
    return length;
  }

  filterUsers(usernames: string[]) {
    return this.users.filter((u) => usernames.includes(u.username));
  }

  modifyUser(username: string, callBack: (user: User) => void) {
    const user = this.getUser(username);
    if (!user) return null;
    callBack(user);
    this.saveFile();
    return user;
  }

  addWaterIntake(username: string, water: number) {
    let metGoal = false;
    this.modifyUser(username, (user) => {
      user.currentIntake += water / 1000;
      metGoal = user.currentIntake >= user.daily;
    });
    return metGoal;
  }

  getUsernamesAndNames(users: User[]) {
    return users.map(({ username, name }) => ({ username, name }));
  }

  getNames(usernames: string[]) {
    return this.getUsernamesAndNames(this.filterUsers(usernames));
  }

  getAllUsers() {
    return this.getUsernamesAndNames(this.users);
  }

  connectFriends(name1: string, name2: string) {
    const user1 = this.getUser(name1);
    const user2 = this.getUser(name2);
    if (!user1 || !user2) return;
    user1.friends.push(user2.username);
    user2.friends.push(user1.username);
  }

  setDailyIntake(username: string, daily: number) {
    return this.modifyUser(username, (user) => {
      user.daily = daily;
    });
  }

  setPushToken(username: string, expoPushToken: ExpoPushToken) {
    return this.modifyUser(username, (user) => {
      user.expoPushToken = expoPushToken;
    });
  }

  deletePushToken(username: string) {
    return this.modifyUser(username, (user) => {
      delete user.expoPushToken;
    });
  }

  addPendingRequest(username: string, pending: string) {
    let success = false;
    this.modifyUser(username, (user) => {
      if (!user.pendingRequests.includes(pending)) {
        user.pendingRequests.push(pending);
        success = true;
      }
    });
    return success;
  }

  removePendingRequest(username: string, done: string) {
    return this.modifyUser(username, (user) => {
      user.pendingRequests = user.pendingRequests.filter((u) => u !== done);
    });
  }

  resetCurrentIntake(username: string) {
    return this.modifyUser(username, (user) => (user.currentIntake = 0));
  }

  resetAllCurrentIntake() {
    this.users.forEach((u) => (u.currentIntake = 0));
    this.saveFile();
  }

  getAllFriends(username: string) {
    let allFriends: User[] = [];
    this.modifyUser(username, (user) => {
      allFriends = this.filterUsers(user.friends);
    });
    return allFriends;
  }
}

export interface LoginReq {
  username: string; // unique username
  password: string; // plaintext password in the req, hashed password in array
}

export interface UserReq extends LoginReq {
  name: string; // user's full name
  daily: number; // daily water intake
}

export interface User extends UserReq {
  currentIntake: number;
  expoPushToken?: ExpoPushToken;
  friends: string[];
  pendingRequests: string[];
  // reminders: {
  //   wakeTime:
  // }
}

export default new Users("./users.json");
