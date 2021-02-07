import fetch from "axios";
import { API_URL } from "./constants";

function post(path: string, data: any) {
  return fetch({
    url: API_URL + path,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    method: "POST",
    data,
  });
}
export async function registerUser(
  username: string,
  password: string,
  name: string,
  daily: number
) {
  const userData = { username, password, name, daily };
  const { data } = await post("/user/register", userData);
  return data;
}

export async function uploadPushToken(username: string, expoPushToken: string) {
  return (await post("/user/notif", { username, expoPushToken })).data.user;
}

export async function logWaterIntake(username: string, water: number) {
  const userData = { username, water };
  return (await post("/log", userData)).data;
}
export async function setDailyIntake(username: string, daily: number) {
  const userData = { username, daily };
  return (await post("/user/daily", userData)).data;
}

export async function loginUser(username: string, password: string) {
  return (await post("/user/login", { username, password })).data;
}

export async function getPendingRequests(username: string) {
  return (await post("/friend/pending", { username })).data.pending;
}

export async function sendFriendRequest(username: string, friend: string) {
  return (await post("/friend/request", { username, friend })).data;
}

export async function acceptFriendRequest(username: string, friend: string) {
  return (await post("/friend/accept", { username, friend })).data;
}

export async function getNonFriends(username: string) {
  return (await post("/friend/toadd", { username })).data.users;
}

export async function getFriends(username: string) {
  return (await post("/friend", { username })).data.users;
}
