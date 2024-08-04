import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../utills/Constants";
import Home from "../Screens/Home";
import MovieDetails from "../Screens/MovieDetails";
import SearchScreen from "../Screens/SearchScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuth from "../hooks/useAuth";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getValue, setValue } from "../utills/asyncStorage";
import LoginScreen from "../Screens/LoginScreen";
import { auth } from "../firebase";

const Stack = createNativeStackNavigator();

export default function HomeStack({ navigation }) {
  const [userName, setUserName] = useState(null);
  //const { user } = useAuth();
  const user = auth.currentUser;
 
  const fetchUserName = () => {
    if (user) {
      {
        setUserName(user.displayName);
        console.log("user details: ", user.displayName);
      }
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      if (user) {
         console.log("user details: ", user.displayName);
        fetchUserName();
      }
    }, [user])
  );

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={headerStyle(userName, navigation)}
        
      />
      <Stack.Screen name="movieDetails" component={MovieDetails} />
      <Stack.Screen name="searchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
}

const headerStyle = (user, navigation) => ({
  title: `Welcome ${user}`,
  headerStyle: { backgroundColor: COLORS.baseColor },
  headerShown: true,
  headerTitleStyle: { color: COLORS.lightred },
  

  headerLeft: () => {
    
    return (
      <Ionicons
        name="menu"
        size={34}
        color={COLORS.red}
        style={{ marginRight: 10 }}
        onPress={() => {
          navigation.toggleDrawer();
        }}
      />
    );
  },
  headerRight: () => {
   
    return (
      <Ionicons
        name="search"
        size={25}
        color={COLORS.red}
        onPress={() => {
          navigation.navigate("searchScreen"); // Navigate to the search screen
        }}
      />
    );
  },
});
