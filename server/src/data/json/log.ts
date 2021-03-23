import { v4 as uuidv4 } from "uuid";
import { EDate } from "../../util/types";

import { LogType } from "../../util/types";
import { Log, LogAttrs, LogRepo } from "../";
import FlatFile, { FileObject, loadFromFile, saveToFile } from "./FlatFile";

interface ILogObject extends LogAttrs {
  id: string;
}

export class LogObject implements Log, ILogObject {
  userId: string;
  logType: LogType;
  dateCreated: number;
  water?: number;
  friendId?: string;

  id: string;

  constructor(log: ILogObject) {
    this.id = log.id;
    this.userId = log.userId;
    this.dateCreated = log.dateCreated;
    this.water = log.water;
    this.logType = log.logType;
  }
}

export class LogJSON implements LogRepo, FlatFile {
  filePath: string;
  logs: FileObject<LogObject>;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async load() {
    const logs = await loadFromFile<ILogObject>(this.filePath);
    Object.values(logs).forEach((log) => {
      const newLog = new LogObject(log);
      this.logs[newLog.id] = newLog;
    });
  }

  async save() {
    await saveToFile<ILogObject>(this.filePath, this.logs);
  }

  async getMonthLog(userId: string, year: number, month: number) {
    const firstDay = new EDate(year, month, 1).serial;
    const lastDay = new EDate(year, month + 1, 0).serial;
    return Object.values(this.logs).filter(
      (log) =>
        log.userId === userId &&
        log.logType === "water" &&
        log.dateCreated >= firstDay &&
        log.dateCreated < lastDay
    );
  }

  async createNewLog<T>(userId: string, type: LogType, value: T) {
    const property = type === "friend" ? "friendId" : "water";
    const log: ILogObject = {
      id: uuidv4(),
      userId,
      [property]: value,
      logType: type,
      dateCreated: Math.floor(Date.now() / 1000),
    };
    const newLog = new LogObject(log);
    this.logs[newLog.id] = newLog;
    return newLog;
  }

  async newWaterLog(userId: string, water: number) {
    return this.createNewLog<number>(userId, "water", water);
  }

  async newFriendLog(userId: string, friendId: string) {
    return this.createNewLog<string>(userId, "friend", friendId);
  }

  async insertLogs(logs: LogObject[]) {
    logs.forEach((log) => {
      this.logs[log.id] = log;
    });
  }
}
