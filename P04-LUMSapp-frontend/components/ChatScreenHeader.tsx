import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "../constants/color";
import { stat } from "fs";
const ChatScreenHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.chatImage}>
        {/* Image and Name are One Element so we have a separate View(div) for them */}
        <Image
          style={{ width: 60, height: 60, borderRadius: 100 }}
          source={{
            uri: "https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg?auto=compress&cs=tinysrgb&w=600",
          }}
        />
      </View>
      <View style={styles.details}>
        <Text style={{ color: "white", fontSize: 20 }}>Muneeb Akmal</Text>
        <View style={styles.status}>
          <FontAwesome name="circle" size={10} color={PRIMARY_COLOR} />
          <Text style={{ color: "white" }}>Active Now</Text>
        </View>
      </View>
      <View style={styles.headerIcons}>
        <Ionicons name="call-outline" size={24} color="white" />
        <Ionicons name="videocam-outline" size={24} color="white" />
      </View>
    </View>
  );
};

export default ChatScreenHeader;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "black",
    alignItems: "center",
    flexDirection: "row",
    height: "12%",
    width: "100%",
    paddingBottom: "2%",
    borderBottomWidth: 0.2,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
  },
  chatImage: {
    height: "100%",
    padding: 5,
  },
  details: {
    marginLeft: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  headerIcons: {
    display: "flex",
    position: "absolute",
    right: 15,
    gap: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  status: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
