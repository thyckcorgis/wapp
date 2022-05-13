import { Inject, Service } from "typedi";
import { LogRepo, UserRepo } from "../data";
import { sendNotifications } from "../util/notifications";
import { EDate, ILog, LogType } from "../util/types";
import { getMonthly, logIntake, syncLogs, validate } from "../util/validations";

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

@Service()
export default class LogService {
  constructor(
    @Inject("userRepo") private userRepo: UserRepo,
    @Inject("logRepo") private logRepo: LogRepo
  ) {}

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
