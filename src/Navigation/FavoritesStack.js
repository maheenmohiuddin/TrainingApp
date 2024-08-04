import { View, Text } from 'react-native'
import React from 'react'
import MovieDetails from '../Screens/MovieDetails';
import FavoritesListScreen from '../Screens/FavoritesListScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
export default function FavoritesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Favorites Screen" component={FavoritesListScreen} />
      <Stack.Screen name="movieDetails" component={MovieDetails} />
    </Stack.Navigator>
  );
}