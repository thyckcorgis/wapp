import { Router } from "express";
import { hash, compare } from "bcrypt";
import users, { UserReq, LoginReq, newUser, User } from "../helpers/userdb";
import { ExpoPushToken } from "expo-server-sdk";
import { AuthReq, checkAuth, createToken } from "../helpers/auth";

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
  const token = createToken(user);
  res.json({ ok: true, message: "Login successfully", token });
});

/*
body:
{
  daily: number
}
 */
router.post("/daily", checkAuth, async (req: AuthReq, res) => {
  const { daily } = req.body;
  const { username } = req.userData as User;
  const user = users.setDailyIntake(username, daily);
  if (user) {
    const token = createToken(user);
    res.json({ ok: true, message: "Changed daily intake", token });
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
    const user = newUser(username, hashedPass, name, daily);
    users.addUser(user);
    res.json({ ok: true, message: "Registered successfully", user });
  } catch (error) {
    res.json({ ok: false, message: error.message });
  }
});

interface NotifReq {
  expoPushToken: ExpoPushToken;
}

router.post("/notif", checkAuth, (req: AuthReq, res) => {
  const { expoPushToken } = req.body as NotifReq;
  const { username } = req.userData as User;
  const user = users.setPushToken(username, expoPushToken);
  if (user) {
    res.json({ ok: true, message: "Set push token successful", user });
  } else {
    res.json({ ok: false, message: "User not found", user });
  }
});

router.delete("/token", checkAuth, (req: AuthReq, res) => {
  const { username } = req.userData as User;
  const user = users.deletePushToken(username);
  if (user) {
    res.json({ ok: true, message: "Delete push token successful", user });
  } else {
    res.json({ ok: false, message: "User not found", user });
  }
});

// for polling
router.get("/", checkAuth, (req: AuthReq, res) => {
  res.json({ user: users.getUser(req.userData?.username || "") });
});

router.get("/", (_, res) => {
  res.json({ users: users.users });
});

export default router;
