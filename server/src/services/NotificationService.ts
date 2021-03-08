import { Expo } from "expo-server-sdk";

import User from "../models/user";

// Route Operations
export async function DisableAll(userId: string) {
  await User.findByIdAndUpdate(userId, { notify: false }).exec();
}

export async function Disable(userId: string, expoPushToken: string) {
  if (!Expo.isExpoPushToken(expoPushToken)) throw new Error("Invalid push token");
  await User.findByIdAndUpdate(userId, {
    $pull: {
      pushTokens: expoPushToken,
    },
  }).exec();
}

export async function Enable(userId: string, expoPushToken: string) {
  if (!Expo.isExpoPushToken(expoPushToken)) throw new Error("Invalid push token");
  await User.findByIdAndUpdate(userId, {
    notify: true,
    $push: {
      pushTokens: expoPushToken,
    },
  }).exec();
}
