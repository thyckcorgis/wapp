import React from "react";
import { View, TouchableOpacity } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import { Styles } from "../styles";
import { HomeIcon, FriendsIcon, LitreBoardsIcon } from "../assets";

import TipsModal from "./TipsModal";

interface NavbarProps {
  navigation: NavigationScreenProp<{}>;
  right?: string;
  tips?: boolean;
}

const icons: { [k: string]: JSX.Element } = {
  Friends: <FriendsIcon />,
  Litreboards: <LitreBoardsIcon />,
};

export default function Navbar({ navigation, right, tips }: NavbarProps) {
  return (
    <View style={Styles.navBar}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home", { refresh: true })}
      >
        <HomeIcon />
      </TouchableOpacity>

      {tips ? <TipsModal /> : null}

      {right ? (
        <TouchableOpacity onPress={() => navigation.navigate(right)}>
          {icons[right]}
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
