import React, { useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { useState } from "react";
import fetch from "axios";
import { API_URL } from "../constants";
import {
  getPendingRequests,
  sendFriendRequest,
  acceptFriendRequest,
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

  async function fetchAllData() {
    const user = (await getData("user")) as User;
    if (user == null) return;
    const { username } = user;

    setUsername(username);
    let res = await fetch(`${API_URL}/friend/`);
    setUsers(res.data.users);
    setPendingRequests(await getPendingRequests(username));
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

  return (
    <View>
      <TouchableOpacity onPress={() => fetchAllData()}>
        <Text style={{ padding: 50 }}>refresh</Text>
      </TouchableOpacity>
      <Text style={{ padding: 50 }}>This is the add friends screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Friends")}>
        <Text style={{ padding: 50 }}>go back</Text>
      </TouchableOpacity>
      {users.map(({ username, name }) => (
        <View key={username}>
          <Text>
            Name: {name} Username: {username}
          </Text>
          <TouchableOpacity onPress={() => addFriend(username)()}>
            <Text>Add Friend</Text>
          </TouchableOpacity>
        </View>
      ))}
      {pendingRequests.map(({ username, name }) => (
        <View key={username}>
          <Text>
            Name: {name} Username: {username}
          </Text>
          <TouchableOpacity onPress={() => acceptFriend(username)()}>
            <Text>Accept Friend</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}
