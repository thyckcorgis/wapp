import { Router } from "express";
import friendRouter from "./friends";
import logRouter from "./logs";
import notificationRouter from "./notification";
import userRouter from "./users";

const router = Router();

router.use("/notification", notificationRouter);
router.use("/user", userRouter);
router.use("/log", logRouter);
router.use("/friend", friendRouter);

router.get("/", (_, res) => {
  res.send("Hello pee");
});

export default router;
