import { Inject, Service } from "typedi";
import { UserRepo } from "../data";
import { AuthHelper } from "../util/auth";
import { sessionizeUser } from "../util/helpers";
import {
  login as loginBody,
  register as registerBody,
  setIntake,
  setReminders,
  validate,
} from "../util/validations";

@Service()
export default class UserService {
  constructor(
    @Inject("userRepo") private userRepo: UserRepo,
    @Inject("auth") private authService: AuthHelper
  ) {}
  async dailyReminders(userId: string, wakeTime: number, sleepTime: number) {
    validate(setReminders, { wakeTime, sleepTime });
    await this.userRepo.updateReminders(userId, wakeTime, sleepTime);
  }

  async dailyIntake(userId: string, daily: number) {
    validate(setIntake, { daily });
    await this.userRepo.updateDailyIntake(userId, daily);
  }

  async register(username: string, email: string, password: string, name: string, daily: number) {
    validate(registerBody, { username, email, password, name, daily });
    const newUser = await this.userRepo.newUser(username, email, password, name, daily);
    return {
      token: this.authService.createToken(sessionizeUser(newUser)),
      data: { user: newUser },
    };
  }

  async login(username: string, password: string) {
    validate(loginBody, { username, password });
    const user = await this.userRepo.findByUsername(username);
    if (!user.comparePasswords(password)) throw new Error("Invalid login credentials");
    return this.authService.createToken(sessionizeUser(user));
  }
}
