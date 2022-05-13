import { config } from "dotenv";
import express from "express";
import "reflect-metadata";
import { loadDependencies } from "./loaders";

config();

export const startServer = async () => {
  const app = express();
  const port = 5003;
  await loadDependencies(app);
  app.listen(port, () => console.log(`Listening on port ${port}`));
};

startServer();
