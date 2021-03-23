import "reflect-metadata";

import express from "express";

import { loadDependencies } from "./loaders";

export const startServer = async () => {
  const app = express();
  const port = 5003;
  await loadDependencies(app);
  app.listen(port, () => console.log(`Listening on port ${port}`));
};

startServer();
