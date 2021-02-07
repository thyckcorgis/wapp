import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { LinearGradient } from "expo-linear-gradient";

import Styles from "../styles/styles";
import Colours from "../styles/colours";

import { HomeIcon } from "../assets";
import { getData } from "../storage";
import { Cup } from "./CupSizeScreen";
import { logWaterIntake } from "../api";

interface LogWaterScreenProps {
  navigation: StackNavigationHelpers;
}

export default function ReminderScreen({ navigation }: LogWaterScreenProps) {
  const [username, setUsername] = useState("");
  const [cups, setCups] = useState<Cup[]>([]);
  useEffect(() => {
    (async () => {
      const { username } = (await getData("user")) as { username: string };
      const cups = (await getData("cups")) as Cup[];
      if (!cups || !username) return navigation.navigate("SignIn");
      setUsername(username);
      setCups(cups);
    })();
  }, [setCups]);
  const logWater = (size: number) => async () => {
    const data = await logWaterIntake(username, size);
    console.log(data);
    navigation.navigate("Home");
  };
  return (
    <View style={Styles.screen}>
      <LinearGradient
        style={Styles.background}
        colors={[Colours.darkBlue, Colours.medBlue]}
      />
      <Text style={{ ...Styles.title, ...styles.title }}>
        How much water did you drink?
      </Text>
      <View style={styles.manualBox}>
        <Text style={{ ...Styles.body, ...styles.smallText }}>
          Manually add litres of water:
        </Text>
        <TextInput
          style={styles.waterInput}
          placeholderTextColor={Colours.yellow}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.cupList}>
        <Text style={{ ...Styles.body, ...styles.smallText }}>
          Quickly add a cup:
        </Text>
        <ScrollView keyboardDismissMode="on-drag">
          {cups.map(({ name, size }) => {
            <TouchableOpacity
              style={{ ...Styles.buttonShape, ...styles.cupButton }}
              onPress={async () => await logWater(Number(size))()}
            >
              <Text style={{ ...Styles.body, ...styles.cupText }}>: 0.1 L</Text>
            </TouchableOpacity>;
          })}
          <TouchableOpacity
            style={{ ...Styles.buttonShape, ...styles.addCupButton }}
            onPress={() => navigation.navigate("CupSize")}
          >
            <Text style={{ ...Styles.body, ...styles.addCupText }}>
              Add a cup size +
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={{ ...Styles.navBar }}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <HomeIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  manualBox: {
    marginTop: 30,
    flex: 1,
    marginHorizontal: 20,
    padding: 10,
    // borderWidth: 1,
  },
  cupList: {
    flex: 3,
    marginHorizontal: 20,
    padding: 10,
    // borderWidth: 1,
  },

  addCupButton: {
    borderColor: Colours.yellow,
    borderWidth: 1,
  },
  addCupText: {
    textAlign: "center",
    color: Colours.yellow,
  },

  cupButton: {
    backgroundColor: Colours.yellow,
  },
  cupText: {
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
    color: Colours.yellow,
  },
  waterInput: {
    borderWidth: 1,
    borderColor: Colours.yellow,
    borderRadius: 20,
    height: 50,
    width: 100,
    marginVertical: 10,
    padding: 5,
    textAlign: "center",
    alignSelf: "center",
  },
});
