export interface UserData {
  username: string;
  userId: string;
}

// date is in seconds
export type ILog = [water: number, date: number];

export type UserType = "friends" | "nonFriends" | "pending";

export class EDate extends Date {
  get month() {
    return this.getMonth() + 1;
  }
  get day() {
    return this.getDate();
  }
  get year() {
    return this.getFullYear();
  }
  get serial() {
    return Math.floor(this.getTime() / 1000);
  }
}

export type LogType = "water" | "friend";
