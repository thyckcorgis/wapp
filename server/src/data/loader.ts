import { connect } from "mongoose";
import { MONGO_URI } from "../config";

import { UserJSON } from "./json/user";
import { LogJSON } from "./json/log";

import { UserRepo, LogRepo } from ".";

const userJSONFilePath = "../users.json";
const logJSONFilePath = "../logs.json";

export default async function loadDataLayer(
  type: "model" | "json"
): Promise<{ userRepo: UserRepo; logRepo: LogRepo }> {
  const useModel = type === "model";
  if (useModel) {
    await connect(MONGO_URI as string);
    const UserModel = require("./models/user").default;
    const LogModel = require("./models/log").default;
    return { userRepo: UserModel, logRepo: LogModel };
  }

  const userRepo = new UserJSON(userJSONFilePath);
  const logRepo = new LogJSON(logJSONFilePath);

  try {
    await userRepo.load();
  } catch (err) {
    // create new file
    try {
      userRepo.users = {};
      await userRepo.save();
    } catch (err) {
      console.log(err);
    }
  }

  try {
    await logRepo.load();
  } catch (err) {
    // create new file
    try {
      logRepo.logs = {};
      await logRepo.save();
    } catch (err) {
      console.log(err);
    }
  }

  return { userRepo, logRepo };
}
