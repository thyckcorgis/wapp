import Express from "express";

import router from "./routes";

const app = Express();
const port = 5003;

app.use(Express.json());

app.use((req, _, next) => {
  const { url, method } = req;
  console.log({ url, method });
  next();
});

app.use("/wapee", router);

app.listen(port, () => console.log(`Listening on port ${port}`));
