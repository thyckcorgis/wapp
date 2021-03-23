import { Container } from "typedi";

import { EXPIRES_IN, JWT_KEY } from "../config";
import { AuthHelper } from "../util/auth";

import { LogRepo, UserRepo } from "../data";
import loadDataLayer from "../data/loader";

export async function loadDependencies() {
  Container.set<AuthHelper>("auth", new AuthHelper(JWT_KEY, EXPIRES_IN));
  const { userRepo, logRepo } = await loadDataLayer("json");
  Container.set<UserRepo>("userRepo", userRepo);
  Container.set<LogRepo>("logRepo", logRepo);
}
