import { Router } from "express";
import { friendRequestNotification } from "../notifications";
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
    if (users.addPendingRequest(friend, username)) {
      friendRequestNotification(username, user, "send");
      res.json({ ok: true, message: "Request sent" });
    } else {
      res.json({ ok: false, message: "Request already sent" });
    }
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

router.get("/pending/:user", (req, res) => {
  const user = users.getUser(req.params.user);
  if (!user) {
    res.json({ ok: false, message: "User not found" });
  } else {
    const pendingRequests = users.getNames(user.pendingRequests);
    res.json({ ok: true, pending: pendingRequests });
  }
});

/**
 * Only sends users that haven't been added yet
 */
router.get("/to-add/:user", (req, res) => {
  const user = users.getUser(req.params.user);
  if (!user) {
    res.json({ ok: false, message: "User not found" });
  } else {
    const { friends, pendingRequests } = user;
    let allUsers = users
      .getAllUsers()
      .filter(
        ({ username }) =>
          !(
            friends.includes(username) ||
            pendingRequests.includes(username) ||
            username === user.username
          )
      );
    console.log(allUsers);
    res.json({ users: allUsers });
  }
});

router.get("/litreboard/:user", (req, res) => {
  const user = users.getUser(req.params.user);
  if (!user) {
    res.json({ ok: false, message: "User not found" });
    return;
  }
  let allFriends = users.getAllFriends(user.username);
  if (!allFriends) {
    res.json({ ok: false, message: "Friends not found" });
    return;
  }
  allFriends.push(user);
  const sorted = allFriends
    .sort((b, a) => a.currentIntake / a.daily - b.currentIntake / b.daily)
    .map((u) => ({
      username: u.username,
      name: u.name,
      currrentIntake: u.currentIntake,
      daily: u.daily,
      percentage: (u.currentIntake / u.daily) * 100,
    }));
  res.json({ users: sorted });
});

router.get("/:user", (req, res) => {
  const user = users.getUser(req.params.user);
  if (!user) {
    res.json({ ok: false, message: "User not found" });
  } else {
    let allFriends = users.getAllFriends(user.username);
    console.log(allFriends);
    res.json({ users: allFriends });
  }
});

export default router;
