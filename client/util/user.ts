import { makeCallNoBody, makeCallWithBody } from "./api";

// User Routes

export async function loginUser(username: string, password: string) {
  const { data, ok } = await makeCallWithBody("user/login", { username, password });
  if (!ok) throw new Error(data.message);
  return data;
}

export async function registerUser(
  username: string,
  password: string,
  name: string,
  daily: number
) {
  const { data, ok } = await makeCallWithBody("user", { username, password, name, daily });
  if (!ok) throw new Error(data.message);
  return data;
}

export async function getUserData(token: string) {
  const { data, ok } = await makeCallNoBody("user", token);
  if (!ok) throw new Error(data.message);
  return data;
}
