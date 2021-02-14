import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { Colours, Styles } from "../../../styles";

import { getData } from "../../../storage";
import { getFriends } from "../../../api";

import Navbar from "../../Navbar";
import SafeGradient from "../../SafeGradient";
import { ClearButton } from "../../buttons";
import ScreenProps from "../ScreenProps";
import UserArray from "../../UserArray";

interface User {
  username: string;
  name: string;
}

export default function FriendsScreen({ navigation }: ScreenProps) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    (async () => {
      const user = (await getData("user")) as User;
      if (user == null) return navigation.navigate("SignIn");
      const friends = await getFriends(user.username);
      setFriends(friends);
    })();
  }, [setFriends]);

  return (
    <SafeGradient>
      <Text style={{ ...Styles.title, ...styles.title }}>Friends</Text>
      <View style={styles.friendsBox}>
        <ClearButton
          label="Add friends +"
          onPress={() => navigation.navigate("AddFriends")}
        />
        <ScrollView contentContainerStyle={styles.friendsList}>
          <UserArray list={friends} style={{ height: 80 }} />
        </ScrollView>
      </View>
      <Navbar navigation={navigation} right="Litreboards" />
    </SafeGradient>
  );
}

const styles = StyleSheet.create({
  friendsBox: {
    flex: 1,
    margin: 20,
    // borderWidth: 1,
    // borderColor: "black",
  },
  friendsList: {
    flex: 1,
    width: 250,
    alignSelf: "center",
    marginBottom: 30,
    // borderWidth: 1,
    // borderColor: "black",
  },
  title: {
    textAlign: "center",
    marginTop: 30,
    color: Colours.yellow,
  },
  friendBox: {
    width: "100%",
    height: 80,
    backgroundColor: Colours.yellow,
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
