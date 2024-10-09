import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Modal,
  TextInput,
} from "react-native";
import WeekView, { WeekViewEvent } from "react-native-week-view";
import { useState, useRef, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { IP } from "../constants/ip";

import {
  createFixedWeekDate,
  generateColor,
  getMondayDate,
} from "../utils/schedulerHelpers";

import CourseEvent from "../components/CourseEvent";
import CourseSummary from "../components/CourseSummary";

interface Course {
  courseName: string;
  courseCode: string;
  section: string;
  location: string;
  instructor: string;
  description: string;
  days: string[];
  startTime: string;
  endTime: string;
  selected: boolean;
  id: number;
}

const Scheduler = () => {
  useEffect(() => {
    const getData = async () => {
      try {
        // await AsyncStorage.removeItem("events");
        const jsonValue = await AsyncStorage.getItem("events");
        let temp = JSON.parse(jsonValue || "[]");
        
        temp = temp.map((event: any) => {
          return {
            ...event,
            startDate: new Date(event.startDate),
            endDate: new Date(event.endDate),
          };
        });

        setEvents(temp);
        // console.log("events", temp);

        const res = await axios.get(`${IP}/course/get`);
        temp = res.data.courses.map((course: any) => {
          return {
            ...course,
            courseName: course.name,
            id: course._id,
            selected: false,
          };
        });
        setCourses(temp);
        setCourses((course) => {
          return course.map((course) => {
            const index = events.findIndex((event) => event.id === course.id);
            if (index !== -1) {
              return { ...course, selected: true };
            }
            return { ...course, selected: false };
          });
        });
      } catch (e) {
        console.log(e);
      }
    };

    const fetchCourses = async () => {
      try {
        // console.log("Courses", courses);
        // console.log("Events", events);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
    fetchCourses();
  }, []);

  const [courses, setCourses] = useState<Course[]>([]);

  // A reference object to the bottom sheet
  const sheetRef = useRef<BottomSheet>(null);
  // Heights of the bottom sheet
  const snapPoints = ["40%", "90%"];

  const [visible, setVisible] = useState(false);
  const [modal, setModal] = useState(false);

  const [events, setEvents] = useState<WeekViewEvent[]>([]);
  // Course details to display on bottom sheet
  const [selectedEvent, setSelectedEvent] = useState<WeekViewEvent | null>(
    null
  );
  // list of available course

  const date = new Date();
  const hour = date.getHours();

  return (
    // <PaperProvider>
    <View style={styles.container}>
      {/* The WeekView component is used to display a week */}
      <WeekView
        events={events} // list of courses
        fixedHorizontally={true} // since this is a timetable, we want to display only one week
        showTitle={false} // if true, shows this month and year on the top left
        numberOfDays={5} // number of days to display i.e. Monday to Friday
        formatDateHeader="ddd" // display short name days, e.g. Mon, Tue, etc
        pageStartAt={{ weekday: 1 }} // start week on mondays
        selectedDate={getMondayDate()} // need the current date to highlight the current day
        headerTextStyle={{
          color: "#808080",
          fontSize: 15,
          textTransform: "uppercase",
        }} // style for the days of the week
        hourTextStyle={{ color: "#808080", fontSize: 12 }} // style for the hours
        formatTimeLabel="hh A" // display hours in 12 hour format e.g. 01 PM, 02 PM, etc
        showNowLine={true} // show a horizontal in the column for the current day at the current time
        gridColumnStyle={{ borderColor: "#302B2B" }} // style for the vertical lines
        gridRowStyle={{ borderColor: "#302B2B" }} // style for the horizontal lines
        headerStyle={{ backgroundColor: "black" }} // style for the header
        startHour={hour - 1} // the hour to show at the start when the component is rendered
        hoursInDisplay={8} // number of hours to show in the display
        EventComponent={CourseEvent} // component to render for each course
        onEventPress={(event) => {
          setVisible(true);
          setSelectedEvent(event);
          sheetRef.current?.snapToIndex(0);
        }} // function to execute when a course is pressed
      />

      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints} // heights of the bottom sheet i.e. 40% and 90%
        enablePanDownToClose={true} // enable swipe down to close
        style={{
          zIndex: 1000,
          backgroundColor: "black",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

          elevation: 24,
        }} // style for the bottom sheet
        onClose={() => {
          setSelectedEvent(null);
          setVisible(false);
        }} // function to execute when the bottom sheet is closed
        index={-1} // initial index of the bottom sheet. -1 means closed
        handleIndicatorStyle={{ backgroundColor: "#35C2B0" }} // style for the small horizontal bar at the top of the bottom sheet
        backgroundStyle={{ backgroundColor: "black" }} // style for the background of the bottom sheet
      >
        {/* The BottomSheetView component is used to display the course details */}
        <BottomSheetView style={{ flex: 1, zIndex: 1000, padding: 20 }}>
          <Text style={{ color: "#ADADAD", fontSize: 20 }}>
            {selectedEvent?.courseName}
          </Text>
          <Text style={{ color: "#006FBF", fontSize: 15, marginVertical: 5 }}>
            {selectedEvent?.courseCode} - {selectedEvent?.section}
          </Text>
          <Text style={{ color: "#35C2C1", fontSize: 14, marginVertical: 5 }}>
            {selectedEvent?.days.join("")} {selectedEvent?.startTime} -{" "}
            {selectedEvent?.endTime}
          </Text>
          <Text style={{ color: "white", fontSize: 15, marginVertical: 5 }}>
            {selectedEvent?.instructor}
          </Text>
          <Text style={{ color: "white", fontSize: 15, marginVertical: 5 }}>
            {selectedEvent?.location}
          </Text>
          <Text style={{ color: "white", fontSize: 15, marginVertical: 5 }}>
            {selectedEvent?.description}
          </Text>
          <TouchableOpacity
            style={{
              alignSelf: "center",
              backgroundColor: "#414141",
              height: 50,
              width: 150,
              borderRadius: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              flexDirection: "row",
            }}
            onPress={() => {
              sheetRef.current?.close();
              setVisible(false);
              const temp = events.filter(
                (event) => event.id !== selectedEvent?.id
              );
              selectedEvent && setEvents(temp);
              // console.log("events after deletion", temp);

              const removeFromStore = async () => {
                try {
                  await AsyncStorage.setItem("events", JSON.stringify(temp));
                } catch (error) {
                  console.log(error);
                }
              };
              removeFromStore();
              setSelectedEvent(null);

              setCourses((course) => {
                return course.map((course) => {
                  if (course.id === selectedEvent?.id) {
                    return { ...course, selected: false };
                  }
                  return course;
                });
              });
            }}
          >
            <MaterialIcons name="delete-outline" size={25} color="red" />
            <Text style={{ color: "red", fontSize: 15 }}>Delete</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>

      {/* Floating plus button to add courses */}
      <TouchableOpacity
        style={{
          position: "absolute",
          width: 60,
          height: 60,
          borderRadius: 100,
          backgroundColor: "#35C2B0",
          bottom: 15,
          right: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: visible ? -1 : 1000,
        }}
        onPress={() => setModal(true)}
      >
        <MaterialIcons name="add" size={40} color="#fff" />
      </TouchableOpacity>

      <Modal
        transparent
        visible={modal}
        animationType="slide"
        onDismiss={() => setModal(false)}
      >
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            backgroundColor: "black",
            borderRadius: 5,
            // borderTopWidth: 1,
            // borderColor: "gray",
            height: "100%",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            paddingTop: 30,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 20,
              paddingHorizontal: 15,
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                flex: 1,
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Add Courses
            </Text>
            <TouchableOpacity onPress={() => setModal(false)}>
              <MaterialIcons name="close" size={25} color="#fff" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "90%",
              backgroundColor: "#292626",
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
              alignSelf: "center",
              display: "flex",
              flexDirection: "row",
              gap: 10,
              marginBottom: 15,
            }}
          >
            <MaterialIcons
              name="search"
              size={20}
              color="#414141"
              style={{ alignSelf: "center" }}
            />
            <TextInput
              placeholder="Search Courses"
              placeholderTextColor={"#414141"}
              style={{ fontSize: 13, color: "white", flex: 1 }}
            />
          </View>
          <FlatList
            data={courses}
            extraData={events}
            renderItem={({ item }) => (
              <CourseSummary
                id={item.id}
                courseCode={item.courseCode}
                courseName={item.courseName}
                section={item.section}
                location={item.location}
                instructor={item.instructor}
                description={item.description}
                days={item.days}
                startTime={item.startTime}
                endTime={item.endTime}
                setEvents={setEvents}
                events={events}
                selected={item.selected}
              />
            )}
          />
        </View>
      </Modal>
    </View>
    // </PaperProvider>
  );
};

export default Scheduler;

// styling for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E0E",
    alignItems: "center",
    color: "#fff",
    paddingHorizontal: 10,
    justifyContent: "flex-start",
    paddingLeft: 30,
  },
});
