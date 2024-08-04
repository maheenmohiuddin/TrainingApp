import { ActivityIndicator, FlatList, Text, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import Styles from "../utills/Styles";
import {COLORS} from "../utills/Constants";
import { IMAGE_POSTER_URL } from "../config";
import { GET } from "../Services/API";

export default function TrendingPeople(props) {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPeople = async () => {
      const data = await GET(props.url);
      setPeople(props.isForPage === "details" ? data.cast : data.results);
      setLoading(false);
    };
    getPeople();
  }, []);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size={"large"} color={COLORS.textColor} />
      ) : (
        <View>
          <Text style={Styles.heading}>{props.title}</Text>
          <FlatList
            keyExtractor={(item) => item.id}
            data={people}
            renderItem={displayPeople}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
}

const displayPeople = ({ item }) => {
  return (
    <View style={Styles.trendingPeopleContainer}>
      <Image
        style={Styles.trendingPeopleImage}
        source={{ uri: `${IMAGE_POSTER_URL}${item.profile_path}` }}
      />
      <Text style={Styles.trendingPeopleName}>{item.name}</Text>
    </View>
  );
};
