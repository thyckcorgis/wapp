import { FlexStyle, StyleSheet, Dimensions, Platform } from "react-native";
import Colours from "./colours";

const centered: FlexStyle = {
  justifyContent: "center",
  alignSelf: "center",
};

const iFont = "Avenir-Light";
const aFont = "sans-serif-thin";

function getOS(isIOS) {
  return Platform.OS;
}

const Styles = StyleSheet.create({
  // SCREENS AND GENERAL BOXES
  screen: {
    ...centered,
    width: "100%",
    height: "100%",
  },
  background: {
    position: "absolute",
    left: "-100%",
    right: "-100%",
    top: 0,
    bottom: 0,
  },
  bigButton: {
    ...centered,
    flex: 1,
  },
  navBar: {
    justifyContent: "space-between",
    width: Dimensions.get("window").width,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "3%",
  },

  // TEXT
  title: {
    fontFamily: Platform.OS == "ios" ? iFont : aFont,
    fontSize: 30,
  },
  body: {
    fontFamily: iFont,
    fontSize: 14,
  },
  error: {
    fontFamily: iFont,
    fontSize: 14,
    color: Colours.errorRed,
    textAlign: "center",
  },
  inputField: {
    ...centered,
    fontFamily: iFont,
    padding: 5,
    margin: 10,
    width: 250,
    textAlign: "left",
    textAlignVertical: "center",
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
