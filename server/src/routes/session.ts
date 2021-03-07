import { Router } from "express";
import { parseError } from "../util/helpers";
import * as UserService from "../services/UserService";
import { AuthReq, checkAuth } from "../helpers/auth";

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
    const token = UserService.login(username, password);
    res.send(token);
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

sessionRouter.get("", checkAuth, ({ userData }: AuthReq, res) => {
  res.send(userData);
});

export default sessionRouter;
