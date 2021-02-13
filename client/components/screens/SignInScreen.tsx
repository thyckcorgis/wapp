import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { LinearGradient } from "expo-linear-gradient";

import { Colours, Styles } from "../../styles";
import { CorgiLogo } from "../../assets";

import { storeData } from "../../storage";
import { loginUser } from "../../api";
import { SolidButton } from "../buttons";

interface SignInScreen {
  navigation: StackNavigationHelpers;
}

export default function SignInScreen({ navigation }: SignInScreen) {
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
    <KeyboardAvoidingView behavior="padding" style={Styles.screen}>
      <LinearGradient
        style={Styles.background}
        colors={[Colours.darkBlue, Colours.medBlue]}
      />
      <View style={Styles.screen}>
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
      </View>
      <View style={styles.corgiBox}>
        <CorgiLogo />
      </View>
    </KeyboardAvoidingView>
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
    // marginVertical: 10,
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
