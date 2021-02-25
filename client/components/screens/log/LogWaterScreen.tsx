import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { Route } from "@react-navigation/native";

import { Colours, Styles } from "../../../styles";

import { getData, storeData } from "../../../storage";
import { logWaterIntake } from "../../../api";

import { Cup } from "./AddCupModal";
import { AddButton } from "../../buttons";
import Navbar from "../../Navbar";
import SafeGradient from "../../SafeGradient";
import ScreenProps from "../ScreenProps";
import { deleteNotificationChannelGroupAsync } from "expo-notifications";

interface LogWaterParams {
  refresh?: boolean;
}

interface LogWaterScreenProps extends ScreenProps {
  route: Route<"LogWater", LogWaterParams>;
}

export default function LogWaterScreen({
  navigation,
  route: { params: refresh },
}: LogWaterScreenProps) {
  const [username, setUsername] = useState("");
  const [cups, setCups] = useState<Cup[]>([]);
  const [amount, setAmount] = useState("");

  const onAdd = () => {
    navigation.navigate("AddCupModal");
    // console.log("Modal opened!!");
  };

  useEffect(() => {
    async function refreshCups() {
      const { username } = (await getData("user")) as { username: string };
      const cups = (await getData("cups")) as Cup[];
      if (!cups || !username) {
        console.log("No cups or username");
        return navigation.navigate("SignIn");
      }
      setUsername(username);
      setCups(cups);
    }
    refreshCups();
  }, [refresh, setCups]);

  const logWater = (size: number) => async () => {
    const { user } = await logWaterIntake(username, size);
    await storeData("user", user);
    navigation.navigate("Home", { refresh: true });
  };

  async function updateAmount() {
    if (amount === "" || isNaN(parseFloat(amount)) || Number(amount) <= 0)
      return;
    const data = await logWaterIntake(username, parseFloat(amount));
    setAmount("");
    if (!data.ok) {
      console.log(data.messsage);
    } else {
      await storeData("user", data.user);
      navigation.navigate("Home", { refresh: true });
    }
  }

  // DELETING CUP FUNCTIONS
  function deleteCupAlert(name: string, size: string) {
    Alert.alert(
      `Delete Cup: ${name}`,
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteCup(name, size) },
      ],
      { cancelable: true }
    );
  }

  async function deleteCup(name: string, size: string) {
    for (let i = 0; i < cups.length; i++) {
      if (cups[i].name === name && cups[i].size === size) {
        cups.splice(i, 1);
        break;
      }
    }
    // cups.pop();
    await storeData("cups", cups);
    navigation.navigate("Home");
    navigation.navigate("LogWater");
  }

  return (
    <SafeGradient>
      <Text style={{ ...Styles.title, ...styles.title }}>
        How much water did you drink?
      </Text>
      <View style={styles.manualBox}>
        <Text style={{ ...Styles.body, ...styles.smallText }}>
          Input specific amount (mL):
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <TextInput
            style={styles.waterInput}
            placeholder="0 mL"
            placeholderTextColor={Colours.yellow}
            keyboardType="numeric"
            onChangeText={(text) => setAmount(text)}
            value={String(amount)}
          />
          <TouchableOpacity
            // onPress={() => updateAmount()}
            onLongPress={() => updateAmount()}
            activeOpacity={0.6}
            style={{
              ...Styles.buttonShape,
              ...styles.submitButton,
              width: 100,
            }}
          >
            <Text style={{ ...Styles.body, ...styles.submitText }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cupList}>
        <Text style={{ ...Styles.body, ...styles.smallText }}>
          Quickly add a cup:
        </Text>
        <ScrollView keyboardDismissMode="on-drag">
          {cups.map(({ name, size }) => (
            <TouchableOpacity
              style={{ ...Styles.buttonShape, ...styles.cupButton }}
              onPress={async () => await logWater(Number(size))()}
              onLongPress={() => deleteCupAlert(name, size)}
              key={name + size}
            >
              <Text style={{ ...Styles.body, ...styles.cupText }}>
                {name}: {Number(size) / 1000} L
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={{ ...Styles.buttonShape, ...styles.addCupButton }}
            // TEMPORARY BUTTON... REMOVE WHEN ADD BUTTON IS FIXED
            onPress={() => navigation.navigate("AddCupModal")}
          >
            <Text style={{ ...Styles.body, ...styles.addCupText }}>
              Add a cup size +
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate("AddCupModal")}>
          <AddButton onAdd={onAdd} />
        </TouchableOpacity>
      </View>
      <Navbar navigation={navigation} />
    </SafeGradient>
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
    fontSize: 18,
    textAlign: "center",
    color: Colours.yellow,
  },
  waterInput: {
    borderWidth: 1,
    borderColor: Colours.yellow,
    borderRadius: 20,
    color: Colours.yellow,
    height: 50,
    width: 100,
    marginVertical: 10,
    padding: 5,
    textAlign: "center",
    alignSelf: "center",
  },
  submitButton: {
    // borderColor: Colours.yellow,
    // borderWidth: 1,
    backgroundColor: Colours.yellow,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  submitText: {
    color: Colours.darkBlue,
    textAlign: "center",
  },
});
