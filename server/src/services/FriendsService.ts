import User, { IUserDocument } from "../models/user";
import Log from "../models/log";

import { addFriend, validate } from "../util/validations";
import { UserType } from "../util/types";
import { sendNotifications } from "../util/notifications";

const userInfo = ({ username, name }: IUserDocument) => ({ username, name });
const completion = (b: IUserDocument, a: IUserDocument) =>
  a.currentIntake / a.daily - b.currentIntake / b.daily;
const percentage = (user: IUserDocument) => ({
  username: user.username,
  name: user.name,
  currentIntake: user.currentIntake,
  daily: user.daily,
});

async function getFriend(friend: string) {
  await validate(addFriend, { friend });
  try {
    return User.findByUsername(friend);
  } catch {
    throw new Error("Friend not found");
  }
}

async function makeConnection(user: IUserDocument, friend: IUserDocument, send = true) {
  await user.update({ $push: { friendIds: friend._id } }).exec();
  if (friend.notify && friend.pushTokens.length)
    friendRequestNotification(user.username, friend.pushTokens, send);
  await new Log({ userId: user._id, friendId: friend._id, logType: "friend" }).save();
}

async function friendRequestNotification(username: string, token: string | string[], send = true) {
  const message = send
    ? `${username} wants to add you as a friend`
    : `${username} has accepted your friend request`;

  await sendNotifications(message, token);
}

export async function GetUsers(userId: string, type: UserType) {
  const user = await User.getUser(userId);
  return (await user.getUsers(type)).map(userInfo);
}

export async function GetLitreboards(userId: string) {
  const user = await User.getUser(userId);
  const allFriends = await user.getFriends();
  allFriends.push(user);
  return allFriends.sort(completion).map(percentage);
}

export async function AcceptRequest(userId: string, friendName: string) {
  const friend = await getFriend(friendName);
  const user = (await friend.getFriends()).find((user) => user._id === userId);
  if (!user) throw new Error("You are not in this user's friend list");
  makeConnection(user, friend, false);
}
// Delete a friend
// Cancel friend request

export async function SendRequest(userId: string, friendName: string) {
  const friend = await getFriend(friendName);
  const user = await User.getUser(userId);
  const existingFriend = (await user.getFriends()).find((user) => user._id === friend._id);
  if (existingFriend) throw new Error("Request already sent");
  makeConnection(user, friend);
}
