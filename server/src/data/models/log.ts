import mongoose, { Document, Model, Schema } from "mongoose";
import { EDate } from "../../util/types";
import { Log, LogRepo } from "../log";

export interface ILogDocument extends Document, Log {}

export interface ILogModel extends Model<ILogDocument>, LogRepo {}

const LogSchema = new Schema<ILogDocument, ILogModel>(
  {
    userId: {
      type: String,
      required: true,
    },
    logType: {
      type: String,
      enum: ["water", "friend"],
    },
    water: {
      type: Number,
      required: false,
    },
    friendId: {
      type: String,
      required: false,
    },
    dateCreated: {
      type: Number,
      required: true,
      default: new EDate().getUTCSeconds,
    },
  },
  { timestamps: true }
);

LogSchema.statics.getMonthLog = function (userId: string, year: number, month: number) {
  const firstDay = new EDate(year, month, 1).serial;
  const lastDay = new EDate(year, month + 1, 0).serial;
  return this.where({
    userId,
    dateCreated: {
      $gte: firstDay,
      $lt: lastDay,
    },
    logType: "water",
  }).exec();
};

LogSchema.statics.newFriendLog = async function (userId: string, friendId: string) {
  const newLog = new this({ userId, friendId, logType: "friend" });
  await newLog.save();
  return newLog;
};

LogSchema.statics.insertLogs = async function (logs: Log[]) {
  await this.insertMany(logs);
};

LogSchema.statics.newWaterLog = async function (userId: string, water: number) {
  const newLog = new this({ userId, water, logType: "water" });
  await newLog.save();
  return newLog;
};

const LogModel = mongoose.model<ILogDocument, ILogModel>("Log", LogSchema);

export default LogModel;
