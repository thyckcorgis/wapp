import User from "../models/user";
import Log from "../models/log";

import { ILog } from "../util/types";
import * as validators from "../util/validations";
import { sendNotifications } from "../util/notifications";

function createMessage(username: string, intake: number, goalMet: boolean) {
  if (goalMet) return `${username} just met their daily water intake goal!`;
  return `${username} just drank ${intake} mL of water!`;
}

export async function syncLogs(userId: string, logs: ILog[]) {
  try {
    const { error } = validators.syncLogs.validate(logs);
    if (error) throw error;
    const user = await User.findById(userId).exec();
    if (!user) throw new Error("User not found");
  } catch (err) {
    throw err;
  }
}

export async function logWater(username: string, userId: string, intake: number) {
  try {
    const { error } = validators.logIntake.validate({ intake });
    if (error) throw error;
    const user = await User.findById(userId).exec();
    if (!user) throw new Error("User not found");

    const message = createMessage(username, intake, await user.addWater(intake));
    const newLog = new Log({ userId, water: intake });
    await newLog.save();
    const pushTokens = (await user.getFriends()).map((friend) => friend.pushTokens).flat();
    sendNotifications(message, pushTokens);
    return newLog.water;
  } catch (err) {
    throw err;
  }
}
