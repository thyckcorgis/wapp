import { API_URL } from "../constants";

async function makeCall<Res>(cb: () => Promise<Response>) {
  const response = await cb();
  const data: Res = await response.json();
  return { data, ok: response.ok };
}

const auth = (token: string) => (token !== "" ? `Bearer ${token}` : "");

export function makeCallNoBody<Res = any>(url: string, token = "", method = "GET") {
  return makeCall<Res>(() =>
    fetch(API_URL + url, {
      method,
      headers: {
        Authorization: auth(token),
      },
    })
  );
}

export function makeCallWithBody<Res = any, Req = any>(
  url: string,
  data: Req,
  method = "POST",
  token = ""
) {
  return makeCall<Res>(() =>
    fetch(API_URL + url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: auth(token),
      },
      body: JSON.stringify(data),
    })
  );
}

interface Data {
  message: string;
}

export async function getData<Res extends Data = any>(
  cb: () => Promise<{ data: Res; ok: boolean }>
) {
  const { data, ok } = await cb();
  if (!ok) throw new Error(data.message);
  return data;
}
