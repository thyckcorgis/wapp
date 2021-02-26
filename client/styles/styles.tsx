import { FlexStyle, StyleSheet, Dimensions } from "react-native";
import Colours from "./colours";

const centered: FlexStyle = {
  justifyContent: "center",
  alignSelf: "center",
};

const Styles = StyleSheet.create({
  // SCREENS AND GENERAL BOXES
  screen: {
    ...centered,
    marginVertical: "10%",
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
  navBar: {
    justifyContent: "space-between",
    height: 80,
    // borderWidth: 1,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "3%",
  },
  logoBox: {
    position: "absolute",
    ...centered,
    top: 35,
    zIndex: 2,
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
  error: {
    fontFamily: "Avenir-Light",
    fontSize: 14,
    color: Colours.errorRed,
    textAlign: "center",
  },
  inputField: {
    ...centered,
    padding: 5,
    margin: 10,
    width: 250,
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: 14,
    fontFamily: "Avenir-Light",
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
