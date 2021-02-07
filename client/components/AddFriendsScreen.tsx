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

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
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
        <TouchableOpacity onPress={() => fetchAllData()}>
          <Text style={{ padding: 50 }}>refresh</Text>
        </TouchableOpacity>

        <Text style={{ ...Styles.title }}>Add New Friends</Text>
        <View style={styles.friendsBox}>
          {users.map(({ username, name }) => (
            <View key={username}>
              <Text>
                Name: {name} Username: {username}
              </Text>
              <TouchableOpacity
                style={styles.smallButton}
                onPress={() => addFriend(username)()}
              >
                <Text>Add Friend</Text>
              </TouchableOpacity>
            </View>
          ))}
          {pendingRequests.map(({ username, name }) => (
            <View key={username}>
              <Text>
                Name: {name} Username: {username}
              </Text>
              <TouchableOpacity
                style={styles.smallButton}
                onPress={() => acceptFriend(username)()}
              >
                <Text>Accept Friend</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
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
    // height: 400,
    borderWidth: 1,
    borderColor: "black",
  },
  navBar: {
    justifyContent: "flex-end",
    bottom: 0,
  },
  smallButton: {
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    elevation: 2,
    alignSelf: "center",
    width: "100%",
  },
  buttonText: {
    color: Colours.yellow,
    textAlign: "center",
  },
});
