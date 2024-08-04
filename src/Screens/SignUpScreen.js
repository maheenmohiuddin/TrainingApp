import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { COLORS } from "../utills/Constants";
import { setValue } from "../utills/asyncStorage";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    if (email && password) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        user.displayName = fullName;
        await updateProfile(user, {
          displayName: fullName,
        });
        console.log("current user: ", user);
      
        setError(null);
        setLoading(false);
      
      } catch (error) {
        setLoading(false);
    
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/wrong-password"
      ) {
        setError("Your email or password was incorrect");
      }
        else if (error.code === "auth/email-already-in-use") {
        setError("An account with this email already exists");
      }
        else {
        setError(`There was a problem with your request: ${error.message}`);
      }
        console.log("error: ", error);
      }
      
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator
          size="large"
          color={COLORS.red}
          style={{ marginBottom: 20 }}
        />
      )}
      <Text style={styles.heading}>Sign UP</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.inputView}>
        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
          style={styles.input}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          style={styles.input}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.signupBtn} onPress={handleSignUp}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => navigation.navigate("login")}>
        Already have an account? Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 40,
    color: COLORS.red,
    marginBottom: 50,
  },
  error: {
    marginBottom: 20,
    color: "red",
  },
  inputView: {
    width: "80%",
    backgroundColor: COLORS.lightred,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 50,
    placeholderTextColor: COLORS.background,
    color: COLORS.background,
  },
  signupBtn: {
    width: "80%",
    backgroundColor: COLORS.red,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 10,
  },
  signupText: {
    color: "white",
  },
  link: {
    marginTop: 10,
    textAlign: "center",
    color: "white",
  },
});
