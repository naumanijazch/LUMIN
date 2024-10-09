import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { amToPm, minutePadding, getMonth } from "../utils/eventHelpers";

const SpecificEvent = ({ route, navigation }: any) => {
  //   console.log(route.params.event.title);

  const startTime = new Date(route.params.event.startTime);
  const endTime = new Date(route.params.event.endTime);

  const parsedStartTime = amToPm(startTime.getHours());
  const parsedEndTime = amToPm(endTime.getHours());

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 2,
          backgroundColor: "rgba(0,0,0,0.6)",
          padding: 5,
          borderRadius: 100,
        }}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="close" size={25} color="white" />
      </TouchableOpacity>

      <View style={{ height: "45%", width: "100%", marginBottom: 10 }}>
        <ImageBackground
          source={{
            uri: route.params.event.image.url
              ? route.params.event.image.url
              : "https://picsum.photos/201",
          }}
          style={{
            height: "100%",
            width: "100%",
          }}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,1.0)"]}
            style={styles.linearGradient}
          />
          <View style={styles.fontContainer}>
            <Text style={styles.titleFont}>{route.params.event.title}</Text>
          </View>
        </ImageBackground>
      </View>

      <ScrollView
        style={{
          backgroundColor: "#000000",
        }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
            // borderWidth: 1,
            // borderColor: "red",
          }}
        >
          <View style={{ flex: 1 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 20,
              }}
            >
              <View style={{ flex: 1, marginBottom: 10 }}>
                <Text
                  style={{
                    color: "#868686",
                    marginBottom: 10,
                    fontSize: 11,
                  }}
                >
                  HOSTED BY
                </Text>
                <View style={styles.detailsContainer}>
                  <Text
                    style={{
                      color: "#E6E6E6",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    {route.params.event.postedBy.fullname}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: "#868686",
                    marginBottom: 10,
                    fontSize: 11,
                  }}
                >
                  VENUE
                </Text>
                <View style={styles.detailsContainer}>
                  <Text
                    style={{
                      color: "#E6E6E6",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    {route.params.event.locationName}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 20,
                // borderWidth: 1,
                // borderColor: "blue",
              }}
            >
              <View style={{ flex: 1, marginBottom: 10 }}>
                <Text
                  style={{
                    color: "#868686",
                    marginBottom: 10,
                    fontSize: 11,
                  }}
                >
                  STARTS AT
                </Text>
                <View style={styles.detailsContainer}>
                  <Text
                    style={{
                      color: "#E6E6E6",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    {parsedStartTime.hour}:
                    {minutePadding(startTime.getMinutes())}{" "}
                    {parsedStartTime.period}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: "#868686",
                    marginBottom: 10,
                    fontSize: 11,
                  }}
                >
                  ENDS AT
                </Text>
                <View style={styles.detailsContainer}>
                  <Text
                    style={{
                      color: "#E6E6E6",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    {parsedEndTime.hour}:{minutePadding(endTime.getMinutes())}{" "}
                    {parsedEndTime.period}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View>
            <LinearGradient
              colors={["rgb(53,187,194)", "rgb(15,65,64)"]}
              start={[0, 1]}
              end={[1, 0]}
              style={{
                width: 70,
                height: 70,
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "space-around",
                paddingVertical: 5,
                // paddingHorizontal: 20,
              }}
            >
              <Text
                style={{
                  color: "#E6E6E6",
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  // fontWeight: "bold",
                }}
              >
                {getMonth(startTime.getMonth())}
              </Text>
              <Text
                style={{
                  color: "#E6E6E6",
                  fontSize: 20,
                  fontWeight: "bold",
                  marginVertical: 5,
                }}
              >
                {startTime.getDate()}
              </Text>
              {/* <Text style={{ color: "#E6E6E6", letterSpacing: 2 }}>
              {route.params.event.date.split("/")[2]}
            </Text> */}
            </LinearGradient>
          </View>
        </View>

        <Text
          style={{
            color: "white",
            alignSelf: "flex-start",
            paddingHorizontal: 20,
            marginVertical: 20,
            lineHeight: 20,
            fontSize: 15,
          }}
        >
          {route.params.event.description}
        </Text>
        <TouchableOpacity
          style={{
            alignSelf: "center",
            backgroundColor: "#35C2C1",
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 40,
            paddingVertical: 15,
            flexDirection: "row",
            gap: 5,
            marginVertical: 20,
          }}
          onPress={() => {
            navigation.navigate("BottomTabs", {
              screen: "AllEvents",
              params: {
                screen: "Map",
                params: {
                  event: route.params.event,
                },
              },
            });
          }}
        >
          <MaterialIcons name="location-on" size={24} color="white" />
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            See On Map
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  titleFont: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  fontContainer: {
    position: "absolute",
    bottom: 10,
    left: 20,
    paddingRight: 20,
    zIndex: 2,
  },
  detailsContainer: {
    display: "flex",
    backgroundColor: "#111111",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SpecificEvent;
