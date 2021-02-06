import Express from "express";

import userRouter from "./routes/users";
import logRouter from "./routes/logs";

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = Express();
const port = 5003;

const router = Express.Router();

app.use(Express.json());

router.use("/user", userRouter);
router.use("/log", logRouter);

router.get("/", (req, res) => {
  res.send("Hello pee");
});

app.use("/wapi", router);

app.listen(port, () => console.log(`Listening on port ${port}`));
