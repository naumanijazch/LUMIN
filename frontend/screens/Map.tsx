import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import mapStyle from "../utils/mapStyling";
import { useEffect, useRef } from "react";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppSelector } from "../redux/hooks";
import EventDetails from "../components/EventDetails";

const Map = ({ route, navigation }: any) => {
  const { events } = useAppSelector((state) => state.events);

  const mapRef = useRef<any>(null);

  const INITIAL_REGION = {
    latitude: 31.469897268732343,
    longitude: 74.4094203493857,
    latitudeDelta: 0.001,
    longitudeDelta: 0.003,
  };

  if (route.params?.event && mapRef.current) {
    // console.log(route.params.event);

    const { coordinates } = route.params.event;
    const eventLocation = {
      latitude: coordinates[0],
      longitude: coordinates[1],
      latitudeDelta: 0.001,
      longitudeDelta: 0.003,
    };

    mapRef?.current.animateToRegion(eventLocation, 1000);
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      } else if (status === "granted") {
        // await Location.requestBackgroundPermissionsAsync();
        console.log("Permission to access location was granted");
        return;
      }
    })();
  });

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
        loadingEnabled
        loadingBackgroundColor="#0E0E0E"
        customMapStyle={mapStyle}
        ref={mapRef}
        showsBuildings
        userInterfaceStyle="dark"
      >
        {events.map((event: any, index: number) => (
          <Marker
            key={index}
            coordinate={{
              latitude: event.coordinates[0],
              longitude: event.coordinates[1],
            }}
            pinColor="#35C2C1"
          >
            <Callout
              tooltip
              onPress={() => {
                navigation.navigate("SpecificEvent", { event });
              }}
              style={{
                width: 200,
                height: 100,
                backgroundColor: "#0E0E0E",
                borderRadius: 50,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 200,
                  height: 100,
                  backgroundColor: "#0E0E0E",
                  borderRadius: 10,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                  numberOfLines={1}
                >
                  {event.title}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    color: "white",
                    fontSize: 9,
                  }}
                >
                  {event.postedBy.fullname}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 10,
          left: 15,
          zIndex: 2,
          backgroundColor: "#000000",
          padding: 9,
          borderRadius: 100,
        }}
        onPress={() => {
          mapRef?.current.animateToRegion(INITIAL_REGION, 1000);
        }}
      >
        <Image
          source={require("../assets/Lums.png")}
          style={{
            width: 30,
            height: 30,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

// styling for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E0E",
    alignItems: "center",
  },
});

export default Map;
