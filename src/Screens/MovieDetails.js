import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  StatusBar,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Styles from '../utills/Styles';
import {COLORS} from '../utills/Constants';
import {IMAGE_POSTER_URL} from '../config';
import {GET} from '../Services/API';
import Icons from 'react-native-vector-icons/Entypo';
import TrendingMovies from '../Components/TrendingMovies';
import TrendingPeople from '../Components/TrendingPeople';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useAuth from '../hooks/useAuth';
import {useFavorites} from '../Context/FavoritesContext';
import {useNetwork} from '../Context/NetworkProvider';
import NoInternetScreen from './NoInternetScreen';
// import Video from 'react-native-video';
//import WebView from "react-native-webview";

const MovieDetails = props => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState();
  const MovieID = props.route.params.movieId;
  const {user} = useAuth();
  const heartRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const {isConnected} = useNetwork();

  // define state variable to store favorite items
  //const [favoriteIDList, setFavoriteIDList] = useState([]);
  const {favoriteIDList, onFavorite, onRemoveFavorite, ifExists} =
    useFavorites(); // Get context values

  useEffect(() => {
    const getDetails = async () => {
      const response = await GET(`/movie/${MovieID}`);
      console.log('response movie id selected: ', response);
      setDetails(response);

      setLoading(false);
    };

    getDetails();
  }, []);

  const getGenre = () => {
    return details.genres.map(genre => (
      <View style={Styles.genreContainer}>
        <Text style={Styles.genre}>{genre.name}</Text>
      </View>
    ));
  };

  if (isConnected)
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar style="light" />
        <ScrollView style={Styles.sectionBg}>
          {loading ? (
            <View style={Styles.loadingContainer}>
              <ActivityIndicator size={'large'} color={COLORS.red} />
            </View>
          ) : (
            <View>
              <Image
                style={Styles.imageBg}
                source={{
                  uri: `${IMAGE_POSTER_URL}${details.backdrop_path}`,
                }}
              />
              <Text style={Styles.detailsMovieTitle}>
                {details.original_title}
              </Text>
              {details.homepage ? (
                <View style={Styles.linkContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(details.homepage);
                    }}>
                    <Icons name="link" color={COLORS.textColor} size={22} />
                  </TouchableOpacity>
                </View>
              ) : null}

              <View style={Styles.favContainer}>
                <Text style={Styles.overviewHeading}>OVERVIEW</Text>
                <TouchableOpacity
                  onPress={() => {
                    ifExists(details.id)
                      ? onRemoveFavorite(details.id)
                      : onFavorite(details.id);
                  }}>
                  <MaterialIcons
                    name={
                      ifExists(details.id) ? 'favorite' : 'favorite-outline'
                    }
                    size={32}
                    color={'red'}
                  />
                </TouchableOpacity>
              </View>

              <Text style={Styles.overview}>{details.overview}</Text>

              <View style={Styles.detailsContainer}>
                <View>
                  <Text style={Styles.heading}>BUDGET</Text>
                  <Text style={Styles.details}>$ {details.budget}</Text>
                </View>

                <View>
                  <Text style={Styles.heading}>DURATION</Text>
                  <Text style={Styles.details}>{details.runtime} min.</Text>
                </View>

                <View>
                  <Text style={Styles.heading}>RELEASE DATE</Text>
                  <Text style={Styles.details}>{details.release_date}</Text>
                </View>
              </View>

              <Text style={Styles.heading}>GENRE</Text>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                {getGenre()}
              </View>

              <TrendingPeople
                title="CAST"
                url={`/movie/${MovieID}/credits`}
                isForPage="details"
              />

              <TrendingMovies
                title="SIMILAR MOVIES"
                navigation={props.navigation}
                url={`/movie/${MovieID}/similar`}
              />
              <View style={{height: 80}}></View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  else {
    return <NoInternetScreen />;
  }
};

export default MovieDetails;
