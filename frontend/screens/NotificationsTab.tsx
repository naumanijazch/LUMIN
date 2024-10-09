import {
    StyleSheet,
    SafeAreaView,
    Text,
    View,
    FlatList,
    ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import PostNotifications from "../components/PostNotifications";
import EventNotifications from "../components/EventNotifications";
import * as ExpoNotifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { getEvents } from "../redux/action";
import { IP } from "../constants/ip";
import axios from "axios";

let event_notifs = [
    {
        event_name: "Seminar on Atheism",
        society: "LRS",
        venue: "A17",
        start_time: "2024-3-24T18:00:00",
        end_time: "2024-3-24T22:00:00",
    },
    {
        event_name: "NFAK Comeback Tour",
        society: "PhotoLUMS",
        venue: "A17",
        start_time: "2024-3-24T20:00:00",
        end_time: "2024-3-24T22:00:00",
    },
    {
        event_name: "LCSS",
        society: "LRS",
        venue: "REDC Lawn",
        start_time: "2024-3-24T22:00:00",
        end_time: "2024-3-25T00:00:00",
    },
];

const Notifications = ({ navigation }: any) => {
    React.useEffect(() => {
        const subscription = ExpoNotifications.addNotificationReceivedListener(
            () => {
                getNotifData();
            }
        );
        return () => subscription.remove();
    }, []);
    const dispatch = useAppDispatch();
    const [notifRefresh, setNotifRefresh] = useState<Boolean>(false);
    const [notifs, setNotifs] = useState<any[]>([]);
    const [eventRefresh, setEventRefresh] = useState<Boolean>(false);

    const { events } = useAppSelector((state: any) => state.events);

    useEffect(() => {
        const updateNotifs = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem("notifs");
                setNotifs(jsonValue != null ? JSON.parse(jsonValue) : []);
            } catch (e) {
                console.log(e);
            }
        };

        updateNotifs();
    }, []);

    const getNotifData = async () => {
        try {
            const res = await axios.post(`${IP}/notification/get`);
            try {
                await AsyncStorage.setItem(
                    "notifs",
                    JSON.stringify(res.data.notifs)
                );
                setNotifs(res.data.notifs);
            } catch (e) {
                setNotifs(res.data.notifs);
            }
        } catch (error) {
            console.log(error);
        }
    };
    // will run every time page changes
    useEffect(() => {
        getNotifData().then(() => setNotifRefresh(false));
    }, [notifRefresh]);

    let notif_props = {
        notifs,
        notifRefresh,
        setNotifRefresh,
    };

    let event_props = {
        events,
        eventRefresh,
        setEventRefresh,
    };

    useEffect(() => {
        dispatch(getEvents()).then(() => setEventRefresh(false));
    }, [eventRefresh]);

    return (
        <SafeAreaView style={styles.container}>
            {/* <Text
                style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 18,
                }}
            >
                Notifications
            </Text> */}
            <View
                style={{
                    width: "100%",
                    height: "45%",
                }}
            >
                <PostNotifications {...notif_props} />
            </View>
            <View
                style={{
                    width: "100%",
                    height: "auto",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 12,
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            marginRight: 8,
                            fontWeight: "bold",
                            fontSize: 16,
                        }}
                    >
                        Events today
                    </Text>
                    <View
                        style={{
                            borderBottomColor: "#B8C2C0",
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            flex: 1,
                        }}
                    />
                </View>
                <EventNotifications {...event_props} />
            </View>
        </SafeAreaView>
    );
};

export default Notifications;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        color: "#fff",
        paddingHorizontal: 20,
        justifyContent: "flex-start",
    },
    scrollPost: {},
    postMenu: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
    },
    editProfileBttn: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#35C2C1",
        borderRadius: 5,
        width: "90%",
        padding: 4,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 12,
    },
});
