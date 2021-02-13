import React, { useState } from "react";
import {
  Text,
  View,
  Modal,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { TipsIcon } from "../assets/index";
import { Colours, Styles } from "../styles";

export default function TipsModal() {
  const [modalVisible, setModalVisible] = useState(false);

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
          <View style={styles.modalView}>
            <Text style={{ ...Styles.title, ...styles.modalTitle }}>
              Tip of the day:{" "}
            </Text>
            <View style={styles.tipBox}>
              <Text style={{ ...Styles.body, ...styles.modalText }}>
                If you see a bathroom in a dream - DON'T USE IT!{" "}
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
    height: "40%",
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
