import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../utills/Constants';
import {getValue} from '../utills/asyncStorage';
import {GET} from '../Services/API';
import {IMAGE_POSTER_URL} from '../config';
import {useFocusEffect} from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import NoInternetScreen from './NoInternetScreen';
import {useNetwork} from '../Context/NetworkProvider';

const {width, height} = Dimensions.get('window');

export default function FavoritesListScreen({navigation}) {
  const [favmovieList, setfavmovieList] = useState([]);
  const [moviesID, setmoviesID] = useState([]);
  const [loading, setLoading] = useState(false);
  const {user} = useAuth();
  const {isConnected} = useNetwork();

  const loadFavoritesMovieIDs = async () => {
    // Check if the user is logged in
    try {
      const movieIds = await getValue(`favorites-${user.uid}`);
      if (movieIds) {
        setmoviesID(JSON.parse(movieIds));
        console.log('movieIds - MyFavScreen: ', JSON.parse(movieIds).length);
      }
    } catch (error) {
      console.error('Error loading favorites movie IDs:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        loadFavoritesMovieIDs();
      }
    }, [user]),
  );

  useEffect(() => {
    if (user) {
      loadFavoritesMovieIDs();
    } else {
      console.log('User is not logged in.');
    }
  }, [user]); // Add user to the dependency array

  useEffect(() => {
    const getMovies = async () => {
      if (moviesID.length > 0) {
        setLoading(true);
        const moviePromises = moviesID.map(MovieID => GET(`/movie/${MovieID}`));
        const movieResponses = await Promise.all(moviePromises);

        const updatedList = movieResponses.filter(Boolean); // Filter out any undefined responses
        setfavmovieList(updatedList);

        setLoading(false);
      } else {
        setfavmovieList([]); // Clear the list if there are no favorite movies
      }
    };

    getMovies();
  }, [moviesID]);

  if (isConnected)
    return (
      <SafeAreaView style={styles.con}>
        <StatusBar style="light" translucent />
        <Text style={styles.favText}>My Favorites</Text>
        {moviesID.length > 0 ? (
          <ScrollView>
            <Text style={styles.resulttext}>Results ({moviesID.length}) </Text>
            <View style={styles.grid}>
              {favmovieList.map((item, index) => (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => {
                    navigation.navigate('movieDetails', {movieId: item.id});
                  }}>
                  <View style={styles.griditem}>
                    <Image
                      source={{
                        uri: `${IMAGE_POSTER_URL}${item.poster_path}`,
                      }}
                      style={styles.movieimage}
                    />
                    <Text style={styles.movienametext}>
                      {item.title.length > 22
                        ? item.title.slice(0, 22) + '...'
                        : item.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </View>
            <View style={{height: 80}}></View>
          </ScrollView>
        ) : (
          <View style={styles.nomovieimage}>
            <Image
              source={require('../../assets/movieTime.png')}
              style={{
                width: width * 0.8,
                height: width * 0.8,
                resizeMode: 'cover',
              }}
            />
            <Text style={styles.noFavItemText}>No Favorites Item added</Text>
          </View>
        )}
      </SafeAreaView>
    );
  else {
    return <NoInternetScreen />;
  }
}

const styles = StyleSheet.create({
  con: {
    flex: 1,
    backgroundColor: COLORS.baseColor,
    padding: 10,
  },
  movieimage: {
    height: height * 0.3,
    width: width * 0.44,
    borderRadius: 20,
  },
  resulttext: {
    color: COLORS.textColor,
    marginLeft: 4,
    marginVertical: 2,
    letterSpacing: 0.3,
    fontWeight: 'bold',
  },
  nomovieimage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
  },
  movienametext: {
    color: COLORS.textColor,
    textAlign: 'center',
    paddingTop: 5,
  },
  grid: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  griditem: {
    paddingVertical: 5,
  },
  favText: {
    color: COLORS.red,
    paddingTop: 35,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noFavItemText: {
    color: 'grey',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
