import { Router } from "express";
import { hash } from "bcrypt";
import users, { UserReq } from "../userdb";

const router = Router();

/*
body:
{
  username: string,
  password: string,
  name: string,
  daily: number
}
*/
router.post("/register", async (req, res) => {
  const { username, password, name, daily } = req.body as UserReq;
  const hashedPass = await hash(password, 10);
  users.addUser({
    username,
    password: hashedPass,
    name,
    daily: Number(daily),
    currentIntake: 0,
  });
  res.json({ message: "Registered successfully" });
});

export default router;
