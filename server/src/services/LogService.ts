import User from "../models/user";
import Log from "../models/log";

import { sendNotifications } from "../util/notifications";

function createMessage(username: string, intake: number, goalMet: boolean) {
  if (goalMet) return `${username} just met their daily water intake goal!`;
  return `${username} just drank ${intake} mL of water!`;
}

export async function logWater(username: string, userId: string, intake: number) {
  try {
    const user = await User.findById(userId).exec();
    if (user) {
      const message = createMessage(username, intake, await user.addWater(intake));
      const newLog = new Log({ userId, water: intake });
      await newLog.save();
      const pushTokens = (await user.getFriends()).map((friend) => friend.pushTokens).flat();
      sendNotifications(message, pushTokens);
      return newLog.water;
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    throw err;
  }
}
