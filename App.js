import {StatusBar} from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NetworkProvider } from './src/Context/NetworkProvider';
import { enableScreens } from 'react-native-screens';
import { FavoritesProvider } from './src/Context/FavoritesContext';
import LoginScreen from './src/Screens/LoginScreen';
import OnBoardingScreen from './src/Screens/OnBoardingScreen';
import SignUpScreen from './src/Screens/SignUpScreen';
import TabRoutes from './src/Navigation/TabRoutes';
import { getValue } from './src/utills/asyncStorage';
import SplashScreen from './src/Screens/SplashScreen';
import useAuth from './src/hooks/useAuth';

enableScreens(); // Enable react-native-screens
const Stack = createNativeStackNavigator();

const App = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(null);
  const {user} = useAuth();

  console.log('user - App.js: ', user);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const onboarded = await getValue('isOnboarded');
        console.log('onboarded value : ', onboarded);
        if (onboarded === 'true') {
          setShowOnboarding(false);
        } else {
          setShowOnboarding(true);
        }
      } catch (error) {
        console.error('Failed to check first launch:', error);
      } finally {
        setTimeout(() => {
          setShowSplashScreen(false);
        }, 4000);
      }
    };

    checkFirstLaunch();
  }, []);

  if (showSplashScreen) {
    return <SplashScreen />;
  }
  return (
    <NetworkProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <StatusBar translucent backgroundColor="transparent" />
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName={
              user ? 'TabRoutes' : showOnboarding ? 'onBoardingScreen' : 'login'
            }>
            {user ? (
              <>
                <Stack.Screen name="TabRoutes" component={TabRoutes} />
              </>
            ) : (
              <>
                <Stack.Screen name="login" component={LoginScreen} />
                <Stack.Screen
                  name="onBoardingScreen"
                  component={OnBoardingScreen}
                />
                <Stack.Screen name="signup" component={SignUpScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </NetworkProvider>
  );
};

export default App;

