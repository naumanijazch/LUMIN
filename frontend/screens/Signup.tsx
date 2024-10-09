import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useFonts } from "expo-font";
import { useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import { IP } from "../constants/ip";

const outlookImage = require("../assets/outlook_image.png");
const lumsLogo = require("../assets/Lums.png");

const Signup = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signupHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${IP}/user/signup`, {
        name: fullname,
        email,
        password,
      });

      setLoading(false);
      if (data.success) {
        navigation.navigate("PIN");
      }
    } catch (error: any) {
      console.log("Error in signupHandler: ", error);
      setLoading(false);
      alert(error.response.data.message);
    }

    // dispatch(signup(fullname, email, password));
  };

  // useEffect(() => {
  //   if (isSignedUp) {
  //     navigation.navigate("PIN");
  //   }
  // }, [isSignedUp, navigation]);

  // useEffect(() => {
  //   if (error) {
  //     alert(error);
  //     dispatch({ type: "clearError" });
  //   }
  // }, [error, dispatch, alert]);

  return (
    <View style={styles.container}>
      <Image source={lumsLogo} style={{ width: 150, height: 150 }} />
      <Text
        style={{
          color: "white",
          fontSize: 24,
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        Sign Up
      </Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        placeholder="Email"
        placeholderTextColor="#757575"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#757575"
        onChangeText={(text) => setFullname(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#757575"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.signupButton} onPress={signupHandler}>
        <Text style={{ fontWeight: "bold" }}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.divBar}>or</Text>
        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity style={styles.outlookButton}>
        <Image source={outlookImage} style={styles.logo} />
        <Text style={{ paddingLeft: 10, color: "#fff", fontWeight: "bold" }}>
          Outlook
        </Text>
      </TouchableOpacity>

      <Text style={{ color: "#fff", marginTop: 20 }}>
        Already have an account?{" "}
        <Text
          style={{ color: "#35C2C1", fontWeight: "bold" }}
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </Text>
      </Text>

      {loading && <Loader />}
      {/* <StatusBar style="auto" /> */}
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "#35C2C1",
    width: "80%",
    borderBottomWidth: 1,
    borderRadius: 10,
    marginTop: "2%",
    padding: 15,
    color: "#fff",
  },
  signupButton: {
    marginTop: "10%",
    backgroundColor: "#35C2C1",
    borderRadius: 10,
    width: "80%",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  outlookButton: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#146987",
    borderRadius: 10,
    width: "80%",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "5%",
    width: "80%",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#35C2C1",
  },
  divBar: {
    color: "#fff",
    fontSize: 12,
    paddingHorizontal: 10,
  },
  logo: {
    width: 30,
    height: 20,
  },
});
