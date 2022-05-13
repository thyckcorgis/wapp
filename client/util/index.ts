import { User } from "../components/UserArray";
import { getData, makeCallNoBody, makeCallWithBody } from "./apiUtil";

// User Routes

export const loginUser = (username: string, password: string) =>
  getData(() => makeCallWithBody("user/login", { username, password }));

export const registerUser = (
  username: string,
  password: string,
  name: string,
  daily: number,
  email: string
) => getData(() => makeCallWithBody("user", { username, password, name, daily, email }));

export const getUserData = (token: string) => getData(() => makeCallNoBody("user", token));

export async function setDailyIntake(username: string, daily: number) {
  return await getData(() => makeCallWithBody("user/daily", { username, daily }, "POST"));
}

export async function getLitreBoard(username: string) {
  return (await getData(() => makeCallNoBody("friend/litreboard/" + username))).users;
}

// Friend Routes

export const getFriends = (token: string) => getData(() => makeCallNoBody("friend", token));

export const getNonFriends = (token: string) =>
  getData(() => makeCallNoBody("friend/to-add", token));

export const getPendingRequests = (token: string) =>
  getData(() => makeCallNoBody("friend/pending", token));

export const sendFriendRequest = (token: string, friend: string) =>
  getData(() => makeCallWithBody("friend/request", { friend }, "POST", token));

export const acceptFriendRequest = (token: string, friend: string) =>
  getData(() => makeCallWithBody("friend/request", { friend }, "POST", token));

// Notification Routes

export const uploadPushToken = (token: string, expoPushToken: string) =>
  getData(() => makeCallWithBody("notification", { expoPushToken }, "PATCH", token));

export const deletePushToken = (token: string, expoPushToken: string) =>
  getData(() => makeCallNoBody("notification/" + expoPushToken, token, "DELETE"));

export const disablePushNotifs = (token: string) =>
  getData(() => makeCallNoBody("notification", token, "DELETE"));

export async function poll(username: string): Promise<User> {
  return (await getData(() => makeCallNoBody("user/" + username))).user;
}

// Log Routes

export async function logWaterIntake(token: string, water: number) {
  const { data, ok } = await makeCallWithBody("log", { water }, "POST", token);
  if (!ok) throw new Error(data.message);
  return data;
}
