import mongoose, { Document, Model, Schema } from "mongoose";

class EDate extends Date {
  get month() {
    return this.getMonth() + 1;
  }
  get day() {
    return this.getDate();
  }
  get year() {
    return this.getFullYear();
  }
}

export type LogType = "water" | "friend";

export interface ILogDocument extends Document {
  userId: string;
  logType: LogType;
  water?: {
    volume: number;
  };
  friend?: {
    id: string;
  };
  dateCreated: Date;
}

export interface ILogModel extends Model<ILogDocument> {
  getMonthLog(userId: string, month: number, year: number): Promise<ILogDocument[]>;
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
      required: false,
      volume: {
        type: Number,
        required: true,
      },
    },
    friend: {
      required: false,
      id: {
        type: String,
        required: true,
      },
    },
    dateCreated: {
      type: Date,
      required: true,
      default: new Date(),
    },
  },
  { timestamps: true }
);

LogSchema.statics.getMonthLog = async function (
  userId: string,
  thisMonth: number,
  thisYear: number
) {
  return (await this.where({ userId }).exec())
    .filter((log) => {
      const { month, year } = new EDate(log.dateCreated);
      return month === thisMonth && year === thisYear;
    })
    .filter((log) => log.logType === "water");
};

const Log = mongoose.model<ILogDocument, ILogModel>("Log", LogSchema);

export default Log;
