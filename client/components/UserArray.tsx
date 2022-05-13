import React from "react";
import { StyleSheet, View } from "react-native";
import { Colours } from "../styles";
import { SmallButton } from "./buttons";
import TextRow from "./TextRow";

export interface User {
  username: string;
  name: string;
}

export interface UserArrayProps {
  list: User[];
  label?: string;
  onPress?: () => void;
  style?: object;
}

const UserArray = ({ list, label, onPress, style }: UserArrayProps) => (
  <>
    {list?.map(({ username, name }) => (
      <View style={{ ...styles.friendBox, ...style }} key={username}>
        <TextRow title="Name:" text={name} />
        <TextRow title="Username:" text={username} />
        {onPress ? <SmallButton label={label || ""} onPress={onPress} /> : null}
      </View>
    ))}
  </>
);

export default UserArray;

const styles = StyleSheet.create({
  friendBox: {
    width: "100%",
    backgroundColor: Colours.yellow,
    marginVertical: 10,
    borderRadius: 20,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
