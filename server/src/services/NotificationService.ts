import { Expo } from "expo-server-sdk";
import { UserRepo } from "../data";

import UserModel from "../data/models/user";

export class NotificationService {
  userRepo: UserRepo;
  constructor(userRepo: UserRepo) {
    this.userRepo = userRepo;
  }
  // Route Operations
  async disableAll(userId: string) {
    return this.userRepo.disableNotifications(userId);
  }

  async disable(userId: string, expoPushToken: string) {
    if (!Expo.isExpoPushToken(expoPushToken)) throw new Error("Invalid push token");
    await this.userRepo.removePushToken(userId, expoPushToken);
  }

  async enable(userId: string, expoPushToken: string) {
    if (!Expo.isExpoPushToken(expoPushToken)) throw new Error("Invalid push token");
    await this.userRepo.addPushToken(userId, expoPushToken);
  }
}

export default new NotificationService(UserModel);
