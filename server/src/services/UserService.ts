import { Service, Inject } from "typedi";
import {
  validate,
  setReminders,
  setIntake,
  register as registerBody,
  login as loginBody,
} from "../util/validations";
import { sessionizeUser } from "../util/helpers";
import { UserRepo } from "../data";
import { AuthHelper } from "../util/auth";

@Service()
export default class UserService {
  constructor(
    @Inject("userRepo") private userRepo: UserRepo,
    @Inject("auth") private authService: AuthHelper
  ) {}
  async dailyReminders(userId: string, wakeTime: number, sleepTime: number) {
    await validate(setReminders, { wakeTime, sleepTime });
    await this.userRepo.updateReminders(userId, wakeTime, sleepTime);
  }

  async dailyIntake(userId: string, daily: number) {
    await validate(setIntake, { daily });
    await this.userRepo.updateDailyIntake(userId, daily);
  }

  async register(username: string, email: string, password: string, name: string, daily: number) {
    await validate(registerBody, { username, email, password, name, daily });
    const newUser = await this.userRepo.newUser(username, email, password, name, daily);
    return this.authService.createToken(sessionizeUser(newUser));
  }

  async login(username: string, password: string) {
    await validate(loginBody, { username, password });
    const user = await this.userRepo.findByUsername(username);
    if (!user.comparePasswords(password)) throw new Error("Invalid login credentials");
    return this.authService.createToken(sessionizeUser(user));
  }
}
