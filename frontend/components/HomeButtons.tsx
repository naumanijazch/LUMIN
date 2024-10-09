//COLOR DONE
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import {
  HOME_ICON_BCKG_COLOR,
  HOME_ICON_COLOR,
  HOME_ICON_TEXT_COLOR,
} from "../constants/color";

interface HomeButtonsProps {
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap | keyof typeof FontAwesome.glyphMap;
}

const HomeButtons = ({ name, icon }: HomeButtonsProps) => {
  return (
    // <View style={styles.container}>
    <View
      style={{
        display: "flex",
        alignItems: "center",
        height: 120,
        width: 120,
        padding: 0,
        marginVertical: 10,
        // flex: 1,
        backgroundColor: HOME_ICON_BCKG_COLOR,
        // padding: 20,
        borderRadius: 20,
        // alignItems: "center",
        justifyContent: "center",
        // shadowColor: "#2B2B2B",
        // shadowOffset: {
        //   width: 0,
        //   height: 5,
        // },
        // shadowOpacity: 0.36,
        // shadowRadius: 6.68,

        // elevation: 11,
      }}
    >
      <MaterialIcons
        name={icon}
        size={70}
        color={name == "Coming Soon" ? "#505050" : HOME_ICON_COLOR}
      />
      {/* <Text
        style={{
          color: name == "Coming Soon" ? "#505050" : HOME_ICON_TEXT_COLOR,
          marginTop: 5,
          textAlign: "center",
        }}
      >
        {name}
      </Text> */}
    </View>
    // </View>
  );
};

export default HomeButtons;

const styles = StyleSheet.create({
  container: {},
});
