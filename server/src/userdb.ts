// "Database" file
import { readFileSync, writeFileSync } from "fs";

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
    return this.users.filter((u) => u.username in usernames);
  }

  addWaterIntake(username: string, water: number) {
    const user = this.getUser(username);
    if (user == null) return;
    user.currentIntake += water;
    const metGoal = user.currentIntake >= user.daily;
    this.saveFile();
    return metGoal;
  }

  getAllUsers() {
    return this.users.map((u) => ({
      username: u.username,
      name: u.name,
    }));
  }

  connectFriends(name1: string, name2: string) {
    const user1 = this.getUser(name1);
    const user2 = this.getUser(name2);
    if (!user1 || !user2) return;
    user1.friends.push(user2.username);
    user2.friends.push(user1.username);
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
  friends: string[];
}

export default new Users("./users.json");
