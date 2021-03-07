import mongoose, { Document, Model, Schema } from "mongoose";
import { compare, hash } from "bcrypt";

export interface IUserDocument extends Document {
  username: string;
  password: string;
  name: string;
  daily: number;
  currentIntake: number;
  friendIds: string[];
  notify: boolean;
  pushTokens: string[];
  reminders?: {
    wakeTime: number;
    sleepTime: number;
  };

  comparePasswords(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {
  doesNotExist(user: object): Promise<boolean>;
}

const UserSchema = new Schema<IUserDocument, IUserModel>(
  {
    username: {
      type: String,
      validate: {
        validator: (username: string) => User.doesNotExist({ username }),
        message: "Username already exists",
      },
    },
    email: {
      type: String,
      validate: {
        validator: (email: string) => User.doesNotExist({ email }),
        message: "Email already exists",
      },
    },
    friendIds: {
      type: { type: String },
      value: [String],
    },
    notify: {
      type: Boolean,
      default: false,
    },
    pushToken: {
      type: { type: String },
      value: [String],
      default: [],
    },
    password: {
      type: String,
      required: true,
    },
    reminders: {
      wakeTime: {
        type: Number,
      },
      sleepTime: {
        type: Number,
      },
    },
  },
  { timestamps: true }
);

UserSchema.pre<IUserDocument>("save", async function () {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }
});

UserSchema.statics.doesNotExist = async function (field): Promise<boolean> {
  return (await this.where(field).countDocuments()) === 0;
};

UserSchema.methods.comparePasswords = function (password: string) {
  return compare(password, this.password);
};

const User = mongoose.model<IUserDocument, IUserModel>("User", UserSchema);

export default User;
