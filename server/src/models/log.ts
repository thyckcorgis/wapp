import mongoose, { Document, Model, Schema } from "mongoose";
import { LogType, EDate } from "../util/types";

export interface ILogDocument extends Document {
  userId: string;
  logType: LogType;
  water?: number;
  friendId?: string;
  dateCreated: number;
}

export interface ILogModel extends Model<ILogDocument> {
  getMonthLog(userId: string, year: number, month: number): Promise<ILogDocument[]>;
}

const LogSchema = new Schema<ILogDocument, ILogModel>(
  {
    userId: {
      type: String,
      required: true,
    },
    logType: {
      enum: ["water", "friend"],
      default: "water",
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

const Log = mongoose.model<ILogDocument, ILogModel>("Log", LogSchema);

export default Log;
