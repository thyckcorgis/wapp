import { Router } from "express";
import { hash, compare } from "bcrypt";
import users, { UserReq, LoginReq } from "../userdb";
import { ExpoPushToken } from "expo-server-sdk";

const router = Router();

/*
body:
{
  username: string,
  password: string,
}
*/
router.post("/login", async (req, res) => {
  const authFail = () => {
    res.json({ ok: false, message: "Invalid username or password" });
  };
  const { username, password } = req.body as LoginReq;
  const user = users.getUser(username);
  if (!user) return authFail();
  if (!(await compare(password, user.password))) return authFail();

  res.json({ ok: true, message: "Login successfully", user });
});

/*
body:
{
  username: string,
  daily: number
}
 */
router.post("/daily", async (req, res) => {
  const { username, daily } = req.body as { username: string; daily: number };
  const user = users.setDailyIntake(username, daily);
  if (user) {
    res.json({ ok: true, message: "Changed daily intake", user });
  } else {
    res.json({ ok: false, message: "User not found" });
  }
});
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
  try {
    if (users.getUser(username)) {
      res.json({ ok: false, message: "That username is already in use" });
      return;
    }
    const hashedPass = await hash(password, 10);
    const user = {
      username,
      password: hashedPass,
      name,
      daily: Number(daily),
      currentIntake: 0,
      friends: [],
    };
    users.addUser(user);
    res.json({ ok: true, message: "Registered successfully", user });
  } catch (error) {
    res.json({ ok: false, message: error.message });
  }
});

/*
body: {
  username: string;
  expoPushToken: ExpoPushToken 
}
 */
interface NotifReq {
  username: string;
  expoPushToken: ExpoPushToken;
}
router.post("/notif", (req, res) => {
  const { username, expoPushToken } = req.body as NotifReq;
  const user = users.setPushToken(username, expoPushToken);
  if (user) {
    res.json({ ok: true, message: "Set push token successful", user });
  } else {
    res.json({ ok: false, message: "User not found", user });
  }
});

export default router;
