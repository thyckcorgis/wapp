import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import SafeGradient from "../SafeGradient";

import { Colours, Styles } from "../../styles";
import { CorgiLogo } from "../../assets";

import { storeData } from "../../storage";
import { loginUser } from "../../util";
import { SolidButton } from "../buttons";
import ScreenProps from "./ScreenProps";

export default function SignInScreen({ navigation }: ScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function login() {
    if (username === "" || password === "") return;
    const data = await loginUser(username, password);
    if (!data.ok) {
      setError(data.message);
    } else {
      await storeData("user", data.user);
      navigation.navigate("Home", { refresh: true });
    }
  }

  return (
    <SafeGradient>
      <Text style={{ ...Styles.title, ...styles.signin }}>Sign In</Text>
      <TextInput
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
        placeholderTextColor={Colours.yellow}
        style={{ ...Styles.inputField, ...styles.inputField }}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholderTextColor={Colours.yellow}
        style={{ ...Styles.inputField, ...styles.inputField }}
        secureTextEntry
      />
      <Text style={Styles.error}>{error}</Text>
      <SolidButton onPress={() => login()} label="Login" />

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={{ ...Styles.body, ...styles.signupText }}>
          Don't have an account? Sign up!
        </Text>
      </TouchableOpacity>
    </SafeGradient>
  );
}

const styles = StyleSheet.create({
  signin: {
    color: "white",
    textAlign: "center",
    marginVertical: 30,
  },
  corgiBox: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  inputField: {
    borderColor: Colours.yellow,
    color: Colours.yellow,
  },
  loginButton: {
    backgroundColor: Colours.yellow,
  },
  loginText: {
    textAlign: "center",
    color: Colours.darkBlue,
  },
  signupText: {
    textAlign: "center",
    color: Colours.yellow,
    marginVertical: 20,
  },
});
