import UserModel from "../data/models/user";
import LogModel from "../data/models/log";

import { ILog, EDate, LogType } from "../util/types";
import { validate, syncLogs, logIntake, getMonthly } from "../util/validations";
import { sendNotifications } from "../util/notifications";
import { LogRepo, UserRepo } from "../data";

function createMessage(username: string, intake: number, goalMet: boolean) {
  if (goalMet) return `${username} just met their daily water intake goal!`;
  return `${username} just drank ${intake} mL of water!`;
}

const sum = (total: number, num: number) => total + num;

const getTodaysIntake = (logs: ILog[]) => {
  const today = Math.floor(new Date().setHours(0, 0, 0, 0) / 1000);
  const tomorrow = today + 60 * 60 * 24;
  return logs
    .filter((log) => today <= log[1] && log[1] < tomorrow)
    .map(([intake]) => intake)
    .reduce(sum);
};

export class LogService {
  logRepo: LogRepo;
  userRepo: UserRepo;

  constructor(userRepo: UserRepo, logRepo: LogRepo) {
    this.userRepo = userRepo;
    this.logRepo = logRepo;
  }

  async syncIntakeLogs(userId: string, logs: ILog[]) {
    await validate(syncLogs, logs);

    const currentIntake = getTodaysIntake(logs);
    await this.userRepo.updateCurrentIntake(userId, currentIntake);

    const logType: LogType = "water";
    await this.logRepo.insertLogs(
      logs.map(([water, date]) => ({
        userId,
        water,
        dateCreated: new EDate(date).serial,
        logType,
      }))
    );
  }

  async logWater(username: string, userId: string, intake: number) {
    await validate(logIntake, { intake });
    const user = await this.userRepo.getUser(userId);
    const message = createMessage(username, intake, await user.addWater(intake));

    const newLog = await this.logRepo.newWaterLog(userId, intake);

    const friendPushTokens = (await user.getFriends()).flatMap((friend) => friend.pushTokens);
    sendNotifications(message, friendPushTokens);
    return newLog.water;
  }

  async getMonthlyLog(userId: string, year: number, month: number): Promise<ILog[]> {
    // use this month if invalid input
    const { error } = getMonthly.validate({ year, month });
    if (error) ({ year, month } = new EDate());
    return (await this.logRepo.getMonthLog(userId, year, month)).map(({ water, dateCreated }) => [
      water as number,
      dateCreated,
    ]);
  }
}

export default new LogService(UserModel, LogModel);
