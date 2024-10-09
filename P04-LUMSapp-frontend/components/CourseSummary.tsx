import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { WeekViewEvent } from "react-native-week-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateEvent } from "../utils/schedulerHelpers";
import { useState } from "react";

export type CourseSummaryProps = {
  id: number;
  courseCode: string;
  courseName: string;
  section: string;
  location: string;
  instructor: string;
  description: string;
  days: string[];
  startTime: string;
  endTime: string;
  selected: boolean;
  setEvents: React.Dispatch<React.SetStateAction<WeekViewEvent[]>>;
  events: WeekViewEvent[];
};

const CourseSummary = (item: CourseSummaryProps) => {
  const [selected, setSelected] = useState(item.selected);

  const removeEvent = (i: CourseSummaryProps) => {
    item.setEvents((events) => events.filter((event) => event.id !== i.id));
    try {
      AsyncStorage.setItem(
        "events",
        JSON.stringify(item.events.filter((event) => event.id !== i.id))
      );
      setSelected(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addEvent = (i: CourseSummaryProps) => {
    item.setEvents((events) => events.concat(generateEvent(item)));

    try {
      AsyncStorage.setItem(
        "events",
        JSON.stringify(item.events.concat(generateEvent(item)))
      );
      setSelected(true);
      // console.log(
      //   "events saved",
      //   item.events.concat(generateEvent(item))
      // );
    } catch (error) {
      console.log(error);
    }
  };

  //   console.log(item.selected);
  return (
    <View
      style={{
        width: "90%",
        backgroundColor: "#111111",
        marginBottom: 10,
        alignSelf: "center",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        borderRadius: 10,
        // gap: 10,
      }}
    >
      <View style={{ width: "85%" }}>
        <Text style={{ color: "#ADADAD", fontSize: 16 }}>
          {item.courseCode}
          {"  "}|{"  "}
          {item.section}
        </Text>
        <Text
          style={{
            color: "#006FBF",
            fontSize: 15,
            marginBottom: 5,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {item.courseName}
        </Text>
        <Text style={{ color: "#35C2C1", fontSize: 14 }}>
          {item.days.join("")} {item.startTime} - {item.endTime}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          height: 40,
          width: 40,
          borderRadius: 100,
          backgroundColor: "#35C2B0",
          padding: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          selected ? removeEvent(item) : addEvent(item);
        }}
      >
        <AntDesign
          name={selected ? "minus" : "plus"}
          size={20}
          color="black"
          style={{ alignSelf: "center" }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CourseSummary;
