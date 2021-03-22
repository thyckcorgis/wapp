import { LogType } from "../util/types";

export interface Log {
  userId: string;
  logType: LogType;
  water?: number;
  friendId?: string;
  dateCreated: number;
}

export interface LogRepo {
  getMonthLog(userId: string, year: number, month: number): Promise<Log[]>;
  newWaterLog(userId: string, water: number): Promise<Log>;
  newFriendLog(userId: string, friendId: string): Promise<void>;
  insertLogs(logs: Log[]): Promise<void>;
}
