import { Router } from "express";
import { checkAuth, AuthReq } from "../middlewares";
import { UserData } from "../util/types";
import * as LogService from "../services/LogService";
import { parseError } from "../util/helpers";

const logRouter = Router();

logRouter.post("/sync", checkAuth, async ({ body, userData }: AuthReq, res) => {
  try {
    const { logs } = body;
    const { userId } = userData as UserData;
    res.send(await LogService.syncLogs(userId, logs));
  } catch (err) {
    res.status(400).send(parseError(err));
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
