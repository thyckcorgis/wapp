import Express from "express";
import mongoose from "mongoose";
import { logUrlAndMethod } from "./middlewares";

import router from "./routes";
import { MONGO_URI } from "./config";

const app = Express();
const port = 5003;

export const startServer = async (dbUri = MONGO_URI) => {
  await mongoose.connect(dbUri);
  app.disable("x-powered-by");
  app.use(Express.json());
  app.use(logUrlAndMethod);
  app.use("/wapee", router);
  app.listen(port, () => console.log(`Listening on port ${port}`));
};

startServer();
