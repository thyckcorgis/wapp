import { Router } from "express";

import { DisableAll, Disable, Enable } from "../services/NotificationService";

import { parseError } from "../util/helpers";
import { checkAuth, AuthReq } from "../middlewares";

const notificationRouter = Router();

notificationRouter.patch("", checkAuth, async ({ body, userData }: AuthReq, res) => {
  try {
    const { expoPushToken } = body;
    const userId = userData?.userId as string;
    await Enable(userId, expoPushToken);
    res.send("Enabled push notifications");
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

notificationRouter.delete("/:token", checkAuth, async ({ userData, params }: AuthReq, res) => {
  try {
    const userId = userData?.userId as string;
    const { token } = params;
    await Disable(userId, token);
    res.send("Disabled push notifications");
  } catch (err) {
    res.status(422).send(parseError(err));
  }
});

notificationRouter.delete("", checkAuth, async ({ userData }: AuthReq, res) => {
  try {
    const userId = userData?.userId as string;
    await DisableAll(userId);
    res.send("Disabled all push notifications");
  } catch (err) {
    res.status(422).send(parseError(err));
  }
});

export default notificationRouter;
