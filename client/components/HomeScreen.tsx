import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { LinearGradient } from "expo-linear-gradient";
import ProgressCircle from "react-native-progress-circle";

import Styles from "../styles/styles";
import Colours from "../styles/colours";

import { Route } from "@react-navigation/native";
import TipsModal from "./TipsModal";

import {
  UserIcon,
  WappLogo,
  CalendarIcon,
  DrinkButton,
  HomeIcon,
  FriendsIcon,
} from "../assets";
import { getData } from "../storage";

interface User {
  daily: number;
  currentIntake: number;
}

interface HomeParams {
  refresh?: boolean;
}
interface HomeScreenProps {
  navigation: StackNavigationHelpers;
  route: Route<"Home", HomeParams>;
}

const getPercentage = (a: number, b: number) => Math.min(100, (a / b) * 100);

export default function HomeScreen({
  navigation,
  route: { params: refresh },
}: HomeScreenProps) {
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
  if (refresh) refreshGoal();

  useEffect(() => {
    refreshGoal();
  }, [refresh, setCurrentIntake, setDaily]);
  return (
    <SafeAreaView style={Styles.screen}>
      <LinearGradient
        style={Styles.background}
        colors={[Colours.darkBlue, Colours.medBlue]}
      />
      <View style={Styles.logoBox}>
        <WappLogo />
      </View>
      <View style={Styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate("User")}>
          <UserIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Calender")}>
          <CalendarIcon />
        </TouchableOpacity>
      </View>
      <View style={Styles.bigButton}>
        <Text style={{ ...Styles.body, ...styles.headerText }}>
          Today is {new Date().toDateString()}.
        </Text>
        <ProgressCircle
          percent={getPercentage(currentIntake, daily)}
          radius={150}
          borderWidth={30}
          shadowColor={Colours.yellow}
          color={Colours.darkYellow}
          bgColor={Colours.lightBlue}
          // bgColor={"transparent"}
        >
          <TouchableOpacity onPress={() => navigation.navigate("LogWater")}>
            <DrinkButton />
          </TouchableOpacity>
        </ProgressCircle>
        <Text style={{ ...Styles.body, ...styles.headerText }}>
          {currentIntake} / {daily}
        </Text>
      </View>
      <View style={Styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <HomeIcon />
        </TouchableOpacity>
        <TipsModal />
        <TouchableOpacity onPress={() => navigation.navigate("Friends")}>
          <FriendsIcon />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  progressBox: {
    // position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  headerText: {
    textAlign: "center",
    color: Colours.yellow,
    fontSize: 18,
    padding: "5%",
  },
});
