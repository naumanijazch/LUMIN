import { View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import { ADD_POST_POSTER_NAME_COLOR, PRIMARY_COLOR } from "../constants/color";

const ChatHead = () => {
  return (
    <View style={styles.contianer}>
      <View style={styles.chatImage}>
        {/* Image and Name are One Element so we have a separate View(div) for them */}
        <Image
          style={{ width: 60, height: 60, borderRadius: 100 }}
          source={{
            uri: "https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg?auto=compress&cs=tinysrgb&w=600",
          }}
        />
      </View>
      <View style={styles.chatHeadBox}>
        <View style={styles.nameAndTime}>
          <Text style={styles.posterName}>Muneeb Akmal</Text>
          <Text style={{ color: "white" }}>5:30 PM</Text>
        </View>
        <View style={styles.msgAndNotification}>
          <Text style={{ color: "white" }}>Hey! How are you?</Text>
          <Text
            style={{
              color: "white",
              backgroundColor: PRIMARY_COLOR,
              borderRadius: 50,
              width: 23,
              height: 23,
              textAlign: "center",
            }}
          >
            2
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ChatHead;

const styles = StyleSheet.create({
  contianer: {
    display: "flex",
    backgroundColor: "black",
    alignItems: "center",
    flexDirection: "row",
    height: "12%",
    width: "100%",
    paddingBottom: "2%",
    borderBottomWidth: 0.2,
    borderBottomColor: "rgba(255, 255, 255, 0.4)",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  chatImage: {
    height: "100%",
    padding: 5,
  },
  posterName: {
    color: ADD_POST_POSTER_NAME_COLOR,
    fontWeight: "bold",
    fontSize: 16,
  },
  chatHeadBox: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingRight: 8,
    paddingLeft: 3,
    paddingVertical: 5,
  },
  nameAndTime: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  msgAndNotification: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
