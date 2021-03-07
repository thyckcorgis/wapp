import User from "../models/user";
import expo from "expo-server-sdk";

export async function disableAllNotifs(userId: string) {
  await User.findByIdAndUpdate(userId, { notify: false }).exec();
}

export async function disablePushNotif(userId: string, expoPushToken: string) {
  if (!expo.isExpoPushToken(expoPushToken)) throw new Error("Invalid push token");
  await User.findByIdAndUpdate(userId, {
    $pull: {
      pushTokens: expoPushToken,
    },
  }).exec();
}

export async function enablePushNotif(userId: string, expoPushToken: string) {
  if (!expo.isExpoPushToken(expoPushToken)) throw new Error("Invalid push token");
  await User.findByIdAndUpdate(userId, {
    notify: true,
    $push: {
      pushTokens: expoPushToken,
    },
  }).exec();
}
