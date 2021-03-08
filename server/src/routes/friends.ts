import { Router } from "express";
import { SendRequest, AcceptRequest, GetUsers, GetLitreboards } from "../services/FriendsService";

import { UserData } from "../util/types";
import { parseError } from "../util/helpers";
import { AuthReq, checkAuth } from "../middlewares";

const friendRouter = Router();

friendRouter.post("/request", checkAuth, async ({ body: { friend }, userData }: AuthReq, res) => {
  try {
    const { userId } = userData as UserData;
    await SendRequest(userId, friend);
    res.send("Friend request sent");
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

friendRouter.post("/accept", checkAuth, async ({ body: { friend }, userData }: AuthReq, res) => {
  try {
    const { userId } = userData as UserData;
    await AcceptRequest(userId, friend);
    res.send("Accepted friend");
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

friendRouter.get("/pending", checkAuth, async ({ userData }: AuthReq, res) => {
  try {
    const { userId } = userData as UserData;
    res.send(await GetUsers(userId, "pending"));
  } catch (err) {
    res.status(404).send(parseError(err));
  }
});

/**
 * Only sends users that haven't been added yet
 */
friendRouter.get("/to-add", checkAuth, async ({ userData }: AuthReq, res) => {
  try {
    const { userId } = userData as UserData;
    res.send(await GetUsers(userId, "nonFriends"));
  } catch (err) {
    res.status(404).send(parseError(err));
  }
});

friendRouter.get("/litreboard", checkAuth, async ({ userData }: AuthReq, res) => {
  try {
    const { userId } = userData as UserData;
    res.send(await GetLitreboards(userId));
  } catch (err) {
    res.status(404).send(parseError(err));
  }
});

friendRouter.get("", checkAuth, async ({ userData }: AuthReq, res) => {
  try {
    const { userId } = userData as UserData;
    res.send(await GetUsers(userId, "friends"));
  } catch (err) {
    res.status(404).send(parseError(err));
  }
});

export default friendRouter;
