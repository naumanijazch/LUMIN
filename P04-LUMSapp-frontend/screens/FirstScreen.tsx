import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/Backdrop.png")}
        style={styles.backgroundImage}
      >
        {/* App Logo */}
        <Image source={require("../assets/LumsIcon.png")} style={styles.logo} />

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton}>
            <Text
              style={[styles.buttonText, styles.loginButtonText]}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerButton}>
            <Text style={[styles.buttonText, styles.registerButtonText]}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "flex-end",
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: "#35C2C1",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold"
  },
  registerButtonText: {
    color: "white",
    fontWeight: "normal",
  },
});

export default Home;
