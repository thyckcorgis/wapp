import React, { useState } from "react";
import { Text, View, Modal, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { TipsIcon } from "../assets/index";
import { Colours, Styles } from "../styles";

const tips = [
  "If you see a bathroom in a dream - DON'T USE IT!",
  "When you smell pee in the streets, you can tell that urine the wrong neighbourhood.",
  "Why can't you hear a pterodactyl pee? Because they're extinct.",
  'Wife: "I just got stung by a jellyfish. quick, pee on it!"\nHusband: *peeing on jellyfish* "This is for stinging my wife." ',
  "Don't pee on anyone, or else they're going to be pissed.",
];

export default function TipsModal() {
  const [modalVisible, setModalVisible] = useState(false);
  const rand = Math.floor(Math.random() * 5)

  //works for all tips as of now it might not necessarily work for future ones
  const height = 230 + 6 * tips[rand].split(' ').length

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={{...styles.modalView, height:height}}>
            <Text style={{ ...Styles.title, ...styles.modalTitle }}>
              Tip of the day:{" "}
            </Text>
            <View style={styles.tipBox}>
              <Text style={{ ...Styles.body, ...styles.modalText }}>
                {tips[rand] + " "}
              </Text>
            </View>

            <TouchableOpacity
              style={{ ...styles.button, backgroundColor: Colours.medBlue }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={{ ...Styles.body, ...styles.backText }}>Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <TipsIcon />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    marginHorizontal: 40,
    //height: "40%",
    backgroundColor: Colours.yellow,
    borderRadius: 20,
    padding: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tipBox: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    elevation: 2,
    alignSelf: "center",
    width: "80%",
  },
  backText: {
    color: Colours.yellow,
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    textAlign: "center",
    color: Colours.darkBlue,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    color: Colours.darkBlue,
  },
});
