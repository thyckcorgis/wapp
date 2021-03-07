import React from "react";
import { Text, View, StyleSheet } from "react-native";

import { Styles, Colours } from "../styles";

import UserArray, { UserArrayProps } from "./UserArray";

interface UserListProps extends UserArrayProps {
  title: string;
}
const UserList = ({ title, list, label, onPress }: UserListProps) =>
  list.length > 0 ? (
    <View style={styles.friendsBox}>
      <Text style={{ ...Styles.body, ...styles.title }}>{title}</Text>
      <UserArray list={list} label={label} onPress={onPress} />
    </View>
  ) : null;

export default UserList;

const styles = StyleSheet.create({
  friendsBox: {
    flex: 1,
    margin: 20,
    // borderWidth: 1,
  },
  title: {
    textAlign: "center",
    color: Colours.yellow,
    marginTop: 30,
    fontSize: 18,
  },
});
