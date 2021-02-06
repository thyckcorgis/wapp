import { FlexStyle, StyleSheet } from "react-native";
import Colours from "./colours";

const centered: FlexStyle = {
  justifyContent: "center",
  alignSelf: "center",
};

const Styles = StyleSheet.create({
  // SCREENS AND GENERAL
  screen: {
    ...centered,
    padding: 50,
    flex: 1,
  },
  background: {
    position: "absolute",
    // left: 0,
    // right: 0,
    // top: 0,
    // bottom: 0,

    left: -100,
    right: -100,
    top: -100,
    bottom: -100,
  },
  bigButton: {
    ...centered,
    flex: 1,
  },
  // TEXT
  title: {
    fontFamily: "Avenir-Light",
    fontSize: 30,
  },
  body: {
    fontFamily: "Avenir-Light",
    fontSize: 14,
  },
  inputField: {
    ...centered,
    padding: 5,
    margin: 10,
    width: 250,
    textAlign: "left",
    fontSize: 14,
    borderBottomWidth: 1,
  },
  //   BUTTONS
  buttonShape: {
    ...centered,
    borderRadius: 20,
    height: 50,
    width: 250,
    marginVertical: 10,
  },
});

export default Styles;
