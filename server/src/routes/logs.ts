import { Router } from "express";
import { checkAuth, AuthReq } from "../middlewares";
import { UserData } from "../util/types";
import * as LogService from "../services/LogService";
import { parseError } from "../util/helpers";

const logRouter = Router();

// http methods what dx
logRouter.patch("/reset", checkAuth, (req: AuthReq, res) => {
  const { username, userId } = req.userData as UserData;
  const user = users.resetCurrentIntake(username);
  if (user) {
    const token = createToken(user);
    res.json({ ok: true, message: "Reset user", token });
  } else {
    res.json({ ok: false, message: "Error resetting" });
  }
});

logRouter.post("", checkAuth, async ({ body, userData }: AuthReq, res) => {
  try {
    const { userId, username } = userData as UserData;
    const { water } = body;
    res.send(await LogService.logWater(username, userId, water));
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

export default logRouter;
