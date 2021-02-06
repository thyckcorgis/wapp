import { Router } from "express";
import users from "../userdb";

const router = Router();

router.post("/request", (req, res) => {});

router.get("/", (_, res) => {
  res.json({ users: users.getAllUsers() });
});

export default router;
