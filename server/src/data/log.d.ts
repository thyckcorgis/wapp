import { LogType } from "../util/types";

export interface LogAttrs<T = string> {
  userId: T;
  logType: LogType;
  water?: number;
  friendId?: T;
  dateCreated: number;
}

export interface Log<T = string> extends LogAttrs<T> {}

export interface LogRepo<T = string> {
  getMonthLog(userId: T, year: number, month: number): Promise<Log<T>[]>;
  newWaterLog(userId: T, water: number): Promise<Log<T>>;
  newFriendLog(userId: T, friendId: T): Promise<Log<T>>;
  insertLogs(logs: Log<T>[]): Promise<void>;
}
