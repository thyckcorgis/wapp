import fetch from "axios";
import { API_URL } from "./constants";
export default async function setDailyIntake(username: string, daily: number) {
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
