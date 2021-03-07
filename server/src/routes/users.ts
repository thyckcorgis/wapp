import { Router } from "express";
import { AuthReq, checkAuth } from "../helpers/auth";
import { parseError } from "../util/helpers";
import * as UserService from "../services/UserService";

const userRouter = Router();

userRouter.patch("/reminder", checkAuth, async ({ body, userData }: AuthReq, res) => {
  try {
    const { wakeTime, sleepTime } = body;
    const userId = userData?.userId as string;
    await UserService.setReminders(userId, wakeTime, sleepTime);
    res.send({ wakeTime, sleepTime });
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

userRouter.patch("/daily", checkAuth, async ({ body, userData }: AuthReq, res) => {
  try {
    const { daily } = body;
    const userId = userData?.userId as string;
    await UserService.setDailyIntake(userId, daily);
    res.send(daily);
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

userRouter.post("", async ({ body }, res) => {
  try {
    const { username, password, name, daily } = body;
    const token = await UserService.register(username, password, name, daily);
    res.send(token);
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

export default userRouter;
