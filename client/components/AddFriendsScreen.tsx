import React, { useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import Styles from "../styles/styles";
import Colours from "../styles/colours";

import { HomeIcon, FriendsIcon } from "../assets";

import fetch from "axios";
import { API_URL } from "../constants";
import {
  getPendingRequests,
  sendFriendRequest,
  acceptFriendRequest,
  getNonFriends,
} from "../api";
import { getData } from "../storage";

interface AddFriendsScreenProps {
  navigation: StackNavigationHelpers;
}

interface User {
  username: string;
  name: string;
}

export default function AddFriendsScreen({
  navigation,
}: AddFriendsScreenProps) {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [pendingRequests, setPendingRequests] = useState<User[]>([]);

  function fetchAllData() {
    (async () => {
      const user = (await getData("user")) as User;
      if (user == null) return;
      const { username } = user;

      setUsername(username);
      let users = await getNonFriends(username);
      setUsers(users);
      let pending = await getPendingRequests(username);
      setPendingRequests(pending);
    })();
  }

  useEffect(() => {
    fetchAllData();
  }, [setUsername, setUsers, setPendingRequests]);

  function addFriend(friend: string) {
    return () => {
      (async () => {
        const data = await sendFriendRequest(username, friend);
        console.log(data);
      })();
    };
  }

  function acceptFriend(friend: string) {
    return () => {
      (async () => {
        const data = await acceptFriendRequest(username, friend);
        console.log(data);
      })();
    };
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    fetchAllData();
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={Styles.screen}>
      <LinearGradient
        style={Styles.background}
        colors={[Colours.darkBlue, Colours.medBlue]}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={{ ...Styles.title, ...styles.title }}>
          Add New Friends
        </Text>
        <View style={styles.friendsBox}>
          <Text style={{ ...Styles.body, ...styles.title }}>Other Users:</Text>
          {users.map(({ username, name }) => (
            <View style={styles.friendBox} key={username}>
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
              <TouchableOpacity
                style={styles.smallButton}
                onPress={() => addFriend(username)()}
              >
                <Text style={{ ...Styles.body, ...styles.buttonText }}>
                  Add Friend
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={styles.friendsBox}>
          <Text style={{ ...Styles.body, ...styles.title }}>
            Pending requests:
          </Text>
          {pendingRequests.map(({ username, name }) => (
            <View style={styles.friendBox} key={username}>
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
              <TouchableOpacity
                style={styles.smallButton}
                onPress={() => acceptFriend(username)()}
              >
                <Text style={{ ...Styles.body, ...styles.buttonText }}>
                  Accept Friend
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={{ ...Styles.navBar }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home", { refresh: true })}
        >
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
  },
  friendBox: {
    width: "100%",
    backgroundColor: Colours.yellow,
    marginVertical: 10,
    borderRadius: 20,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  name: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  navBar: {
    justifyContent: "flex-end",
    bottom: 0,
  },
  title: {
    textAlign: "center",
    color: Colours.yellow,
    marginTop: 30,
  },
  smallButton: {
    borderRadius: 20,
    backgroundColor: Colours.lightBlue,
    margin: 10,
    padding: 10,
    paddingHorizontal: 20,
    elevation: 2,
    alignSelf: "center",
    width: "50%",
  },
  buttonText: {
    color: Colours.darkBlue,
    textAlign: "center",
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
