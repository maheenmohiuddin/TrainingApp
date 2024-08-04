import {View, Text, Alert, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import HomeStack from './HomeStack';
import SearchScreen from '../Screens/SearchScreen';
import AboutUs from '../Screens/AboutUs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../utills/Constants';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {signOut} from 'firebase/auth';
import {auth} from '../firebase';
import {removeValue} from '../utills/asyncStorage';
import LogoutModal from '../Components/LogoutModal';
import Styles from '../utills/Styles';
import useAuth from '../hooks/useAuth';
import LinearGradient from 'react-native-linear-gradient';

const Drawer = createDrawerNavigator();
function CustomDrawerContent(props) {
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [image, setImage] = useState(
    require('../../assets/placeholderimage.jpg'),
  );
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const placeholderPic = require('../../assets/placeholderimage.jpg');
  const navigation = useNavigation();
  const {user} = useAuth();

  const loadDetails = () => {
    console.log('profileImage: ', user.photoURL);
    setImage(user.photoURL ? {uri: user.photoURL} : placeholderPic);
    setName(user.displayName);
    setEmail(user.email);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        loadDetails();
      }
    }, [user]),
  );

  const handleLogout = async () => {
    try {
      setLogoutModalVisible(false);
      await signOut(auth);

      navigation.navigate('login'); // Navigate to the login screen
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={Styles.DrawerHeader}>
        <Image source={image} style={Styles.DrawerImage} />
        <Text style={Styles.white_bold}>{name}</Text>
        <Text style={Styles.white_bold}>{email}</Text>
      </View>
      <View style={Styles.dividerLine} />
      <DrawerItemList {...props} />

      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#CB356B', '#BD3F32']} // Your gradient colors
        style={{marginTop: 20, marginHorizontal: 10}}>
        <DrawerItem
          label={() => <Text style={Styles.logoutText}>Logout</Text>}
          onPress={() => setLogoutModalVisible(true)}
        />
      </LinearGradient>
      <LogoutModal
        visible={isLogoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        onLogout={handleLogout}
      />
    </DrawerContentScrollView>
  );
}
export default function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {backgroundColor: '#646464', width: 250},

        headerTintColor: 'red',
        drawerLabelStyle: {color: 'white', fontSize: 14, marginLeft: -10},
        drawerActiveBackgroundColor: 'gray',
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          drawerLabel: 'Home',
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons name="home-outline" size={24} color={COLORS.textColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="About Us"
        component={AboutUs}
        options={{
          drawerLabel: 'About Us',
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={COLORS.textColor}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
