import { View, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";

const Loader = () => {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator animating={true} size="large" color="#35C2B0" />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
});

export default Loader;
