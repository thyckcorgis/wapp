import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { LinearGradient } from "expo-linear-gradient";
import { getData } from "../storage";
import { getFriends } from "../api";

import Styles from "../styles/styles";
import Colours from "../styles/colours";

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
    <View style={Styles.screen}>
      <LinearGradient
        style={Styles.background}
        colors={[Colours.darkBlue, Colours.medBlue]}
      />
      <Text style={Styles.title}>Friends</Text>
      <TouchableOpacity onPress={() => navigation.navigate("AddFriends")}>
        <Text style={{ padding: 50 }}>Go to add friends screen</Text>
      </TouchableOpacity>
    </View>
  );
}
