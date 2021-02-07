import { Router } from "express";
import { sendLogNotification } from "../notifications";
import users from "../userdb";

const router = Router();

function createMessage(username: string, intake: number, goalMet: boolean) {
  if (goalMet) return `${username} just met their daily water intake goal!`;
  return `${username} just drank ${intake} litres of water!`;
}

interface LogReq {
  username: string;
  water: number;
  friends: string[];
}

/*
body:
{
  username: string,
  water: number // water intake
  friends: [
    string // usernames
  ]
}
*/
router.post("/", (req, res) => {
  const { username, water, friends } = req.body as LogReq;
  const intake = Number(water);
  const goalMet = users.addWaterIntake(username, intake);
  const toNotify = users.filterUsers(friends);
  // notify friends
  const message = createMessage(username, intake, Boolean(goalMet));
  sendLogNotification(message, toNotify);
  res.json({ ok: true, message: "Added log" });
});

export default router;
