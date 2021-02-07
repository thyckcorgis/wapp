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
  TipsIcon,
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
  return (
    <SafeAreaView style={Styles.screen}>
      <LinearGradient
        style={Styles.background}
        colors={[Colours.darkBlue, Colours.medBlue]}
      />
      <View style={{ ...Styles.navBar, ...styles.top }}>
        <UserIcon />
        <WappLogo />
        <CalendarIcon />
      </View>
      <Text style={{ padding: 50 }}>This is the home screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Friends")}>
        <Text style={{ padding: 50 }}>Go to friends screen</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Calender")}>
        <Text style={{ padding: 50 }}>Go to calender screen</Text>
      </TouchableOpacity>
      <TipsModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  top: {
    // alignSelf: "flex-start",
  },
});
