import Express from "express";

import { userRouter, logRouter, friendRouter } from "./routes";

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = Express();
const port = 5003;

const router = Express.Router();

app.use(Express.json());

app.use((req, _, next) => {
  const { url, method } = req;
  console.log({ url, method });
  next();
});
router.use("/user", userRouter);
router.use("/log", logRouter);
router.use("/friend", friendRouter);

router.get("/", (_, res) => {
  res.send("Hello pee");
});

app.use("/wapee", router);

app.listen(port, () => console.log(`Listening on port ${port}`));
