import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { getFriends } from "../api";
import { getData } from "../storage";

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
    <View>
      <Text style={{ padding: 50 }}>This is the friends screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("AddFriends")}>
        <Text style={{ padding: 50 }}>Go to add friends screen</Text>
      </TouchableOpacity>
    </View>
  );
}
