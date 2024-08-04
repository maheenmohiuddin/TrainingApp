import { View, Text, Image } from "react-native";
import React from "react";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import Feathericon from "react-native-vector-icons/Feather";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../Screens/ProfileScreen";
import DrawerRoutes from "./DrawerRoutes";
import { COLORS } from "../utills/Constants";
import FavoritesStack from "./FavoritesStack";

const Tab = createBottomTabNavigator();

export default function TabRoutes({navigation}) {
  return (
    <Tab.Navigator
      initialRouteName={"HomewithDrawer"}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.red,
        tabBarInactiveTintColor: COLORS.lightred,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: COLORS.background,
          borderRadius: 50,
          marginBottom: 10,
          marginHorizontal: 16,
          borderBlockColor: COLORS.background,
        },
      }}
    >
      <Tab.Screen
        name={"HomewithDrawer"}
        component={DrawerRoutes}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesignIcon
                name="home"
                size={25}
                color={focused ? COLORS.red : "gray"}
                style={{ marginRight: 10 }}
              />
            );
          },
        }}
      />
  
      <Tab.Screen
        name={"Favorites"}
        component={FavoritesStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Feathericon
                name="heart"
                size={25}
                color={focused ? COLORS.red : "gray"}
                style={{ marginRight: 10 }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={"Profile"}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Feathericon
                name="user"
                size={25}
                color={focused ? COLORS.red : "gray"}
                style={{ marginRight: 10 }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
