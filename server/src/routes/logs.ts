import { Router } from "express";
import { Container } from "typedi";
import { AuthReq, checkAuth } from "../middlewares";
import LogService from "../services/LogService";
import { parseError } from "../util/helpers";
import { UserData } from "../util/types";

const logRouter = Router();
const logService = Container.get(LogService);

logRouter.post("/sync", checkAuth, async ({ body, userData }: AuthReq, res) => {
  try {
    const { logs } = body;
    const { userId } = userData as UserData;
    res.send(await logService.syncIntakeLogs(userId, logs));
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

logRouter.post("/", checkAuth, async ({ body, userData }: AuthReq, res) => {
  try {
    const { userId, username } = userData as UserData;
    const { water } = body;
    res.send(await logService.logWater(username, userId, water));
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

const getNum = (num: any) => parseInt(num);

logRouter.get("/", checkAuth, async ({ query, userData }: AuthReq, res) => {
  try {
    let year = getNum(query.year),
      month = getNum(query.month);

    const { userId } = userData as UserData;
    res.send(await logService.getMonthlyLog(userId, year, month));
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

export default logRouter;
