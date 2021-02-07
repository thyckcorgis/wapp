import { Router } from "express";
import { friendRequestNotification } from "src/notifications";
import users from "../userdb";

const router = Router();

interface FriendReq {
  username: string;
  friend: string;
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
  const user = users.getUser(friend);
  if (!user) {
    res.json({ ok: false, message: "User not found" });
  } else {
    users.addPendingRequest(friend, username);
    friendRequestNotification(username, user, "send");
    res.json({ ok: true, message: "Request sent" });
  }
});

router.post("/accept", (req, res) => {
  const { username, friend } = req.body as FriendReq;
  const user = users.getUser(friend);
  if (!user) {
    res.json({ ok: false, message: "User not found" });
  } else {
    users.connectFriends(username, friend);
    users.removePendingRequest(username, friend);
    friendRequestNotification(username, user, "accept");
    res.json({ ok: true, message: "Friend request accepted" });
  }
});

router.post("/pending", (req, res) => {
  const username = req.body.username as string;
  const user = users.getUser(username);
  if (!user) {
    res.json({ ok: false, message: "User not found" });
  } else {
    const pendingRequests = users.getNames(user.pendingRequests);
    res.json({ ok: true, pending: pendingRequests });
  }
});

router.get("/", (_, res) => {
  res.json({ users: users.getAllUsers() });
});

export default router;
