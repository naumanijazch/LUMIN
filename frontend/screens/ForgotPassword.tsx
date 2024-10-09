import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { IP } from "../constants/ip";

const ForgotPassword = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const lumsLogo = require("../assets/Lums.png");

  const handleSubmit = async () => {
    try {
      if (email === "") {
        alert("Please enter email");
        return;
      }

      const { data } = await axios.post(`${IP}/user/forgot`, {
        email,
      });
    } catch (error) {
      console.log("Error in handleSubmit: ", error);
    }
  };

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
        Forgot Password
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="email-address"
        placeholder="Email"
        placeholderTextColor="#757575"
        onChangeText={(text) => setEmail(text)}
      />

      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => {
          navigation.navigate("PasswordPin");
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;

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
});
