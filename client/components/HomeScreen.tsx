import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { LinearGradient } from "expo-linear-gradient";
// import { CircularProgressbar } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";

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

interface HomeParams {
  username: string;
  name: string;
  friends: string[];
  daily: number;
  currentIntake: number;
}
interface HomeScreenProps {
  navigation: StackNavigationHelpers;
  route: Route<"Home", HomeParams>;
}

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const percentage = 66;
  return (
    <SafeAreaView style={Styles.screen}>
      <LinearGradient
        style={Styles.background}
        colors={[Colours.darkBlue, Colours.medBlue]}
      />
      <View style={Styles.logoBox}>
        <WappLogo />
      </View>
      <View style={{ ...Styles.navBar, ...styles.top }}>
        <TouchableOpacity onPress={() => navigation.navigate("User")}>
          <UserIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Calender")}>
          <CalendarIcon />
        </TouchableOpacity>
      </View>
      <View style={Styles.bigButton}>
        {/* <CircularProgressbar value={percentage} />; */}
        <TouchableOpacity onPress={() => navigation.navigate("LogWater")}>
          <DrinkButton />
        </TouchableOpacity>
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
  top: {
    // alignSelf: "flex-start",
  },
});
