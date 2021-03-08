import { Router } from "express";

import { SyncIntakeLogs, LogWater, GetMonthlyLog } from "../services/LogService";

import { UserData } from "../util/types";
import { parseError } from "../util/helpers";
import { checkAuth, AuthReq } from "../middlewares";

const logRouter = Router();

logRouter.post("/sync", checkAuth, async ({ body, userData }: AuthReq, res) => {
  try {
    const { logs } = body;
    const { userId } = userData as UserData;
    res.send(await SyncIntakeLogs(userId, logs));
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

logRouter.post("", checkAuth, async ({ body, userData }: AuthReq, res) => {
  try {
    const { userId, username } = userData as UserData;
    const { water } = body;
    res.send(await LogWater(username, userId, water));
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

const getNum = (num: any) => parseInt(num);

logRouter.get("", checkAuth, async ({ query, userData }: AuthReq, res) => {
  try {
    let year = getNum(query.year),
      month = getNum(query.month);

    const { userId } = userData as UserData;
    res.send(await GetMonthlyLog(userId, year, month));
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

export default logRouter;
