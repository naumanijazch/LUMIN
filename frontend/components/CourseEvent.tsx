import { View, Text } from "react-native";
import { EventComponentProps } from "react-native-week-view";

const CourseEvent = ({ event }: EventComponentProps) => {
  return (
    <View
      style={{
        flex: 1,
        marginTop: 5,
        paddingHorizontal: 4,
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 11,
            textAlign: "center",
          }}
        >
          {event.courseCode}
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 11,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {event.section}
        </Text>
      </View>
      <Text
        style={{
          color: "white",
          fontSize: 9,
          textAlign: "center",
          marginBottom: 5,
        }}
      >
        {event.location}
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 9,
          textAlign: "center",
          marginBottom: 5,
        }}
      >
        {event.instructor}
      </Text>
    </View>
  );
};

export default CourseEvent;
