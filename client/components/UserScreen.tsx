import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { getData, storeData } from "../storage";
import { setDailyIntake, uploadPushToken, deletePushToken } from "../api";
import { HomeIcon, FriendsIcon } from "../assets";

import { LinearGradient } from "expo-linear-gradient";

import Styles from "../styles/styles";
import Colours from "../styles/colours";
import { ScrollView } from "react-native-gesture-handler";
import { registerForPushNotificationsAsync } from "../notifications";

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
  const [register, setRegister] = useState("Register for Push Notifications");

  async function getNotifications() {
    const token = await registerForPushNotificationsAsync();
    if (!token) {
      console.log("YOU NEED NOTIFICATIONS FOR THIS");
      setRegister("Failed!");
      return token;
    } else {
      await uploadPushToken(username, token);
      setRegister("Success!");
      deletePushToken(username);
      return token;
    }
  }

  async function logout() {
    await storeData("user", null);
    navigation.navigate("SignIn");
  }

  async function updateIntake() {
    if (
      newIntake === "" ||
      isNaN(parseFloat(newIntake)) ||
      Number(newIntake) <= 0
    )
      return;
    const data = await setDailyIntake(username, parseFloat(newIntake));
    setIntake(newIntake);
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
  }, [setUsername, setIntake]);

  return (
    <SafeAreaView style={Styles.screen}>
      <LinearGradient
        style={Styles.background}
        colors={[Colours.darkBlue, Colours.medBlue]}
      />
      <Text style={{ ...Styles.title, ...styles.title }}>
        Profile: {username}
      </Text>
      <ScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.profileBox}
      >
        <View style={styles.profileBox}>
          <Text style={{ ...Styles.body, ...styles.smallText }}>
            Edit your daily goal. Your current daily goal is {intake} L
          </Text>
          <TextInput
            style={{ ...Styles.inputField, ...styles.goalInput }}
            placeholderTextColor={Colours.yellow}
            placeholder={intake}
            onChangeText={(text) => setNewIntake(text)}
            value={String(newIntake)}
            keyboardType="decimal-pad"
          />
          <TouchableOpacity
            onPress={() => updateIntake()}
            style={{ ...Styles.buttonShape, ...styles.submitButton }}
          >
            <Text style={{ ...Styles.body, ...styles.submitText }}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...Styles.buttonShape, ...styles.logoutButton }}
            onPress={getNotifications}
          >
            <Text style={{ ...Styles.body, ...styles.logoutText }}>
              {getNotifications()
                ? "Disable Push Notifications"
                : "Enable Push Notifications"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...Styles.buttonShape, ...styles.logoutButton }}
            onPress={logout}
          >
            <Text style={{ ...Styles.body, ...styles.logoutText }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={Styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <HomeIcon />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileBox: {
    flex: 1,
    margin: 20,
    padding: 20,
    justifyContent: "center",
    // borderWidth: 1,
    // borderColor: "black",
  },
  friendsList: {
    flex: 1,
    width: 250,
    alignSelf: "center",
    marginBottom: 30,
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "black",
  },
  goalInput: {
    borderColor: Colours.yellow,
    color: Colours.yellow,
  },
  submitButton: {
    borderColor: Colours.yellow,
    borderWidth: 1,
    marginVertical: 30,
  },
  submitText: {
    textAlign: "center",
    color: Colours.yellow,
  },
  logoutButton: {
    backgroundColor: Colours.yellow,
    marginVertical: 30,
  },
  logoutText: {
    textAlign: "center",
    color: Colours.darkBlue,
  },
  title: {
    textAlign: "center",
    marginTop: 30,
    color: Colours.yellow,
  },
  smallText: {
    textAlign: "center",
    fontSize: 20,
    color: Colours.yellow,
  },
});
