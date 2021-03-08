async function makeCall<Res>(cb: () => Promise<Response>) {
  const response = await cb();
  const data: Res = await response.json();
  return { data, ok: response.ok };
}

const auth = (token: string) => (token !== "" ? `Bearer ${token}` : "");

export function makeCallNoBody<Res = any>(url: string, token = "", method = "GET") {
  return makeCall<Res>(() =>
    fetch(url, {
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
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: auth(token),
      },
      body: JSON.stringify(data),
    })
  );
}
