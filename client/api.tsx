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
  try {
    const userData = { username, password, name, daily };
    const { data } = await post("/user/register", userData);
    return data;
  } catch (err) {
    throw err;
  }
}

export async function uploadPushToken(username: string, expoPushToken: string) {
  try {
    return (await post("/user/notif", { username, expoPushToken })).data.user;
  } catch (err) {
    throw err;
  }
}

export async function deletePushToken(username: string) {
  try {
    return (await post("/user/delete-token", { username })).data.user;
  } catch (err) {
    throw err;
  }
}

export async function logWaterIntake(username: string, water: number) {
  try {
    const userData = { username, water };
    return (await post("/log", userData)).data;
  } catch (err) {
    throw err;
  }
}
export async function setDailyIntake(username: string, daily: number) {
  try {
    const userData = { username, daily };
    return (await post("/user/daily", userData)).data;
  } catch (err) {
    throw err;
  }
}

export async function loginUser(username: string, password: string) {
  try {
    return (await post("/user/login", { username, password })).data;
  } catch (err) {
    throw err;
  }
}

export async function getPendingRequests(username: string) {
  try {
    return (await fetch(`${API_URL}/friend/pending/${username}`)).data.pending;
  } catch (err) {
    throw err;
  }
}

export async function sendFriendRequest(username: string, friend: string) {
  try {
    return (await post("/friend/request", { username, friend })).data;
  } catch (err) {
    throw err;
  }
}

export async function acceptFriendRequest(username: string, friend: string) {
  try {
    return (await post("/friend/accept", { username, friend })).data;
  } catch (err) {
    throw err;
  }
}

export async function getNonFriends(username: string) {
  try {
    return (await fetch(`${API_URL}/friend/to-add/${username}`)).data.users;
  } catch (err) {
    throw err;
  }
}

export async function getFriends(username: string) {
  try {
    return (await fetch(`${API_URL}/friend/${username}`)).data.users;
  } catch (err) {
    throw err;
  }
}

export async function resetCurrentIntake(username: string) {
  try {
    return (await fetch(`${API_URL}/log/reset/${username}`)).data.users;
  } catch (err) {
    throw err;
  }
}

export async function getLitreBoard(username: string) {
  try {
    return (await fetch(`${API_URL}/friend/litreboard/${username}`)).data.users;
  } catch (err) {
    throw err;
  }
}

export async function poll(username: string) {
  try {
    return (await fetch(`${API_URL}/user/${username}`)).data.user;
  } catch (err) {
    throw err;
  }
}
