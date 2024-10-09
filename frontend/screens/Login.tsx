import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useFonts } from "expo-font";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { login } from "../redux/action";

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const outlookImage = require("../assets/outlook_image.png");
  const lumsLogo = require("../assets/Lums.png");

  const { error } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const loginHandler = () => {
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch({ type: "clearError" });
    }
  }, [error, dispatch, alert]);

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
        Login
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
        placeholder="Password"
        placeholderTextColor="#757575"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <TouchableOpacity style={styles.signupButton} onPress={loginHandler}>
        <Text style={{ fontWeight: "bold" }}>Login</Text>
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
        Don't have an account?{" "}
        <Text
          style={{ color: "#35C2C1", fontWeight: "bold" }}
          onPress={() => navigation.navigate("Signup")}
        >
          Sign Up
        </Text>
      </Text>
      <Text
        style={{ color: "#35C2C1", fontWeight: "bold", padding: 10 }}
        onPress={() => {
          navigation.navigate("ForgotPassword");
        }}
      >
        Forgot Password?
      </Text>
    </View>
  );
};

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
    marginTop: "20%",
    backgroundColor: "#35C2C1",
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
  logo: {
    width: 30,
    height: 20,
  },
});

export default Login;
