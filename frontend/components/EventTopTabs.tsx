import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Events from "../screens/Events";
import Map from "../screens/Map";
import { useEffect } from "react";
// import { IP } from "../constants/ip";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getEvents } from "../redux/action";

const TopTabs = createMaterialTopTabNavigator();

const EventTopTabs = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: "black" },
        tabBarIndicatorStyle: { backgroundColor: "#35C2C1" },
        tabBarActiveTintColor: "#35C2C1",
        tabBarInactiveTintColor: "#DDDDDD",
      }}
    >
      <TopTabs.Screen name="Events" component={Events} />
      <TopTabs.Screen name="Map" component={Map} />
    </TopTabs.Navigator>
  );
};

export default EventTopTabs;
