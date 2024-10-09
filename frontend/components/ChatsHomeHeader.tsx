import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";

const ChatsHomeHeader = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <View style={styles.container}>
      <Ionicons
        name="chevron-back"
        size={24}
        color="white"
        style={styles.icon}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.heading}>Messages</Text>
    </View>
  );
};

export default ChatsHomeHeader;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    height: "10%",
  },
  heading: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  icon: {
    position: "absolute",
    left: 20,
  },
});
