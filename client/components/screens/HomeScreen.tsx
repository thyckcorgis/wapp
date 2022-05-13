import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Platform } from "react-native";
import { Route } from "@react-navigation/native";
import ProgressCircle from "react-native-progress-circle";

import { Colours, Styles } from "../../styles";
import { DrinkButton } from "../../assets";

import { getData, storeData } from "../../storage";
import { poll } from "../../util";

import TopNavbar from "../TopNavbar";
import BottomNavbar from "../BottomNavbar";
import { ScalingButton, SolidButton } from "../buttons/";
import SafeGradient from "../SafeGradient";
import ScreenProps from "./ScreenProps";

interface User {
  username: string;
  daily: number;
  currentIntake: number;
}

interface HomeParams {
  refresh?: boolean;
}

interface HomeScreenProps extends ScreenProps {
  route: Route<"Home", HomeParams>;
}

const getPercentage = (a: number, b: number) => Math.min(100, (a / b) * 100);

async function pollUser() {
  const { username } = (await getData("user")) as User;
  if (!username) return false;
  const user = await poll(username);
  await storeData("user", user);
}

export default function HomeScreen({ navigation, route: { params: refresh } }: HomeScreenProps) {
  const [currentIntake, setCurrentIntake] = useState(0);
  const [daily, setDaily] = useState(0);
  function refreshGoal() {
    (async () => {
      const user = (await getData("user")) as User;
      if (user == null) {
        console.log("User not found");
        navigation.navigate("SignIn");
      } else {
        setCurrentIntake(user.currentIntake);
        setDaily(user.daily);
      }
    })();
  }
  if (refresh) {
    pollUser();
    refreshGoal();
  }

  useEffect(() => {
    pollUser();
    refreshGoal();
  }, [refresh, setCurrentIntake, setDaily]);

  return (
    <SafeGradient>
      <TopNavbar navigation={navigation} />
      {/* <View style={Styles.bigButton}> */}
      <View style={styles.box}>
        <View style={[styles.textBox, { justifyContent: "flex-end" }]}>
          <Text style={{ ...Styles.body, ...styles.headerText }}>
            Today is {new Date().toDateString()}.
          </Text>
        </View>
        <View style={Styles.bigButton}>
          <ProgressCircle
            percent={getPercentage(currentIntake, daily)}
            radius={Platform.OS == "ios" ? 150 : 140}
            borderWidth={Platform.OS == "ios" ? 30 : 20}
            shadowColor={Colours.yellow}
            color={Colours.darkYellow}
            bgColor={Colours.lightBlue}
          >
            <View>
              <ScalingButton onTap={() => navigation.navigate("LogWater")} Logo={<DrinkButton />} />
            </View>
          </ProgressCircle>
          <View style={[styles.textBox, { justifyContent: "flex-start" }]}>
            <Text style={{ ...Styles.body, ...styles.headerText }}>
              {currentIntake.toFixed(2)} / {daily.toFixed(2)} L
            </Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <SolidButton
            onPress={() => navigation.navigate("WaterLog")}
            label={"Today's Drink History"}
          />
        </View>
      </View>
      <BottomNavbar navigation={navigation} tips={true} right="Friends" />
    </SafeGradient>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    // borderWidth: 1,
  },
  textBox: {
    flex: 1,
    paddingVertical: "3%",
    // borderWidth: 1,
  },
  headerText: {
    textAlign: "center",
    color: Colours.yellow,
    fontSize: 18,
    // borderWidth: 1,
  },
});
