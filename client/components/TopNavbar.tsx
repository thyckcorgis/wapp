import React from "react";
import { TouchableOpacity } from "react-native";

import { UserIcon, CalendarIcon, WappLogo } from "../assets";

import { ScalingButton } from "./buttons/";
import ScreenProps from "./screens/ScreenProps";
import Navbar from "./Navbar";

interface TopNavbarProps extends ScreenProps {}

const TopNavbar: React.FC<TopNavbarProps> = ({ navigation }) => {
  return (
    <Navbar
      left={
        <TouchableOpacity onPress={() => navigation.navigate("User")}>
          <UserIcon />
        </TouchableOpacity>
      }
      middle={<ScalingButton onTap={() => {}} Logo={<WappLogo />} />}
      right={
        <TouchableOpacity onPress={() => navigation.navigate("Calender")}>
          <CalendarIcon />
        </TouchableOpacity>
      }
    />
  );
};

export default TopNavbar;
