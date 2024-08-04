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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { COLORS } from "../utills/Constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { setValue } from "../utills/asyncStorage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hidePassword, sethidePassword] = useState(true);

  const handleLogin = async () => {
    setLoading(true);
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      
        setError(null);
        setLoading(false);
      } catch (error) {
      
        setLoading(false);
        if (
          error.code === "auth/invalid-email" ||
          error.code === "auth/wrong-password"
        ) {
          setError("Your email or password was incorrect");
        } else if (error.code === "auth/email-already-in-use") {
          setError("An account with this email already exists");
        } else {
          setError("There was a problem with your request");
        }
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
      <Text style={styles.logo}>MovieAPP</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry={hidePassword}
          style={styles.inputText}
          placeholder="Password..."
          ovalue={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          onPress={() => sethidePassword(!hidePassword)}
          style={styles.eyeIcon}
        >
          <MaterialCommunityIcons
            name={hidePassword ? "eye-off" : "eye"}
            size={25}
            color={COLORS.baseColor}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("signup")}>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>
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
  eyeIcon: {
    right: 15,
    position: "absolute",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: COLORS.red,
    marginBottom: 40,
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
  inputText: {
    height: 50,
    placeholderTextColor: COLORS.background,
    color: COLORS.background,
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  error: {
    marginBottom: 20,
    color: "red",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: COLORS.red,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
    padding:10,
  },
});
