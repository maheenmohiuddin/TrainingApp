import { useEffect, useState } from "react";
import {
  browserLocalPersistence,
  initializeAuth,
  onAuthStateChanged,
  setPersistence,
  getReactNativePersistence,
} from "firebase/auth";
import { auth, db, app } from "../firebase"; // Ensure you have configured Firebase
import { doc, getDoc } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { setValue } from "../utills/asyncStorage";

export default function useAuth() {
  const [user, setUser] = useState(null);
  //const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      console.log("user in useAuth: ", user);
      setUser(user);
      // if (user) {
      //   const docRef = doc(db, "Users", user.uid);
      //   const docSnap = await getDoc(docRef);
      //   console.log("doc-snap  :", docSnap.data());

      //   if (docSnap.exists()) {
      //     setUser(user);
      //     setUserDetails(docSnap.data());

      //   }
      // } else {
      //   setUser(null);
      //   setUserDetails(null);
      // }
    });

    return () => unsub();
  }, []);

  return { user };
}
