import { Router } from "express";

import { Login } from "../services/UserService";

import { AuthReq, checkAuth } from "../middlewares";
import { parseError } from "../util/helpers";

const sessionRouter = Router();

/*
body:
{
  username: string,
  password: string,
}
*/
sessionRouter.post("", async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await Login(username, password);
    res.send(token);
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

sessionRouter.get("", checkAuth, ({ userData }: AuthReq, res) => {
  res.send(userData);
});

export default sessionRouter;
