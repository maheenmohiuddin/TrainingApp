// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE0KQKfulRyqx_AD7lcfhBIifR6QJx0o0",
  authDomain: "movie-app-9226b.firebaseapp.com",
  projectId: "movie-app-9226b",
  storageBucket: "movie-app-9226b.appspot.com",
  messagingSenderId: "1088594068277",
  appId: "1:1088594068277:web:3590177b1d90fc0f9f027c",
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app)

export const auth = initializeAuth(app, {
  // Initialize Firebase Auth with AsyncStorage persistence
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);