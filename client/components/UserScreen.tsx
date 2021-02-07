import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { getData, storeData } from "../storage";
import { setDailyIntake } from "../api";

interface UserScreenProps {
  navigation: StackNavigationHelpers;
}

interface User {
  username: string;
  daily: number;
}

export default function UserScreen({ navigation }: UserScreenProps) {
  const [newIntake, setNewIntake] = useState("");
  const [username, setUsername] = useState("");
  const [intake, setIntake] = useState("");

  async function logout() {
    await storeData("user", null);
    navigation.navigate("SignIn");
  }

  async function updateIntake() {
    const data = await setDailyIntake(username, Number(newIntake));
    if (!data.ok) {
      console.log(data.messsage);
    } else {
      storeData("user", data.user);
      navigation.navigate("Reminder");
    }
  }
  useEffect(() => {
    (async () => {
      const user = (await getData("user")) as User;
      if (!user) return navigation.navigate("SignIn");

      setUsername(user.username);
      setIntake(user.daily.toFixed(1));
    })();
  }, [setIntake, setUsername]);

  return (
    <View>
      <Text style={{ padding: 50 }}>This is the user screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={{ padding: 50 }}>go back</Text>
      </TouchableOpacity>
      <Text style={{ padding: 50 }}>
        Set new daily goal. Current daily goal is {intake}
      </Text>

      <TextInput
        placeholder={intake}
        onChangeText={(text) => setNewIntake(text)}
        value={String(newIntake)}
        keyboardType="decimal-pad"
      />
      <TouchableOpacity
        onPress={() => updateIntake()}
        //style={{ ...Styles.buttonShape, ...styles.submitButton }}
      >
        <Text /*style={{ ...Styles.body, ...styles.submitText }}*/>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logout}>
        <Text style={{ padding: 50 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
