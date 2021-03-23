import { Service, Inject } from "typedi";

import { LogRepo, User, UserRepo } from "../data";
import { addFriend, validate } from "../util/validations";
import { UserType } from "../util/types";
import { sendNotifications } from "../util/notifications";

const userInfo = ({ username, name }: User) => ({ username, name });
const completion = (b: User, a: User) => a.currentIntake / a.daily - b.currentIntake / b.daily;
const percentage = (user: User) => ({
  username: user.username,
  name: user.name,
  currentIntake: user.currentIntake,
  daily: user.daily,
});

@Service()
export default class FriendsService {
  constructor(
    @Inject("userRepo") private userRepo: UserRepo,
    @Inject("logRepo") private logRepo: LogRepo
  ) {}
  async getFriend(friend: string) {
    await validate(addFriend, { friend });
    try {
      return this.userRepo.findByUsername(friend);
    } catch {
      throw new Error("Friend not found");
    }
  }

  async makeConnection(user: User, friend: User, send = true) {
    await user.addFriendById(friend.getId());
    if (friend.notify && friend.pushTokens.length)
      this.friendRequestNotification(user.username, friend.pushTokens, send);
    await this.logRepo.newFriendLog(user.getId(), friend.getId());
  }

  async friendRequestNotification(username: string, token: string | string[], send = true) {
    const message = send
      ? `${username} wants to add you as a friend`
      : `${username} has accepted your friend request`;

    await sendNotifications(message, token);
  }

  async getUsers(userId: string, type: UserType) {
    const user = await this.userRepo.getUser(userId);
    return (await user.getUsers(type)).map(userInfo);
  }

  async getLitreboards(userId: string) {
    const user = await this.userRepo.getUser(userId);
    const allFriends = await user.getFriends();
    allFriends.push(user);
    return allFriends.sort(completion).map(percentage);
  }

  async acceptRequest(userId: string, friendName: string) {
    const friend = await this.getFriend(friendName);
    const user = (await friend.getFriends()).find((user) => user.getId() === userId);
    if (!user) throw new Error("You are not in this user's friend list");
    this.makeConnection(user, friend, false);
  }
  // Delete a friend
  // Cancel friend request

  async sendRequest(userId: string, friendName: string) {
    const friend = await this.getFriend(friendName);
    const user = await this.userRepo.getUser(userId);
    const existingFriend = (await user.getFriends()).find(
      (user) => user.getId() === friend.getId()
    );
    if (existingFriend) throw new Error("Request already sent");
    this.makeConnection(user, friend);
  }
}
