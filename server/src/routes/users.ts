import { Router } from "express";
import { Container } from "typedi";
import { AuthReq, checkAuth } from "../middlewares";
import UserService from "../services/UserService";
import { parseError } from "../util/helpers";

const userRouter = Router();
const userService = Container.get(UserService);

userRouter.patch("/reminder", checkAuth, async ({ body, userData }: AuthReq, res) => {
  try {
    const { wakeTime, sleepTime } = body;
    const userId = userData?.userId as string;
    await userService.dailyReminders(userId, wakeTime, sleepTime);
    res.send("Updated wake and sleep time");
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

userRouter.patch("/daily", checkAuth, async ({ body, userData }: AuthReq, res) => {
  try {
    const { daily } = body;
    const userId = userData?.userId as string;
    await userService.dailyIntake(userId, daily);
    res.send("Updated daily goal");
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

userRouter.post("/login", async ({ body: { username, password } }, res) => {
  try {
    const token = await userService.login(username, password);
    res.send(token);
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

// Register a user
userRouter.post("/", async ({ body }, res) => {
  try {
    const { username, email, password, name, daily } = body;
    res.send(await userService.register(username, email, password, name, daily));
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

userRouter.get("/", checkAuth, ({ userData }: AuthReq, { send }) => send(userData));

export default userRouter;
