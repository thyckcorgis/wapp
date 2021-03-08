import mongoose, { Document, Model, Schema } from "mongoose";
import { compare, hash } from "bcrypt";
import { UserType } from "../util/types";

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

  addWater(intake: number): Promise<boolean>;
  getFriends(): Promise<IUserDocument[]>;
  getNonFriends(): Promise<IUserDocument[]>;
  getPendingRequests(): Promise<IUserDocument[]>;
  getUsers(type: UserType): Promise<IUserDocument[]>;
  comparePasswords(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {
  doesNotExist(user: object): Promise<boolean>;
  getUser(userId: string): Promise<IUserDocument>;
  findByUsername(username: string): Promise<IUserDocument>;
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
    pushTokens: {
      type: { type: String },
      value: [String],
      default: [],
    },
    password: {
      type: String,
      required: true,
    },
    reminders: {
      required: false,
      wakeTime: {
        type: Number,
        required: true,
      },
      sleepTime: {
        type: Number,
        required: true,
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

UserSchema.statics.getUser = async function (userId: string) {
  const user = await User.findById(userId).exec();
  if (!user) throw new Error("User not found");
  return user;
};

UserSchema.statics.findByUsername = async function (username: string) {
  const user = await User.findOne({ username }).exec();
  if (!user) throw new Error("User not found");
  return user;
};

// returns true if user met their daily intake
UserSchema.methods.addWater = async function (intake: number) {
  // this is in mL
  const newIntake = this.currentIntake + intake;
  await this.update({ currentIntake: newIntake }).exec();
  return newIntake >= this.daily;
};

UserSchema.methods.getPendingRequests = function () {
  return User.find({ _id: { $nin: this.friendIds }, friendIds: this._id }).exec();
};

UserSchema.methods.getNonFriends = function () {
  return User.find({ _id: { $nin: this.friendIds } }).exec();
};

UserSchema.methods.getFriends = function () {
  return User.find({
    _id: { $in: this.friendIds },
    friendIds: this._id,
  }).exec();
};

UserSchema.methods.comparePasswords = function (password: string) {
  return compare(password, this.password);
};

UserSchema.methods.getUsers = function (type: UserType) {
  const choices = {
    friends: this.getFriends(),
    nonFriends: this.getNonFriends(),
    pending: this.getPendingRequests(),
  };
  return choices[type];
};

const User = mongoose.model<IUserDocument, IUserModel>("User", UserSchema);

export default User;
