import User from "../models/user";
import Log from "../models/log";

import { ILog, EDate, LogType } from "../util/types";
import * as validators from "../util/validations";
import { sendNotifications } from "../util/notifications";

function createMessage(username: string, intake: number, goalMet: boolean) {
  if (goalMet) return `${username} just met their daily water intake goal!`;
  return `${username} just drank ${intake} mL of water!`;
}

const sum = (total: number, num: number) => total + num;

const getTodaysIntake = (logs: ILog[]) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const tomorrow = today + 1000 * 60 * 60 * 24;
  return logs
    .filter((log) => today <= log[1] && log[1] < tomorrow)
    .map(([intake]) => intake)
    .reduce(sum);
};

export async function syncLogs(userId: string, logs: ILog[]) {
  const { error } = validators.syncLogs.validate(logs);
  if (error) throw error;

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

export async function logWater(username: string, userId: string, intake: number) {
  const { error } = validators.logIntake.validate({ intake });
  if (error) throw error;
  const user = await User.getUser(userId);
  const message = createMessage(username, intake, await user.addWater(intake));

  const newLog = new Log({ userId, water: intake });
  await newLog.save();

  const friendPushTokens = (await user.getFriends()).map((friend) => friend.pushTokens).flat();
  sendNotifications(message, friendPushTokens);
  return newLog.water;
}

export async function logFriendRequest(userId: string, friendId: string) {
  await new Log({ userId, friendId, logType: "friend" }).save();
}

export async function getMonthlyLog(userId: string, year: number, month: number): Promise<ILog[]> {
  return (await Log.getMonthLog(userId, year, month)).map(({ water, dateCreated }) => [
    water as number,
    dateCreated,
  ]);
}
