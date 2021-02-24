import { Router } from "express";
import { AuthReq, checkAuth } from "../auth";
import { friendRequestNotification } from "../notifications";
import users, { User } from "../userdb";

const router = Router();

interface FriendReq {
  username: string;
  friend: string;
}

/*
body:
{
  friend: string
}
*/
router.post("/request", checkAuth, (req: AuthReq, res) => {
  const { friend } = req.body as FriendReq;
  // send notification to friend
  const user = req.userData as User;
  const { username } = user;
  if (users.addPendingRequest(friend, username)) {
    friendRequestNotification(username, user, "send");
    res.json({ ok: true, message: "Request sent" });
  } else {
    res.json({ ok: false, message: "Request already sent" });
  }
});

router.post("/accept", checkAuth, (req: AuthReq, res) => {
  const { friend } = req.body as FriendReq;
  const user = req.userData as User;
  const { username } = user;
  users.connectFriends(username, friend);
  users.removePendingRequest(username, friend);
  friendRequestNotification(username, user, "accept");
  res.json({ ok: true, message: "Friend request accepted" });
});

router.get("/pending", checkAuth, (req: AuthReq, res) => {
  const user = req.userData as User;
  const pendingRequests = users.getNames(user.pendingRequests);
  res.json({ ok: true, pending: pendingRequests });
});

/**
 * Only sends users that haven't been added yet
 */
router.get("/to-add", checkAuth, (req: AuthReq, res) => {
  const user = req.userData as User;
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
});

const completion = (b: User, a: User) =>
  a.currentIntake / a.daily - b.currentIntake / b.daily;
const percentage = (user: User) => ({
  username: user.username,
  name: user.name,
  currrentIntake: user.currentIntake,
  daily: user.daily,
  percentage: (user.currentIntake / user.daily) * 100,
});

router.get("/litreboard", checkAuth, (req: AuthReq, res) => {
  const user = req.userData as User;
  const allFriends = users.getAllFriends(user.username);
  allFriends.push(user);
  const sorted = allFriends.sort(completion).map(percentage);
  res.json({ users: sorted });
});

router.get("/", checkAuth, (req: AuthReq, res) => {
  const allFriends = users.getAllFriends(req.userData?.username as string);
  res.json({ users: allFriends });
});

export default router;
