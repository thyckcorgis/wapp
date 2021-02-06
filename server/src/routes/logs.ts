import { Router } from "express";
import users from "../userdb";

const router = Router();

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

  res.json({ message: "Added log" });
});

export default router;
