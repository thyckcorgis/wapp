import { Router } from "express";

import friendRouter from "./friends";
import logRouter from "./logs";
import userRouter from "./users";
import sessionRouter from "./session";
import notificationRouter from "./notification";

const router = Router();

router.use("/notification", notificationRouter);
router.use("/session", sessionRouter);
router.use("/user", userRouter);
router.use("/log", logRouter);
router.use("/friend", friendRouter);

router.get("/", (_, res) => {
  res.send("Hello pee");
});

export default router;
