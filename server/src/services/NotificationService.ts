import { Expo } from "expo-server-sdk";
import { Inject, Service } from "typedi";
import { UserRepo } from "../data";

@Service()
export default class NotificationService {
  constructor(@Inject("userRepo") private userRepo: UserRepo) {}
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
