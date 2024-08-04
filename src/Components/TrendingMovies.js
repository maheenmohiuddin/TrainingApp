import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Styles from "../utills/Styles";
import {COLORS} from "../utills/Constants";
import { POSTER_IMAGE } from "../config";
import { GET } from "../Services/API";

export default function TrendingMovies(props) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      const data = await GET(props.url);
      setMovies(data.results);
      setLoading(false);
    };
    getMovies();
  }, []);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size={"large"} color={COLORS.textColor} />
      ) : (
        <View>
          <Text style={Styles.headingMovies}>{props.title}</Text>
            <FlatList
             
            keyExtractor={item => item.id}
            data={movies}
            renderItem={(item) => displayMovies(item, props)}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
}

const displayMovies = ({ item }, props) => {
  return (
    <TouchableOpacity
      style={{ marginHorizontal: 10 }}
      onPress={() => {
        props.navigation.push("movieDetails", { movieId: item.id });
      }}
    >
      <Image
        style={Styles.posterImage}
        source={{ uri: `${POSTER_IMAGE}${item.poster_path}` }}
      />
      <Text style={Styles.movieTitle}>{item.original_title}</Text>
    </TouchableOpacity>
  );
};
