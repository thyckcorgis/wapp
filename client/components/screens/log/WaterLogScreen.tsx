import { Route } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { getData, storeData } from "../../../storage";
import { Colours, Styles } from "../../../styles";
import { logWaterIntake } from "../../../util";
import BottomNavbar from "../../BottomNavbar";
import SafeGradient from "../../SafeGradient";
import ScreenProps from "../ScreenProps";
import { Cup } from "./AddCupModal";

interface WaterLogParams {
  refresh?: boolean;
}

interface WaterLogScreenProps extends ScreenProps {
  route: Route<"WaterLog", WaterLogParams>;
}

export default function WaterLogScreen({
  navigation,
  route: { params: refresh },
}: WaterLogScreenProps) {
  const [username, setUsername] = useState("");
  const [cups, setCups] = useState<Cup[]>([]);
  const [amount, setAmount] = useState("");
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
    if (amount === "" || isNaN(parseFloat(amount)) || Number(amount) <= 0) return;
    const data = await logWaterIntake(username, parseFloat(amount));
    setAmount("");
    if (!data.ok) {
      console.log(data.messsage);
    } else {
      await storeData("user", data.user);
      navigation.navigate("Home", { refresh: true });
    }
  }
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
      <Text style={{ ...Styles.title, ...styles.title }}>Today's water breakdown:</Text>

      <View style={styles.cupList}></View>
      <BottomNavbar navigation={navigation} />
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
