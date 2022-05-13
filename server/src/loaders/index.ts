import { Express, json } from "express";
import { Container } from "typedi";
import { EXPIRES_IN, JWT_KEY } from "../config";
import { LogRepo, UserRepo } from "../data";
import loadDataLayer from "../data/loader";
import { logUrlAndMethod } from "../middlewares";
import { AuthHelper } from "../util/auth";

export async function loadDependencies(app: Express) {
  Container.set<AuthHelper>("auth", new AuthHelper(JWT_KEY, EXPIRES_IN));
  const { userRepo, logRepo } = await loadDataLayer("json");
  Container.set<UserRepo>("userRepo", userRepo);
  Container.set<LogRepo>("logRepo", logRepo);

  app.disable("x-powered-by");
  app.use(json());
  app.use(logUrlAndMethod);
  app.use("/wapee", require("../routes").default);
}
