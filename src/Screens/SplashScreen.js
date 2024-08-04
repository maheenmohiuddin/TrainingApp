import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
const {width, height} = Dimensions.get('window');

export default function SplashScreen() {
  return (
    <View style={Styles.container}>
      <LottieView
        loop
        autoPlay
        style={Styles.image}
        source={require('../../assets/anim/splashAnim.json')}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: 'cover',
  },
});
