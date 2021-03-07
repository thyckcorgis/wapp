import { Router } from "express";
import { AuthReq, checkAuth } from "../middlewares";
import { UserData } from "../util/types";
import { parseError } from "src/util/helpers";
import * as FriendsService from "../services/FriendsService";

const friendRouter = Router();

friendRouter.post("/request", checkAuth, async ({ body: { friend }, userData }: AuthReq, res) => {
  try {
    const { userId } = userData as UserData;
    await FriendsService.sendFriendRequest(userId, friend);
    res.send("Friend request sent");
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

friendRouter.post("/accept", checkAuth, async ({ body: { friend }, userData }: AuthReq, res) => {
  try {
    const { userId } = userData as UserData;
    await FriendsService.acceptFriendRequest(userId, friend);
    res.send("Accepted friend");
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

friendRouter.get("/pending", checkAuth, async ({ userData }: AuthReq, res) => {
  try {
    const { userId } = userData as UserData;
    res.send(await FriendsService.getUsers(userId, "pending"));
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
    res.send(await FriendsService.getUsers(userId, "nonFriends"));
  } catch (err) {
    res.status(404).send(parseError(err));
  }
});

friendRouter.get("/litreboard", checkAuth, async ({ userData }: AuthReq, res) => {
  try {
    const { userId } = userData as UserData;
    res.send(await FriendsService.getLitreboards(userId));
  } catch (err) {
    res.status(404).send(parseError(err));
  }
});

friendRouter.get("", checkAuth, async ({ userData }: AuthReq, res) => {
  try {
    const { userId } = userData as UserData;
    res.send(await FriendsService.getUsers(userId, "friends"));
  } catch (err) {
    res.status(404).send(parseError(err));
  }
});

export default friendRouter;
