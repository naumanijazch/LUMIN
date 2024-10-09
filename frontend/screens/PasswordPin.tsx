import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import axios from "axios";
import { IP } from "../constants/ip";
import Loader from "../components/Loader";
import Otp from "../components/Otp";
import { useAppDispatch } from "../redux/hooks";

const email = "email@lums.edu.pk";

const PasswordPin = ({ navigation }: any) => {
  // const [timerCount, setTimer] = useState(120);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const lumsLogo = require("../assets/Lums.png");

  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    const otp = code.join("");
    try {
      setLoading(true);
      const { data } = await axios.post(`${IP}/user/verify`, {
        otp,
      });
      setLoading(false);
      if (data.success) {
        dispatch({ type: "otpSuccess", payload: data.user });
      }
    } catch (error) {
      setLoading(false);
      console.log("Error in handleSubmit: ", error);
    }

    // const otp = code.join("");
    // dispatch(verifyOtp(otp));
  };

  return (
    <View style={styles.container}>
      <Image source={lumsLogo} style={{ width: 150, height: 150 }} />
      <Text style={styles.centerText}>Enter PIN</Text>

      <Text style={styles.emailText}>
        Please enter the 6-character alphanumeric PIN sent to{" "}
        <Text style={{ textDecorationLine: "underline", color: "lightgrey" }}>
          {email}
        </Text>
      </Text>

      <Otp length={6} code={code} setCode={setCode} />

      <TouchableOpacity style={styles.signupButton} onPress={handleSubmit}>
        <Text style={{ fontWeight: "bold" }}>Submit</Text>
      </TouchableOpacity>

      {loading && <Loader />}
    </View>
  );
};

export default PasswordPin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: "30%",
  },
  centerText: {
    color: "#35C2C1",
    fontSize: 36,
    marginBottom: "5%",
  },
  emailText: {
    color: "grey",
    // marginTop: 10,
    // alignSelf: "center",
    marginBottom: "10%",
    textAlign: "center",
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
});
