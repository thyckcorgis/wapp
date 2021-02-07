import { AsyncStorage } from "react-native";

export async function storeData(key: string, value: object | null) {
  try {
    const jsonValue = JSON.stringify(value);
    console.log(jsonValue);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
}

export async function getData(key: string): Promise<object | undefined> {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    console.log(jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
}
