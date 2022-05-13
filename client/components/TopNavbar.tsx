import React from "react";
import { TouchableOpacity } from "react-native";
import { CalendarIcon, UserIcon, WappLogo } from "../assets";
import { ScalingButton } from "./buttons/";
import Navbar from "./Navbar";
import ScreenProps from "./screens/ScreenProps";

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
