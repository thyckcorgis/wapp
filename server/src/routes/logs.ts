import { Router } from "express";
import { checkAuth, AuthReq } from "../middlewares";
import { UserData, EDate } from "../util/types";
import * as LogService from "../services/LogService";
import { parseError } from "../util/helpers";
import { getMonthly } from "src/util/validations";

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

const getNum = (num: any) => parseInt(num);
logRouter.get("", checkAuth, async ({ query, userData }: AuthReq, res) => {
  try {
    let year = getNum(query.year),
      month = getNum(query.month);
    // use this month if invalid input
    const { error } = getMonthly.validate({ year, month });
    if (error) ({ year, month } = new EDate());

    const { userId } = userData as UserData;
    res.send(await LogService.getMonthlyLog(userId, year, month));
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

export default logRouter;
