import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';
import {signOut, updateProfile} from 'firebase/auth';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {setDoc, doc} from 'firebase/firestore';
import {db} from '../firebase';
import {COLORS} from '../utills/Constants';
import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {auth} from '../firebase';
import useAuth from '../hooks/useAuth';
import LinearGradient from 'react-native-linear-gradient';
import CameraGalleryModal from '../Components/CameraGalleryModal';
import {Styles} from '../utills/Styles';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNetwork} from '../Context/NetworkProvider';
import NoInternetScreen from './NoInternetScreen';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';
const deviceWidth = Dimensions.get('window').width;

export default function ProfileScreen() {
  const user = auth.currentUser;
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const placeholderPic = require('../../assets/placeholderimage.jpg');
  const [imageSource, setImageSource] = useState(placeholderPic); // Default profile image
  const navigation = useNavigation();
  const {isConnected} = useNetwork();
  const [userLocation, setUserLocation] = useState(null);
  const [mapModalVisible, setMapModalVisible] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      console.log('current user in Profile screen: ', user);
      if (user) {
        setUserName(user.displayName);
        setUserEmail(user.email);
        setImageSource(user.photoURL ? {uri: user.photoURL} : placeholderPic);
      }
    };

    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        }
      } else {
        getCurrentLocation();
      }
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        },
        error => {
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 25000,
          maximumAge: 10000,
        },
      );
    };

    fetchUser();
    requestLocationPermission();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);

      navigation.navigate('login'); // Navigate to the login screen
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleCameraPress = () => {
    setModalVisible(true);
  };

  const saveProfilePicForUser = async imageUri => {
    console.log('current user-name: ', user.displayName);
    user.photoURL = imageUri;
    await updateProfile(user, {
      photoURL: imageUri,
    });

    console.log('current user-photoURL: ', user.photoURL);
  };

  const handleChooseFromCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await launchCamera(options);
        console.log('result: ', result);
        if (!result.canceled) {
          console.log('result: ', result);
          await saveImage(result.assets[0].uri);
        }
      }
    } catch (error) {
      //alert("Error accessing camera: " + error.message);
      console.log('Error uploading Image from camera:', error);
      setModalVisible(false);
    }
  };

  const saveImage = async image => {
    try {
      setImageSource({uri: image});
      setModalVisible(false);
      console.log('image url ', image);
      await saveProfilePicForUser(image);
    } catch (error) {
      console.log('error in image url ', error);
    }
  };
  const options = {
    mediaTypes: 'photo',
    savetoPhotos: true,
    //  (cameraType ; ImagePicker.CameraType.back),
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  };

  const handleChooseFromGallery = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        //  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await launchImageLibrary(options);

        if (!result.canceled) {
          console.log('result: ', result);
          await saveImage(result.assets[0].uri);
        }
      }
    } catch (error) {
      //alert("Error accessing camera: " + error.message);
      console.log('Error uploading Image Gallery:', error);
      setModalVisible(false);
    }
  };

  const handleDiscardImage = async () => {
    setImageSource(placeholderPic); // Reset to placeholder image
    await saveProfilePicForUser(placeholderPic);
    setModalVisible(false);
  };

  const handleOpenMap = () => {
    setMapModalVisible(true);
  };

  const handleSaveLocation = newLocation => {
    setUserLocation({
      latitude: newLocation.latitude,
      longitude: newLocation.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    console.log('newLocation: ', newLocation);
    //setMapModalVisible(false);
  };

  if (isConnected)
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Profile Screen</Text>

        <View style={styles.avatarContainer}>
          <Image
            source={imageSource} // Replace with your default profile image
            style={styles.avatar}
          />
          <TouchableOpacity
            style={styles.cameraBtn}
            onPress={handleCameraPress}>
            <MaterialCommunityIcon
              name="camera-outline"
              size={30}
              color={COLORS.lightred}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.usernameText}>{userName}</Text>

        <View style={styles.detailsCon}>
          <View style={styles.grayFieldCon}>
            <MaterialCommunityIcon
              name="email-outline"
              size={27}
              color="white"
            />
            <View style={{width: '5%'}} />
            <Text style={{color: 'white'}}>{userEmail}</Text>
          </View>

          <View style={styles.grayFieldCon}>
            <MaterialCommunityIcon
              name="map-marker-outline"
              size={27}
              color="white"
            />
            <View style={{width: '5%'}} />
            <Text style={{color: 'white'}}>
              {userLocation
                ? userLocation.latitude + ', ' + userLocation.longitude
                : 'loading...'}
            </Text>
            <View style={{width: '2%'}} />
            <TouchableOpacity onPress={handleOpenMap}>
              <MaterialCommunityIcon
                name="pencil"
                size={20}
                color={COLORS.red}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={handleLogout}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#CB356B', '#BD3F32']}
            style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>

        <CameraGalleryModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onCameraPress={handleChooseFromCamera}
          onGalleryPress={handleChooseFromGallery}
          handleDiscardImage={handleDiscardImage}
        />

        <Modal
          visible={mapModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setMapModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map2}
                region={userLocation}
                showsUserLocation={true}
                onPress={e => handleSaveLocation(e.nativeEvent.coordinate)}>
                {userLocation && <Marker coordinate={userLocation} />}
              </MapView>
              <TouchableOpacity
                style={styles.saveLocationButton}
                onPress={() => setMapModalVisible(false)}>
                <Text style={styles.saveLocationText}>Save Location</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  else {
    return <NoInternetScreen />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.baseColor,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 35,
    color: COLORS.red,
    marginTop: 60, // Add some top margin
    textAlign: 'center', // Center text
  },
  usernameText: {
    color: COLORS.darklightred,
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
  },
  detailsCon: {
    marginHorizontal: 15,
    marginTop: 40,
    justifyContent: 'space-between',
    height: deviceWidth * 0.28,
  },
  grayFieldCon: {
    flexDirection: 'row',
    backgroundColor: 'rgba(60, 60, 60, 0.5)',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    // backgroundColor: COLORS.red, // Or any color you prefer
    padding: 10,
    width: 200,
    marginTop: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  mapContainer: {
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: 250,
  },
  map2: {
    width: '100%',
    height: '100%',
  },
  logoutText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  avatarContainer: {
    marginHorizontal: deviceWidth * 0.32,
    width: deviceWidth * 0.35,
    height: deviceWidth * 0.35,

    marginTop: deviceWidth * 0.1,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  avatar: {
    width: deviceWidth * 0.35,
    height: deviceWidth * 0.35,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#f2c1c1',
  },
  cameraBtn: {
    backgroundColor: 'grey',
    borderRadius: 50,
    padding: 8,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'lightgrey',
    padding: 30,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: 10,
    //width: "100%",
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: COLORS.red,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10,
  },
  cross: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  saveLocationButton: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{translateX: -50}], // Center horizontally
    backgroundColor: COLORS.red,
    padding: 10,
    borderRadius: 10,
  },

  saveLocationText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
