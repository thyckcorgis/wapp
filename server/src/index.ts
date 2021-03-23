import "reflect-metadata";

import express from "express";
import { logUrlAndMethod } from "./middlewares";

import router from "./routes";
import { loadDependencies } from "./loaders";

const app = express();
const port = 5003;

export const startServer = async () => {
  await loadDependencies();
  app.disable("x-powered-by");
  app.use(express.json());
  app.use(logUrlAndMethod);
  app.use("/wapee", router);
  app.listen(port, () => console.log(`Listening on port ${port}`));
};

startServer();
