import mongoose, { Schema, Document, Model } from "mongoose";
import { hash } from "bcrypt";
import { compare } from "bcrypt";
import { UserType } from "../../util/types";
import { User, UserRepo } from "../user";

interface IUserDocument extends Document, User {}
interface IUserModel extends Model<IUserDocument>, UserRepo<string> {}

const UserSchema = new Schema<IUserDocument, IUserModel>(
  {
    username: {
      type: String,
      validate: {
        validator: (username: string) => UserModel.doesNotExist({ username }),
        message: "Username already exists",
      },
    },
    email: {
      type: String,
      validate: {
        validator: (email: string) => UserModel.doesNotExist({ email }),
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

// UserModel Statics

UserSchema.statics.newUser = async function (
  username: string,
  email: string,
  name: string,
  password: string,
  daily: string
) {
  const newUser = new this({ username, email, password, name, daily });
  await newUser.save();
  return newUser;
};

UserSchema.statics.doesNotExist = async function (field): Promise<boolean> {
  return (await this.where(field).countDocuments()) === 0;
};

UserSchema.statics.getUser = async function (userId: string) {
  const user = await this.findById(userId).exec();
  if (!user) throw new Error("User not found");
  return user;
};
UserSchema.statics.addPushToken = function (userId: string, pushToken: string) {
  return this.findByIdAndUpdate(userId, {
    notify: true,
    $push: {
      pushTokens: pushToken,
    },
  }).exec();
};

UserSchema.statics.removePushToken = function (userId: string, pushToken: string) {
  return this.findByIdAndUpdate(userId, {
    $pull: {
      pushTokens: pushToken,
    },
  }).exec();
};

UserSchema.statics.disableNotifications = function (userId: string) {
  return this.findByIdAndUpdate(userId, { notify: false }).exec();
};

UserSchema.statics.findByUsername = async function (username: string) {
  const user = await this.findOne({ username }).exec();
  if (!user) throw new Error("User not found");
  return user;
};

UserSchema.statics.updateCurrentIntake = function (userId: string, currentIntake: number) {
  return this.findByIdAndUpdate(userId, { currentIntake }).exec();
};

UserSchema.statics.updateDailyIntake = function (userId: string, daily: number) {
  return this.findByIdAndUpdate(userId, { daily }).exec();
};

UserSchema.statics.updateReminders = function (
  userId: string,
  wakeTime: number,
  sleepTime: number
) {
  return this.findByIdAndUpdate(userId, { reminders: { wakeTime, sleepTime } }).exec();
};

// UserModel Methods

UserSchema.methods.id = function () {
  return this._id;
};

// returns true if user met their daily intake
UserSchema.methods.addWater = async function (intake: number) {
  // this is in mL
  const newIntake = this.currentIntake + intake;
  await this.update({ currentIntake: newIntake }).exec();
  return newIntake >= this.daily;
};

UserSchema.methods.getPendingRequests = function () {
  return UserModel.find({ _id: { $nin: this.friendIds }, friendIds: this._id }).exec();
};

// TODO: filter non-friend as well
UserSchema.methods.getNonFriends = function () {
  return UserModel.find({ _id: { $nin: this.friendIds } }).exec();
};

UserSchema.methods.getFriends = function () {
  return UserModel.find({
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

UserSchema.methods.addFriendById = function (friendId: string) {
  return this.update({ $push: { friendIds: friendId } }).exec();
};

const UserModel = mongoose.model<IUserDocument, IUserModel>("User", UserSchema);

export default UserModel;
