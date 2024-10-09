import {
    FlatList,
    View,
    ImageBackground,
    Text,
    TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { convertTo12HourFormat } from "../utils/timeUtil";
import { Event } from "../types/eventtypes";
import { useNavigation } from "@react-navigation/native";

const filterEventsOnCurrentDay = (events: Event[]) => {
    // Get the current date without the time portion
    const currentDate = new Date().toISOString().split("T")[0];

    // Filter events with startTime on the current day
    const filteredEvents = events.filter((event: Event) => {
        // Get the date portion of the startTime
        const eventDate = event.startTime.split("T")[0];
        return eventDate === currentDate;
    });

    return filteredEvents;
};

const EventNotifications = (props: any) => {
    const navigation = useNavigation();
    const events_today = filterEventsOnCurrentDay(props.events);
    return (
        <FlatList
            style={{
                width: "100%",
            }}
            data={events_today}
            onRefresh={() => {
                props.setEventRefresh(true);
            }}
            refreshing={props.eventRefresh}
            ListFooterComponent={() =>
                events_today.length > 0 ? null : (
                    <Text
                        style={{
                            color: "grey",
                            width: "100%",
                            textAlign: "center",
                            paddingVertical: "25%",
                            fontSize: 18,
                        }}
                    >
                        Nothing to show
                    </Text>
                )
            }
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("SpecificEvent", {
                            event: item,
                        });
                    }}
                    onLongPress={() => {}}
                    activeOpacity={0.7}
                >
                    <ImageBackground
                        source={{
                            uri: item.image.url
                                ? item.image.url
                                : "https://picsum.photos/203",
                        }}
                        resizeMode="cover"
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginVertical: 4,
                        }}
                        imageStyle={{
                            borderRadius: 12,
                        }}
                    >
                        <LinearGradient
                            colors={[
                                "transparent",
                                "rgba(25,40,47,0.3)",
                                "rgba(25,40,47,0.6)",
                                "rgba(25,40,47,0.9)",
                                "rgba(25,40,47,1)",
                                "rgba(25,40,47,1)",
                                "rgba(25,40,47,1)",
                            ]}
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                paddingVertical: 8,
                                paddingHorizontal: 4,
                                borderRadius: 12,
                            }}
                            end={{ x: 1, y: 0 }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text
                                    style={{
                                        color: "white",
                                        paddingHorizontal: 10,
                                        width: "50%",
                                        fontWeight: "bold",
                                        fontSize: 16,
                                        textShadowColor: "rgba(0, 0, 0, 0.75)",
                                        textShadowOffset: {
                                            width: -1,
                                            height: 1,
                                        },
                                        textShadowRadius: 10,
                                    }}
                                >
                                    {item.title}
                                </Text>
                                <View
                                    style={{
                                        alignItems: "flex-end",
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "white",
                                            paddingHorizontal: 10,
                                            fontWeight: "bold",
                                            fontSize: 14,
                                        }}
                                    >
                                        {item.description.length > 20
                                            ? item.description.substring(
                                                  0,
                                                  20
                                              ) + "..."
                                            : item.description}
                                    </Text>
                                    <Text
                                        style={{
                                            color: "#C4C4C4",
                                            paddingHorizontal: 10,
                                        }}
                                    >
                                        {item.locationName}
                                    </Text>
                                    <Text
                                        style={{
                                            color: "#35C2C1",
                                            paddingHorizontal: 10,
                                        }}
                                    >
                                        {convertTo12HourFormat(item.startTime)}{" "}
                                        - {convertTo12HourFormat(item.endTime)}
                                    </Text>
                                </View>
                            </View>
                        </LinearGradient>
                    </ImageBackground>
                </TouchableOpacity>
            )}
        ></FlatList>
    );
};

export default EventNotifications;
