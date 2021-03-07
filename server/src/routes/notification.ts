import { Router } from "express";
import { parseError } from "src/util/helpers";
import { checkAuth, AuthReq } from "../helpers/auth";
import * as NotificationService from "../services/NotificationService";

const notificationRouter = Router();

notificationRouter.patch("", checkAuth, async ({ body, userData }: AuthReq, res) => {
  try {
    const { expoPushToken } = body;
    const userId = userData?.userId as string;
    await NotificationService.enablePushNotif(userId, expoPushToken);
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

notificationRouter.delete("/:token", checkAuth, async ({ userData, params }: AuthReq, res) => {
  try {
    const userId = userData?.userId as string;
    const { token } = params;
    await NotificationService.disablePushNotif(userId, token);
    res.send(userData);
  } catch (err) {
    res.status(422).send(parseError(err));
  }
});

notificationRouter.delete("", checkAuth, async ({ userData }: AuthReq, res) => {
  try {
    const userId = userData?.userId as string;
    await NotificationService.disableAllNotifs(userId);
    res.send(userData);
  } catch (err) {
    res.status(422).send(parseError(err));
  }
});

export default notificationRouter;
