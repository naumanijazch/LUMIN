//COLORS DONE

import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import {
  HEADER_COLOR,
  BOTTOM_NAVIGATOR_COLOR,
  BOTTOM_NAVIGATOR_ACTIVE_COLOR,
  BOTTOM_NAVIGATOR_INACTIVE_COLOR,
} from "../constants/color";

import bottomTabs from "../constants/bottomtabs";
import Header from "./Header";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <View style={{ flex: 1, backgroundColor: HEADER_COLOR }}>
            <Tab.Navigator
                initialRouteName="HomeStack"
                screenOptions={({ route }) => ({
                    tabBarShowLabel: false,
                    tabBarStyle: { backgroundColor: BOTTOM_NAVIGATOR_COLOR },
                    tabBarActiveTintColor: "#DDDDDD",
                    tabBarInactiveTintColor: "#35C2C1",
                    headerShown: route.name == "Profile" ? false : true,
                    headerBackground(props) {
                        return (
                            <View
                                style={{
                                    backgroundColor: "black",
                                    height: 50,
                                    width: "100%",
                                    alignItems: "center",
                                }}
                            >
                                <Header />
                            </View>
                        );
                    },
                    headerStyle: {
                        backgroundColor: "black",
                        height: 50,
                    },
                })}
            >
                {bottomTabs.map((tab) => (
                    <Tab.Screen
                        key={tab.name}
                        name={tab.name}
                        component={tab.component}
                        options={{
                            headerTitle: "",
                            tabBarIcon: ({ focused }) => (
                                <Ionicons
                                    name={tab.icon}
                                    size={focused ? 24 : 20}
                                    color={
                    focused
                      ? BOTTOM_NAVIGATOR_ACTIVE_COLOR
                      : BOTTOM_NAVIGATOR_INACTIVE_COLOR
                  }
                                />
                            ),
                        }}
                    />
                ))}
            </Tab.Navigator>
        </View>
    );
};

export default BottomTabs;

const styles = StyleSheet.create({});
