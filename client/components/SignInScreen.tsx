import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

import Colours from "../styles/colours";
import Styles from "../styles/styles";

interface SignInScreen {
  navigation: StackNavigationHelpers;
}

export default function SignInScreen({ navigation }: SignInScreen) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={Styles.screen}>
      <LinearGradient
        style={Styles.background}
        colors={[Colours.darkBlue, Colours.medBlue]}
      />
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
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Welcome")}
        style={{ ...Styles.buttonShape, ...styles.loginButton }}
      >
        <Text style={{ ...Styles.body, ...styles.loginText }}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={{ ...Styles.body, ...styles.signupText }}>
          Don't have an account? Sign up!
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  signin: {
    color: Colours.yellow,
    textAlign: "center",
    marginVertical: 30,
  },
  inputField: {
    borderColor: Colours.yellow,
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
