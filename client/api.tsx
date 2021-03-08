export async function uploadPushToken(token: string, expoPushToken: string) {
  const { data, ok } = await makeCallWithBody("notification", { expoPushToken }, "PATCH", token);
  if (!ok) throw new Error(data.message);
  return data;
}

export async function deletePushToken(token: string, expoPushToken: string) {
  const { data, ok } = await makeCallNoBody("notification/" + expoPushToken, token, "DELETE");
  if (!ok) throw new Error(data.message);
  return data;
}

export async function disablePushNotifs(token: string) {
  const { data, ok } = await makeCallNoBody("notification", token, "DELETE");
  if (!ok) throw new Error(data.message);
  return data;
}

export async function logWaterIntake(token: string, water: number) {
  const { data, ok } = await makeCallWithBody("log", { water }, "POST", token);
  if (!ok) throw new Error(data.message);
  return data;
}

export async function setDailyIntake(username: string, daily: number) {
  try {
    const userData = { username, daily };
    return (await post("/user/daily", userData)).data;
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
