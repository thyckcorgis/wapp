import User from "../models/user";
import { Expo, ExpoPushMessage } from "expo-server-sdk";

// Route Operations
export async function disableAllNotifs(userId: string) {
  await User.findByIdAndUpdate(userId, { notify: false }).exec();
}

export async function disablePushNotif(userId: string, expoPushToken: string) {
  if (!Expo.isExpoPushToken(expoPushToken)) throw new Error("Invalid push token");
  await User.findByIdAndUpdate(userId, {
    $pull: {
      pushTokens: expoPushToken,
    },
  }).exec();
}

export async function enablePushNotif(userId: string, expoPushToken: string) {
  if (!Expo.isExpoPushToken(expoPushToken)) throw new Error("Invalid push token");
  await User.findByIdAndUpdate(userId, {
    notify: true,
    $push: {
      pushTokens: expoPushToken,
    },
  }).exec();
}

// Sending Notifications

export async function friendRequestNotification(
  username: string,
  friend: User,
  type: "send" | "accept"
) {
  const token = friend.expoPushToken;
  if (!token) return false;
  const message =
    type === "send"
      ? `${username} wants to add you as a friend`
      : `${username} has accepted your friend request`;

  const messages: ExpoPushMessage[] = [
    {
      to: token,
      sound: "default",
      body: message,
    },
  ];
  await sendNotifications(messages);
  return true;
}
