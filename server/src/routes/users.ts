import { Router } from "express";
import users, { LoginReq } from "../helpers/userdb";
import { ExpoPushToken } from "expo-server-sdk";
import { AuthReq, checkAuth, createToken } from "../helpers/auth";
import { parseError } from "../util/helpers";
import * as UserService from "../services/UserService";

const userRouter = Router();

/*
body:
{
  username: string,
  password: string,
}
*/
userRouter.post("/login", async (req, res) => {
  const authFail = () => {
    res.json({ ok: false, message: "Invalid username or password" });
  };
  const { username, password } = req.body as LoginReq;
  const user = users.getUser(username);
  if (!user) return authFail();
  if (!(await compare(password, user.password))) return authFail();
  const token = createToken(user);
  res.json({ ok: true, message: "Login successfully", token });
});

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
