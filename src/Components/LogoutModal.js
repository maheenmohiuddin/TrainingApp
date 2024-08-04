import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../utills/Constants";

const LogoutModal = ({ visible, onClose, onLogout }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text>Are you sure you want to logout?</Text>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={onLogout}>
              <Text style={styles.textStyle}>Logout</Text>
            </TouchableOpacity>
            <View width={2} style={{ width: 1 ,backgroundColor:"lightgray"}} />
            <TouchableOpacity onPress={onClose}>
              <Text style={{ fontWeight: "bold" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  btnContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-around",
    width: "100%",
  },
  textStyle: {
    color: COLORS.red,
    fontWeight: "bold",
  },
});

export default LogoutModal;
