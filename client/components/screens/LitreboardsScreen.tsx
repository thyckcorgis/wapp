import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, SafeAreaView } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

import { Colours, Styles } from "../../styles";

import { getData } from "../../storage";
import { getLitreBoard } from "../../api";

import Navbar from "../Navbar";

interface LitreboardsScreenProps {
  navigation: StackNavigationHelpers;
}
interface User {
  username: string;
  name: string;
  percentage: number;
}

export default function LitreboardsScreen({
  navigation,
}: LitreboardsScreenProps) {
  const [litreboard, setLitreBoard] = useState([]);

  useEffect(() => {
    (async () => {
      const user = (await getData("user")) as User;
      if (user == null) return navigation.navigate("SignIn");
      const litreboard = await getLitreBoard(user.username);
      setLitreBoard(litreboard);
    })();
  }, [setLitreBoard]);

  return (
    <SafeAreaView style={Styles.screen}>
      <LinearGradient
        style={Styles.background}
        colors={[Colours.darkBlue, Colours.medBlue]}
      />
      <Text style={{ ...Styles.title, ...styles.title }}>Litreboards</Text>
      <View style={styles.litreboard}>
        <ScrollView>
          {litreboard.map(({ username, name, percentage }: User, idx) => (
            <View key={username} style={styles.positionBox}>
              <View style={styles.numberBox}>
                <Text style={{ ...Styles.title, ...styles.positionText }}>
                  #{idx + 1}
                </Text>
              </View>
              <View key={username} style={styles.friendBox}>
                <View style={styles.name}>
                  <Text style={{ ...Styles.body, ...styles.headerText }}>
                    Name:{" "}
                  </Text>
                  <Text style={{ ...Styles.body, ...styles.friendText }}>
                    {name}
                  </Text>
                </View>
                <View style={styles.name}>
                  <Text style={{ ...Styles.body, ...styles.headerText }}>
                    Username:{" "}
                  </Text>
                  <Text style={{ ...Styles.body, ...styles.friendText }}>
                    {username}
                  </Text>
                </View>
                <View style={styles.name}>
                  <Text
                    style={{
                      ...Styles.body,
                      ...styles.headerText,
                      ...{ fontSize: 18 },
                    }}
                  >
                    Goal Completion:{" "}
                  </Text>
                  <Text style={{ ...Styles.body, ...styles.friendText }}>
                    {percentage.toFixed(1)}%
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <Navbar navigation={navigation} right="Friends" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  litreboard: {
    flex: 1,
    margin: 20,
    // borderWidth: 1,
  },
  positionBox: {
    flexDirection: "row",
  },
  numberBox: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 20,
    height: 80,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: Colours.darkBlue,
  },
  friendBox: {
    flex: 7,
    marginHorizontal: 5,
    backgroundColor: Colours.lightBlue,
    marginVertical: 10,
    borderRadius: 20,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  name: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  addButton: {
    borderColor: Colours.yellow,
    borderWidth: 1,
    marginVertical: 30,
  },
  addText: {
    textAlign: "center",
    color: Colours.yellow,
  },
  title: {
    textAlign: "center",
    marginTop: 30,
    color: Colours.yellow,
  },
  positionText: {
    textAlign: "center",
    color: Colours.yellow,
  },
  headerText: {
    fontSize: 20,
    color: Colours.darkBlue,
  },
  friendText: {
    textAlignVertical: "center",
    fontSize: 18,
    color: Colours.medBlue,
  },
});
