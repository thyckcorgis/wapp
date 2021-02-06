import Express from "express";

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = Express();
const port = 5003;

const router = Express.Router();

router.get("/", (req, res) => {
  res.send("Hello pee");
});

app.use("/wapi", router);

app.listen(port, () => console.log(`Listening on port ${port}`));
