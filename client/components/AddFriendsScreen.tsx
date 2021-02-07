import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { useState } from "react";
import fetch from "axios";
import { API_URL } from "../constants";

interface AddFriendsScreenProps {
  navigation: StackNavigationHelpers;
}

export default function AddFriendsScreen({
  navigation,
}: AddFriendsScreenProps) {
  const [users, setUsers] = useState([]);

  async function allUsers() {
    //all pending: ${API_URL}/friend/pending - POST - body: { username: string }
    const { data } = await fetch(`${API_URL}/friend/`);
    setUsers(data.users);
  }

  return (
    <View>
      <Text style={{ padding: 50 }}>This is the add friends screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Friends")}>
        <Text style={{ padding: 50 }}>go back</Text>
      </TouchableOpacity>
    </View>
  );
}
