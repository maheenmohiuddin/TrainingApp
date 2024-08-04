import {View, Text, Dimensions, Image, StyleSheet} from 'react-native';
import React from 'react';
import Styles from '../utills/Styles';
import {COLORS} from '../utills/Constants';
const {width} = Dimensions.get('window');

export default function NoInternetScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/no-internet.png')}
        style={styles.noInternetImage}
      />
      <Text style={styles.offlineText}>Your Are Offline</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.baseColor,
  },
  offlineText: {
    marginTop: 30,
    color: 'gray',
    fontSize: 20,
    fontWeight: 'bold',
  },
  noInternetImage: {
    width: width * 0.35,
    height: width * 0.35,
    resizeMode: 'cover',
  },
});
