import { Router } from "express";
import { AuthReq, checkAuth, createToken } from "../helpers/auth";
import { sendLogNotification } from "../helpers/notifications";
import users, { User } from "../helpers/userdb";

const router = Router();

function createMessage(username: string, intake: number, goalMet: boolean) {
  if (goalMet) return `${username} just met their daily water intake goal!`;
  return `${username} just drank ${intake} mL of water!`;
}

interface LogReq {
  water: number;
}

// http methods what dx
router.patch("/reset", checkAuth, (req: AuthReq, res) => {
  const { username } = req.userData as User;
  const user = users.resetCurrentIntake(username);
  if (user) {
    const token = createToken(user);
    res.json({ ok: true, message: "Reset user", token });
  } else {
    res.json({ ok: false, message: "Error resetting" });
  }
});

// router.get("/reset", (_, res) => {
//   users.resetAllCurrentIntake();
//   res.json({ ok: true, message: "reset all" });
// });

/*
body:
{
  water: number // water intake
}
*/
router.post("/", checkAuth, (req: AuthReq, res) => {
  const { username } = req.userData as User;
  const { water } = req.body as LogReq;
  const user = users.getUser(username);
  if (!user) {
    res.json({ ok: false, message: "User not found" });
    return;
  }
  const intake = Number(water);
  const goalMet = users.addWaterIntake(username, intake);
  const toNotify = users.filterUsers(user.friends);
  // notify friends
  const message = createMessage(username, intake, Boolean(goalMet));
  sendLogNotification(message, toNotify);
  const token = createToken(users.getUser(username) as User);
  res.json({ ok: true, message: "Added log", token });
});

export default router;
