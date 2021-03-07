import { Router } from "express";
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
userRouter.patch("/daily", checkAuth, async (req: AuthReq, res) => {
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

userRouter.post("", async (req, res) => {
  try {
    const { username, password, name, daily } = req.body;
    const token = await UserService.register(username, password, name, daily);
    res.send(token);
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

export default userRouter;
