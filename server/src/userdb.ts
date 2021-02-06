// "Database" file

class Users {
  users: User[];
  constructor() {
    this.users = [];
  }

  addUser(user: User) {
    return this.users.push(user);
  }

  filterUsers(usernames: string[]) {
    return this.users.filter((u) => u.username in usernames);
  }

  addWaterIntake(username: string, water: number) {
    const user = this.users.find((u) => u.username === username);
    if (user == null) return;
    user.currentIntake += water;
    return user.currentIntake >= user.daily;
  }
}

export interface UserReq {
  username: string; // unique username
  password: string; // plaintext password in the req, hashed password in array
  name: string; // user's full name
  daily: number; // daily water intake
}

export interface User extends UserReq {
  currentIntake: number;
}

export default new Users();
