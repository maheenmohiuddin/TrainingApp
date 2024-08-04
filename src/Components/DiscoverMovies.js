import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { GET } from "../Services/API";
import { IMAGE_POSTER_URL } from "../config";
import { SliderBox } from "react-native-image-slider-box";

export default function DiscoverMovies(props) {
  const [movies, setMovies] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const response = await GET("/discover/movie");
      setMovies(response.results);
      const images = response.results.map(
        (data) => `${IMAGE_POSTER_URL}${data.backdrop_path}`
      );
      const backImages = images.slice(0, 10);

      setImages(backImages);
    };
    getMovies();
  }, []);

  return (
    <View>
      <SliderBox
        images={images}
        dotColor="#FFEE58"
        autoplay={true}
        autoplayInterval={4000}
        circleLoop={true}
        onCurrentImagePressed={(index) => {
          props.navigation.navigate("movieDetails", {
            movieId: movies[index].id,
          });
        }}
      />
    </View>
  );
}
