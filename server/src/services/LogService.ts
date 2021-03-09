import User from "../models/user";
import Log from "../models/log";

import { ILog, EDate, LogType } from "../util/types";
import { validate, syncLogs, logIntake, getMonthly } from "../util/validations";
import { sendNotifications } from "../util/notifications";

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

export async function SyncIntakeLogs(userId: string, logs: ILog[]) {
  await validate(syncLogs, logs);

  const currentIntake = getTodaysIntake(logs);
  await User.findByIdAndUpdate(userId, { currentIntake }).exec();

  const logType: LogType = "water";
  await Log.insertMany(
    logs.map(([water, date]) => ({
      userId,
      water,
      dateCreated: new EDate(date).serial,
      logType,
    }))
  );
}

export async function LogWater(username: string, userId: string, intake: number) {
  await validate(logIntake, { intake });
  const user = await User.getUser(userId);
  const message = createMessage(username, intake, await user.addWater(intake));

  const newLog = new Log({ userId, water: intake, logType: "water" });
  await newLog.save();

  const friendPushTokens = (await user.getFriends()).flatMap((friend) => friend.pushTokens);
  sendNotifications(message, friendPushTokens);
  return newLog.water;
}

export function LogFriendRequest(userId: string, friendId: string) {
  return new Log({ userId, friendId, logType: "friend" }).save();
}

export async function GetMonthlyLog(userId: string, year: number, month: number): Promise<ILog[]> {
  // use this month if invalid input
  const { error } = getMonthly.validate({ year, month });
  if (error) ({ year, month } = new EDate());
  return (await Log.getMonthLog(userId, year, month)).map(({ water, dateCreated }) => [
    water as number,
    dateCreated,
  ]);
}
