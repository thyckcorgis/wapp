import { Router } from "express";
import { ExpoPushToken } from "expo-server-sdk";
import { AuthReq, checkAuth, createToken } from "../helpers/auth";
import { parseError } from "../util/helpers";
import * as UserService from "../services/UserService";

const userRouter = Router();

/*
body:
{
  daily: number
}
 */
userRouter.post("/daily", checkAuth, async (req: AuthReq, res) => {
  const { daily } = req.body;
  const { username } = req.userData as User;
  const user = users.setDailyIntake(username, daily);
  if (user) {
    const token = createToken(user);
    res.json({ ok: true, message: "Changed daily intake", token });
  } else {
    res.json({ ok: false, message: "User not found" });
  }
});

interface NotifReq {
  expoPushToken: ExpoPushToken;
}

userRouter.post("/notif", checkAuth, (req: AuthReq, res) => {
  const { expoPushToken } = req.body as NotifReq;
  const { username } = req.userData as User;
  const user = users.setPushToken(username, expoPushToken);
  if (user) {
    res.json({ ok: true, message: "Set push token successful", user });
  } else {
    res.json({ ok: false, message: "User not found", user });
  }
});

userRouter.delete("/token", checkAuth, (req: AuthReq, res) => {
  const { username } = req.userData as User;
  const user = users.deletePushToken(username);
  if (user) {
    res.json({ ok: true, message: "Delete push token successful", user });
  } else {
    res.json({ ok: false, message: "User not found", user });
  }
});

userRouter.post("", async (req, res) => {
  try {
    const { username, password, name, daily } = req.body;
    const token = await UserService.register(username, password, name, daily);
    res.send(token);
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

// for polling
userRouter.get("", checkAuth, (req: AuthReq, res) => {
  res.json({ user: users.getUser(req.userData?.username || "") });
});

userRouter.get("", (_, res) => {
  res.json({ users: users.users });
});

export default userRouter;
