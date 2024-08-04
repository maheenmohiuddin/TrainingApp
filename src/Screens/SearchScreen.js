import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  PermissionsAndroid
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {COLORS} from "../utills/Constants";
import { useNavigation } from "@react-navigation/native";
import { debounce } from "lodash";
import { searchMovie } from "../Services/API";
import { IMAGE_POSTER_URL } from "../config";
import { useNetwork } from "../Context/NetworkProvider";
import NoInternetScreen from "./NoInternetScreen";

const { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const [results, setResult] = useState([]);
  const navigation = useNavigation();
  const { isConnected } = useNetwork();
  

  const handleSearch = (value) => {
    console.log("value", value);
    searchMovie({
      query: value,
      include_adult: "false",
      language: "en-US",
      page: "1",
    }).then((data) => {
      console.log("obtained data : ", data);
      setResult(data.results);
    });
  };

  const handletextRebounce = useCallback(debounce(handleSearch, 1000), []);
if(isConnected)
  return (
    <SafeAreaView style={styles.con}>
      <View style={styles.searchbar}>
        <TextInput
          onChangeText={handletextRebounce}
          placeholder="Search Movie"
          placeholderTextColor={COLORS.textColor}
          style={styles.input}
        />
      </View>

      {results.length > 0 ? (
        <ScrollView>
          <Text style={styles.resulttext}>Results ({results.length}) </Text>
          <View style={styles.grid}>
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() =>
                   
                    navigation.push("movieDetails", { movieId: item.id })
                  }
                >
                  <View style={styles.griditem}>
                    <Image
                      source={{
                        uri: `${IMAGE_POSTER_URL}${item.poster_path}`,
                      }}
                      style={styles.movieimage}
                    />
                    <Text style={styles.movienametext}>
                      {item.title.length > 22
                        ? item.title.slice(0, 22) + "..."
                        : item.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
          <View style={{ height: 80 }}></View>
        </ScrollView>
      ) : (
        <View style={styles.noMovieContainer}>
          <Image
            source={require("../../assets/movieTime.png")}
            style={styles.noMovieImage}
          />
        </View>
      )}
    </SafeAreaView>
    )
else {
  return <NoInternetScreen/>
  }
}

const styles = StyleSheet.create({
  con: {
    flex: 1,
    backgroundColor: COLORS.baseColor,
    padding: 10,
  },
  input: {
    color: COLORS.textColor,
    flex: 1,
    paddingLeft: 12,
    paddingVertical: 5,

    letterSpacing: 0.3,
    fontWeight: 'semibold',
  },
  searchbar: {
    alignItems: 'center',
    marginBottom: 3,
    marginHorizontal: 4,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: 'lightgray',
    borderWidth: 2,
    borderRadius: 20,
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
  noMovieContainer: {
    flex: 1,
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
  },
  noMovieImage: {
    width: width * 0.8,
    height: width * 0.8,
    resizeMode: 'cover',
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
});
