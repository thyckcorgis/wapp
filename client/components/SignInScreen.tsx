import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { useState } from "react";
import fetch from "axios";
import { API_URL } from "../constants";

interface SignInScreen {
  navigation: StackNavigationHelpers;
}

export default function SignInScreen({ navigation }: SignInScreen) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  async function login() {
    const userData = {
      username,
      password,
    };
    const { data } = await fetch({
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `${API_URL}/user/login`,
      data: userData,
      method: "POST",
    });
    if(!data.ok) {
         setError(data.message);
    } else {
        nextScreen();
    }
    console.log(data);
    return JSON.stringify(data);
  }

  function nextScreen() {
    navigation.navigate("Welcome")
  }

  return (
    <View>
      <Text style={{ padding: 50 }}>This is the sign in screen</Text>
      <TouchableOpacity onPress={() => login()}>
        <Text style={{ padding: 50 }}>Log In</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Text>{error}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
        <Text style={{ padding: 50 }}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={{ padding: 50 }}>Don't have an account? Sign UP!</Text>
      </TouchableOpacity>
    </View>
  );
}
