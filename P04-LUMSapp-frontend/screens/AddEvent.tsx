import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
import { IP } from "../constants/ip";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAppSelector } from "../redux/hooks";
import { getFullMonth, amToPm, minutePadding } from "../utils/eventHelpers";
import Loader from "../components/Loader";

type Location = {
  label: string;
  value: string;
};

const AddEvent = ({ navigation }: any) => {
  const { tags, loading } = useAppSelector((state: any) => state.events);

  const [venue, setVenue] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();
  const [description, setDescription] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);

  const [open, setOpen] = useState<boolean>(false);
  const [open2, setOpen2] = useState<boolean>(false);
  const [showStartDate, setShowStartDate] = useState<boolean>(false);
  const [showStartTime, setShowStartTime] = useState<boolean>(false);
  const [showEndDate, setShowEndDate] = useState<boolean>(false);
  const [showEndTime, setShowEndTime] = useState<boolean>(false);

  const [submitting, setSubmitting] = useState<boolean>(false);

  const createEvent = async () => {
    try {
      if (
        !title ||
        !venue ||
        !startDate ||
        !endDate ||
        !startTime ||
        !endTime ||
        !description
      ) {
        Alert.alert("Please fill all the fields");
        return;
      }

      const startDateAndTime = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        startTime.getHours(),
        startTime.getMinutes()
      );

      const endDateAndTime = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
        endTime.getHours(),
        endTime.getMinutes()
      );

      setSubmitting(true);
      const { data } = await axios.post(`${IP}/event/create`, {
        title,
        location: venue,
        startTime: startDateAndTime,
        endTime: endDateAndTime,
        description,
      });
      setSubmitting(false);
      navigation.goBack();
      console.log(data);
    } catch (error: any) {
      setSubmitting(false);
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const { data } = await axios.get(`${IP}/location/get`);
        // setLocations(data.locations);
        setLocations(
          data.locations.map((location: any) => ({
            label: location.name,
            value: location.name,
          }))
        );
        console.log(data.locations);
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    };

    fetchLocations();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 25,
        paddingVertical: 20,
        gap: 10,
      }}
    >
      <View style={{ gap: 10 }}>
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Title
        </Text>
        <TextInput
          value={title}
          onChangeText={(text) => setTitle(text)}
          placeholder="Event Title"
          placeholderTextColor={"#414141"}
          style={{
            alignSelf: "center",
            width: "100%",
            color: "white",
            padding: 10,
            borderRadius: 10,
            backgroundColor: "#111111",
            fontSize: 14,
          }}
        />
      </View>

      <View style={{ gap: 10 }}>
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Venue
        </Text>
        <DropDownPicker
          items={locations}
          open={open}
          setOpen={setOpen}
          value={venue}
          setValue={setVenue}
          placeholder="Select Venue"
          placeholderStyle={{ color: "#414141", fontSize: 14 }}
          style={{
            backgroundColor: "#111111",
            borderRadius: 10,
          }}
          dropDownContainerStyle={{
            backgroundColor: "#111111",
            borderRadius: 10,
          }}
          labelStyle={{ color: "white" }}
          textStyle={{ color: "white" }}
          showArrowIcon={true}
          onChangeValue={(value) => {
            console.log(value);
          }}
        />
      </View>

      {/* <View style={{ gap: 10 }}>
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Category
        </Text>
        <DropDownPicker
          items={locations}
          open={open2}
          setOpen={setOpen2}
          value={venue}
          setValue={setVenue}
          placeholder="Select Venue"
          placeholderStyle={{ color: "#414141", fontSize: 14 }}
          style={{
            backgroundColor: "#111111",
            borderRadius: 10,
          }}
          dropDownContainerStyle={{
            backgroundColor: "#111111",
            borderRadius: 10,
          }}
          labelStyle={{ color: "white" }}
          textStyle={{ color: "white" }}
          showArrowIcon={true}
          onChangeValue={(value) => {
            console.log(value);
          }}
        />
      </View> */}

      <View style={{ gap: 10 }}>
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Starts At
          {/* <Text style={{ color: "#35C2C1" }}>*</Text> */}
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 20,
          }}
        >
          {showStartDate && (
            <DateTimePicker
              value={new Date()}
              display="default"
              mode="date"
              onChange={(event, selectedDate) => {
                console.log(selectedDate);
                setStartDate(selectedDate);
                setShowStartDate(false);
              }}
            />
          )}
          {showStartTime && (
            <DateTimePicker
              value={new Date()}
              display="default"
              mode="time"
              onChange={(event, selectedDate) => {
                console.log(selectedDate);
                setStartTime(selectedDate);
                setShowStartTime(false);
              }}
            />
          )}
          <TouchableOpacity
            onPress={() => setShowStartDate(true)}
            style={{
              backgroundColor: "#111111",
              borderRadius: 10,
              padding: 10,
              //   width: "100%",
              flex: 1,
            }}
          >
            <Text style={{ color: "#35C2C1", fontSize: 14 }}>
              {startDate
                ? `${startDate.getDate()} ${getFullMonth(
                    startDate.getMonth()
                  )} ${startDate.getFullYear()}`
                : "Select Date"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowStartTime(true)}
            style={{
              backgroundColor: "#35C2C1",
              borderRadius: 10,
              padding: 10,
              //   width: "100%",
              flex: 1,
            }}
          >
            <Text style={{ color: "#111111", fontSize: 14 }}>
              {startTime
                ? `${amToPm(startTime.getHours()).hour}:${minutePadding(
                    startTime.getMinutes()
                  )} ${amToPm(startTime.getHours()).period}`
                : "Select Time"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ gap: 10 }}>
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Ends At
          {/* <Text style={{ color: "#35C2C1" }}>*</Text> */}
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 20,
          }}
        >
          {showEndDate && (
            <DateTimePicker
              value={new Date()}
              display="default"
              mode="date"
              onChange={(event, selectedDate) => {
                console.log(selectedDate);
                setEndDate(selectedDate);
                setShowEndDate(false);
              }}
            />
          )}
          {showEndTime && (
            <DateTimePicker
              value={new Date()}
              display="default"
              mode="time"
              onChange={(event, selectedDate) => {
                console.log(selectedDate);
                setShowEndTime(false);
                setEndTime(selectedDate);
              }}
            />
          )}
          <TouchableOpacity
            onPress={() => setShowEndDate(true)}
            style={{
              backgroundColor: "#111111",
              borderRadius: 10,
              padding: 10,
              //   width: "100%",
              flex: 1,
            }}
          >
            <Text style={{ color: "#35C2C1", fontSize: 14 }}>
              {endDate
                ? `${endDate.getDate()} ${getFullMonth(
                    endDate.getMonth()
                  )} ${endDate.getFullYear()}`
                : "Select Date"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowEndTime(true)}
            style={{
              backgroundColor: "#35C2C1",
              borderRadius: 10,
              padding: 10,
              flex: 1,
            }}
          >
            <Text style={{ color: "#111111", fontSize: 14 }}>
              {endTime
                ? `${amToPm(endTime.getHours()).hour}:${minutePadding(
                    endTime.getMinutes()
                  )} ${amToPm(endTime.getHours()).period}`
                : "Select Time"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ gap: 10 }}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
          Description
          {/* <Text style={{ color: "#35C2C1" }}>*</Text> */}
        </Text>
        <TextInput
          style={{
            backgroundColor: "#111111",
            borderRadius: 10,
            padding: 10,
            color: "white",
            fontSize: 14,
            height: 150,
            textAlignVertical: "top",
            flexGrow: 1,
          }}
          textAlign="left"
          multiline
          value={description}
          onChangeText={(text) => setDescription(text)}
          placeholder="Event Description"
          placeholderTextColor={"#414141"}
        />
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#35C2C1",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
        onPress={() => {
          console.log("Done");
          createEvent();
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Done</Text>
      </TouchableOpacity>
      {submitting && <Loader />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    color: "#ffffff",
  },
});

export default AddEvent;
