import { Subscription } from "@unimodules/core";
import {
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  Notification,
  removeNotificationSubscription,
} from "expo-notifications";
import { useEffect, useRef, useState } from "react";

export default function useNotifications() {
  const [notification, setNotification] = useState<Notification>();
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    (async () => {
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
  return [notification];
}
