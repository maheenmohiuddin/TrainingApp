import React from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../utills/Constants';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Cross from '../../assets/svg/close.svg';

const CameraGalleryModal = ({
  visible,
  onClose,
  onCameraPress,
  onGalleryPress,
  handleDiscardImage,
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalButton} onPress={onCameraPress}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcon
                name="camera-outline"
                size={30}
                color={COLORS.textColor}
              />
            </View>
            <Text style={styles.modalButtonText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={onGalleryPress}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcon
                name="image-outline"
                size={30}
                color={COLORS.textColor}
              />
            </View>
            <Text style={styles.modalButtonText}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={handleDiscardImage}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcon
                name="trash-can-outline"
                size={30}
                color={COLORS.textColor}
              />
            </View>
            <Text style={styles.modalButtonText}>Discard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cross} onPress={onClose}>
            <Cross width={20} height={20} color='black' />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'lightgrey',
    padding: 30,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: 10,
    //width: "100%",
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: COLORS.red,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10,
  },
  cross: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  iconContainer: {
    backgroundColor: 'transparent', // Ensure no background color
    padding: 5, // Add some padding if needed
  },
});

export default CameraGalleryModal;
