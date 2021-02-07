import fetch from "axios";
import { ExpoPushToken } from "expo-notifications";
import { API_URL } from "./constants";

export async function registerUser(
  username: string,
  password: string,
  name: string,
  daily: number
) {
  const { data } = await fetch({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    url: `${API_URL}/user/register`,
    data: { username, password, name, daily },
    method: "POST",
  });
  return data;
}

export async function setDailyIntake(username: string, daily: number) {
  const userData = { username, daily };
  const { data } = await fetch({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    url: `${API_URL}/user/daily`,
    data: userData,
    method: "POST",
  });
  return data;
}

export async function loginUser(username: string, password: string) {
  const { data } = await fetch({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    url: `${API_URL}/user/login`,
    data: { username, password },
    method: "POST",
  });
  return data;
}

export async function getPendingRequests(username: string) {
  const { data } = await fetch({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    url: `${API_URL}/friend/pending`,
    data: { username },
    method: "POST",
  });
  return data.pending;
}

export async function sendFriendRequest(username: string, friend: string) {
  const { data } = await fetch({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    url: `${API_URL}/friend/request`,
    data: { username, friend },
    method: "POST",
  });
  return data;
}

export async function acceptFriendRequest(username: string, friend: string) {
  const { data } = await fetch({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    url: `${API_URL}/friend/accept`,
    data: { username, friend },
    method: "POST",
  });
  return data;
}

export async function getNonFriends(username: string) {
  const { data } = await fetch({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    url: `${API_URL}/friend`,
    data: { username },
    method: "POST",
  });
  return data.users;
}

export async function uploadPushToken(username: string, expoPushToken: string) {
  const { data } = await fetch({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    url: `${API_URL}/user/notif`,
    data: { username, expoPushToken },
    method: "POST",
  });
  return data.user;
}
