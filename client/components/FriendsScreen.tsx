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
import { getData } from "../storage";
import { getFriends } from "../api";

import Styles from "../styles/styles";
import Colours from "../styles/colours";

import { HomeIcon, FriendsIcon } from "../assets";
import { ScrollView } from "react-native-gesture-handler";

interface FriendsScreenProps {
  navigation: StackNavigationHelpers;
}
interface User {
  username: string;
  name: string;
} 

export default function FriendsScreen({ navigation }: FriendsScreenProps) {
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
    <SafeAreaView style={Styles.screen}>
      <LinearGradient
        style={Styles.background}
        colors={[Colours.darkBlue, Colours.medBlue]}
      />
      <Text style={{ ...Styles.title, ...styles.title }}>Friends</Text>
      <View style={styles.friendsBox}>
        <TouchableOpacity
          style={{ ...Styles.buttonShape, ...styles.addButton }}
          onPress={() => navigation.navigate("AddFriends")}
        >
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.friendsList}>
          <Text>#1 Friend</Text>
          {friends.map(({ username, name }) => (
            <View key={username}>
              <Text>
                Name: {name} Username: {username}
              </Text>
              {/* <TouchableOpacity
                style={styles.smallButton}
                onPress={() => addFriend(username)()}
              >
                <Text>Add Friend</Text>
              </TouchableOpacity> */}
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={{ ...Styles.navBar }}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <HomeIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Friends")}>
          <FriendsIcon />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "black",
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
});
