import { useState, useRef, useEffect } from "react";
import {
  Notification,
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  removeNotificationSubscription,
} from "expo-notifications";
import { Subscription } from "@unimodules/core";

export default function useNotifications() {
  const [notification, setNotification] = useState<Notification>();
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    (async () => {
      notificationListener.current = addNotificationReceivedListener(
        (notification) => {
          setNotification(notification);
        }
      );

      responseListener.current = addNotificationResponseReceivedListener(
        (response) => {
          console.log(response);
        }
      );
    })();

    return () => {
      if (notificationListener.current)
        removeNotificationSubscription(notificationListener.current);
      if (responseListener.current)
        removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return [notification];
}
