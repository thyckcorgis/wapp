import { ExpoPushMessage } from "expo-server-sdk";

import { sendNotifications } from "../util/notifications";

export async function logWater();

export async function sendLogNotification(message: string, userId: string) {
  const tokens: string[] = [];
  const messages: ExpoPushMessage[] = [
    {
      to: tokens,
      sound: "default",
      body: message,
    },
  ];
  await sendNotifications(messages);
}
