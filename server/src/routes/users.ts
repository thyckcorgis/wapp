import { Router } from "express";
import { hash } from "bcrypt";

const users: User[] = [];

interface User {
  username: string; // unique username
  password: string; // plaintext password in the req, hashed password in array
  name: string; // user's full name
  daily: number; // daily water intake
}

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
  const { username, password, name, daily } = req.body as User;
  const hashedPass = await hash(password, 10);
  users.push({
    username,
    password: hashedPass,
    name,
    daily: Number(daily),
  });
  res.json({ message: "Registered successfully" });
});

export default router;
