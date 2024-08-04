import {View, ScrollView} from 'react-native';
import React from 'react';
import {useNetwork} from '../Context/NetworkProvider';
import DiscoverMovies from '../Components/DiscoverMovies';
import TrendingPeople from '../Components/TrendingPeople';
import TrendingMovies from '../Components/TrendingMovies';
import Styles from '../utills/Styles';
import NoInternetScreen from './NoInternetScreen';

export default function Home(props) {
  const {isConnected} = useNetwork();
  if (isConnected)
    return (
      <ScrollView style={Styles.sectionBg}>
        <DiscoverMovies navigation={props.navigation} />
        <TrendingPeople title="Trending People" url="/trending/person/week" />
        <TrendingMovies
          title="Trending Movies"
          url="/movie/top_rated"
          navigation={props.navigation}
        />
        <View style={{height: 80}}></View>
      </ScrollView>
    );
  else {
    return <NoInternetScreen />;
  }
}
