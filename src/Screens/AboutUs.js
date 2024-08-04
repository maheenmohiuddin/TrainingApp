import {View, Text} from 'react-native';
import React from 'react';
import Styles from '../utills/Styles';
import { useNetwork } from '../Context/NetworkProvider';
import NoInternetScreen from './NoInternetScreen';

export default function AboutUs() {
  const {isConnected} = useNetwork();

  if (isConnected)
    return (
      <View style={Styles.screen}>
        <Text style={{color: 'white'}}>About My App</Text>
      </View>
    );
  else {
    return <NoInternetScreen />;
  }
}
