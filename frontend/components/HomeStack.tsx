import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Scheduler from "../screens/Scheduler";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Scheduler" component={Scheduler} />
      </Stack.Navigator>
    </View>
  );
};

export default HomeStack;
