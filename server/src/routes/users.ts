import { Router } from "express";

import { Login, Register, DailyIntake, DailyReminders } from "../services/UserService";

import { AuthReq, checkAuth } from "../middlewares";
import { parseError } from "../util/helpers";

const userRouter = Router();

userRouter.patch("/reminder", checkAuth, async ({ body, userData }: AuthReq, res) => {
  try {
    const { wakeTime, sleepTime } = body;
    const userId = userData?.userId as string;
    await DailyReminders(userId, wakeTime, sleepTime);
    res.send("Updated wake and sleep time");
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

userRouter.patch("/daily", checkAuth, async ({ body, userData }: AuthReq, res) => {
  try {
    const { daily } = body;
    const userId = userData?.userId as string;
    await DailyIntake(userId, daily);
    res.send("Updated daily goal");
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

userRouter.post("/login", async ({ body: { username, password } }, res) => {
  try {
    const token = await Login(username, password);
    res.send(token);
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

userRouter.post("", async ({ body }, res) => {
  try {
    const { username, password, name, daily } = body;
    res.send(await Register(username, password, name, daily));
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

userRouter.get("", checkAuth, ({ userData }: AuthReq, { send }) => send(userData));

export default userRouter;
