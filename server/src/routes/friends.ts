import { Router } from "express";
import users from "../userdb";

const router = Router();

router.get("/", (_, res) => {
  res.json({ users: users.getAllUsers() });
});

export default router;
