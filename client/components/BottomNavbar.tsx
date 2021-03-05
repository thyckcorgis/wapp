import React from "react";
import { TouchableOpacity } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { HomeIcon, FriendsIcon, LitreBoardsIcon, CorgiLogo, WappLogo } from "../assets";

import Navbar from "./Navbar";
import TipsModal from "./TipsModal";

interface BottomNavbarProps {
  navigation: NavigationScreenProp<{}>;
  tips?: boolean;
  right?: string;
}

const icons: { [k: string]: JSX.Element } = {
  Friends: <FriendsIcon />,
  Litreboards: <LitreBoardsIcon />,
  LogWater: <WappLogo />,
  WaterLog: <CorgiLogo />,
};

export default function BottomNavbar({ navigation, right, tips }: BottomNavbarProps) {
  return (
    <Navbar
      left={
        <TouchableOpacity onPress={() => navigation.navigate("Home", { refresh: true })}>
          <HomeIcon />
        </TouchableOpacity>
      }
      middle={tips ? <TipsModal /> : null}
      right={
        right ? (
          <TouchableOpacity onPress={() => navigation.navigate(right)}>
            {icons[right]}
          </TouchableOpacity>
        ) : null
      }
    />
  );
}
