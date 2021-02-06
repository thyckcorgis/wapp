import { Router } from "express";
import users from "../userdb";

const router = Router();

interface FriendReq {
  username: string;
  friend: string;
}

function sendFriendRequest(username: string, friend: string) {
  console.log("Send friend request here");
  console.log({ username, friend });
}
/*
body:
{
  username: string,
  friend: string
}
*/
router.post("/request", (req, res) => {
  const { username, friend } = req.body as FriendReq;
  // send notification to friend
  sendFriendRequest(username, friend);
  res.json({ ok: true, message: "Request sent" });
});

router.post("/accept", (req, res) => {
  const { username, friend } = req.body as FriendReq;
  // send notification to
  users.connectFriends(username, friend);
  res.json({ ok: true, message: "Added friend" });
});

router.get("/", (_, res) => {
  res.json({ users: users.getAllUsers() });
});

export default router;
