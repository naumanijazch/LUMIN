import { View, Text, Image, StyleSheet } from "react-native";
import { Event } from "../types/eventtypes";
import { amToPm, minutePadding } from "../utils/eventHelpers";

const EventDetails = ({
  title,
  postedById,
  postedByName,
  startTime,
  endTime,
  locationName,
  description,
  image,
  category,
}: Event) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  startTime = new Date(startTime);
  endTime = new Date(endTime);
  const parsedStartTime = amToPm(startTime.getHours());
  const parsedEndTime = amToPm(endTime.getHours());

  return (
    <View style={styles.container}>
      <View style={{ borderRightWidth: 1, borderColor: "#2B2B2B" }}>
        <Image
          source={{
            uri: image.url ? image.url : "https://picsum.photos/201",
          }}
          style={{
            width: 110,
            height: 114,
          }}
          resizeMode="cover"
        />
      </View>

      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
          marginHorizontal: 10,
          flex: 1,
          marginVertical: 5,
        }}
      >
        <View>
          <Text
            style={{
              color: "white",
              fontSize: 15,
              fontWeight: "bold",
            }}
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: "white",
              fontSize: 9,
            }}
          >
            {postedByName}
          </Text>
        </View>
        <View>
          <Text
            numberOfLines={1}
            style={{
              color: "#35C2B0",
              fontWeight: "bold",
            }}
          >
            {locationName}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: "#35C2B0",
              fontSize: 12,
            }}
          >
            {startTime.getDate()} {months[startTime.getMonth()]}{" "}
            {startTime.getFullYear()}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: "#35C2B0",
              fontSize: 12,
            }}
          >
            {parsedStartTime.hour}:{minutePadding(startTime.getMinutes())}{" "}
            {parsedStartTime.period} - {parsedEndTime.hour}:
            {minutePadding(endTime.getMinutes())} {parsedEndTime.period}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 3,
    height: 120,
    borderColor: "#2B2B2B",
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#0E0E0E",
    overflow: "hidden",
  },
});

export default EventDetails;
