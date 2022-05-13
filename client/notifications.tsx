import {
  Notification,
  setNotificationHandler,
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  removeNotificationSubscription,
  scheduleNotificationAsync,
  getPermissionsAsync,
  requestPermissionsAsync,
  getExpoPushTokenAsync,
  setNotificationChannelAsync,
  AndroidImportance,
  NotificationContentInput,
} from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import { Subscription } from "@unimodules/core";

import { uploadPushToken } from "./util";

setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Grabbed from documentation lmao

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");

  const [notification, setNotification] = useState<Notification>();
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    (async () => {
      const token = await registerForPushNotificationsAsync();
      if (!token) return;
      setExpoPushToken(token);

      notificationListener.current = addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

      responseListener.current = addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    })();

    return () => {
      if (notificationListener.current)
        removeNotificationSubscription(notificationListener.current);
      if (responseListener.current) removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification({ title: "hi" }, 0.02);
        }}
      />
      <Button
        title="Press to upload push token"
        onPress={async () => {
          await uploadPushToken("charles", (await registerForPushNotificationsAsync()) as string);
        }}
      />
    </View>
  );
}

/*
content: {
  title: "You've got mail! 📬",
  body: "Here is the notification body",
  data: { data: "goes here" },
}
*/
export async function schedulePushNotification(content: NotificationContentInput, minutes: number) {
  await scheduleNotificationAsync({
    content,
    trigger: { seconds: minutes * 60 },
  });
}

export async function registerForPushNotificationsAsync() {
  let token;
  const { status: existingStatus } = await getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
  token = (await getExpoPushTokenAsync()).data;

  if (Platform.OS === "android") {
    setNotificationChannelAsync("default", {
      name: "default",
      importance: AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
