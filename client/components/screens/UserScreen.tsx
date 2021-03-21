import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Switch, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { Colours, Styles } from "../../styles";
import { EditIcon } from "../../assets";

import { getData, storeData } from "../../storage";
import { setDailyIntake, uploadPushToken } from "../../api";
import { registerForPushNotificationsAsync } from "../../notifications";

import BottomNavbar from "../BottomNavbar";
import { Avatar } from "react-native-elements";
import SafeGradient from "../SafeGradient";
import { ClearButton, SolidButton } from "../buttons/";
import ScreenProps from "./ScreenProps";
import colours from "../../styles/colours";

interface User {
  username: string;
  daily: number;
}

export default function UserScreen({ navigation }: ScreenProps) {
  const [newIntake, setNewIntake] = useState("");
  const [username, setUsername] = useState("");
  const [intake, setIntake] = useState("");
  const [register, setRegister] = useState("Enable Push Notifications");
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  async function getNotifications() {
    toggleSwitch();
    const token = await registerForPushNotificationsAsync();
    if (!token) {
      console.log("YOU NEED NOTIFICATIONS FOR THIS");
      setRegister("Failed!");
      return token;
    } else {
      await uploadPushToken(username, token);
      setRegister("Success!");
      return token;
    }
  }

  async function logout() {
    await storeData("user", null);
    navigation.navigate("SignIn");
  }

  async function updateIntake() {
    if (newIntake === "" || isNaN(parseFloat(newIntake)) || Number(newIntake) <= 0) return;

    const data = await setDailyIntake(username, parseFloat(newIntake));
    console.log("here");

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
    <SafeGradient>
      <Text style={{ ...Styles.title, ...styles.title }}>Hello, {username}</Text>
      <Avatar
        size="large"
        rounded
        overlayContainerStyle={{
          backgroundColor: Colours.yellow,
        }}
        containerStyle={styles.profilePic}
        title={username.substring(0, 2)}
        titleStyle={{ ...Styles.title, ...styles.initialsText }}
        // onAccessoryPress={() => do something}
      >
        {/* Honestly not sure how to do the accessory part? */}
        {/* <Accessory /> */}
      </Avatar>
      <ScrollView keyboardDismissMode="on-drag">
        <View style={styles.userBox}>
          <View style={styles.editGoalBox}>
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
            <ClearButton onPress={() => updateIntake()} label="Submit" />
          </View>
          <View style={styles.notifyBox}>
            <Text
              style={{
                ...Styles.body,
                ...styles.smallText,
                ...{ fontSize: 15 },
              }}
            >
              Enable Push Notifications
            </Text>
            <Switch
              trackColor={{ false: Colours.darkBlue, true: Colours.lightBlue }}
              thumbColor={isEnabled ? Colours.yellow : Colours.medBlue}
              ios_backgroundColor={Colours.lightBlue}
              onValueChange={getNotifications}
              value={isEnabled}
            />
          </View>
          <View style={styles.achievementBox}>
            <Text style={[Styles.title, styles.smallText]}>Achievements</Text>
            <View style={styles.topAchievementsBox}>
              <View style={styles.aBox}>
                <View style={styles.iconBox}>
                  <Text>icon</Text>
                </View>
                <Text style={[Styles.body, styles.achievementName]}>PEEkaboo</Text>
              </View>
              <View style={styles.aBox}>
                <View style={styles.iconBox}>
                  <Text>icon</Text>
                </View>
                <Text style={[Styles.body, styles.achievementName]}>YiPEE!</Text>
              </View>
              <View style={styles.aBox}>
                <View style={styles.iconBox}>
                  <Text>icon</Text>
                </View>
                <Text style={[Styles.body, styles.achievementName]}>sPEEdy</Text>
              </View>
            </View>
            <View style={styles.moreInfoBox}>
              <Text style={[Styles.body, styles.moreText]}>69 out of 420</Text>
              <TouchableOpacity>
                <Text style={[Styles.body, styles.moreText]}>Show More</Text>
              </TouchableOpacity>
            </View>
          </View>
          <SolidButton onPress={logout} label="Logout" />
        </View>
      </ScrollView>
      <BottomNavbar navigation={navigation} />
    </SafeGradient>
  );
}

const styles = StyleSheet.create({
  // BOXES
  userBox: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
  },
  editGoalBox: {
    borderWidth: 1,
    borderColor: Colours.yellow,
    borderRadius: 20,
    padding: 10,
    width: 300,
    marginBottom: 10,
  },
  notifyBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 300,
    alignSelf: "center",
    alignItems: "center",
    padding: 10,
    // borderWidth: 1,
  },
  achievementBox: {
    borderWidth: 1,
    borderColor: Colours.yellow,
    borderRadius: 20,
    padding: 10,
    width: 300,
    marginBottom: 10,
    // backgroundColor: Colours.darkBlue,
  },
  topAchievementsBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    // borderBottomWidth: 1,
    borderColor: Colours.yellow,
    paddingVertical: "5%",
    marginBottom: "5%",
  },
  aBox: {
    flex: 1,
    // borderWidth: 1,
    alignItems: "center",
    height: 100,
  },
  iconBox: {
    width: 70,
    height: 70,
    backgroundColor: Colours.lightBlue,
    margin: "10%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
  },
  moreInfoBox: {
    padding: "1%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  // TEXT
  initialsText: {
    color: Colours.darkBlue,
    textAlignVertical: "center",
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
  achievementName: {
    color: Colours.lightBlue,
  },
  moreText: {
    color: Colours.yellow,
  },

  // OTHER
  profilePic: {
    alignSelf: "center",
    margin: 5,
  },
  goalInput: {
    borderColor: Colours.yellow,
    color: Colours.yellow,
  },
});
