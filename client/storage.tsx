import { AsyncStorage } from "react-native";

export async function storeData(key: string, value: object | null) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getData(key: string): Promise<object | undefined> {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
