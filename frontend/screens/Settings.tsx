import { SafeAreaView, Switch, Text, View } from "react-native";
import { useState } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";

const Settings = ({ route }: any) => {
    const navigation = useNavigation<NavigationProp<any>>();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleNotifications = () => {
        console.log("Notifications Toggled");
        setIsEnabled((previousState) => !previousState);
    };
    return (
        <SafeAreaView
            style={{
                backgroundColor: "black",
                flex: 1,
                padding: 20,
            }}
        >
            <Button
                onPress={() => {
                    navigation.goBack();
                }}
                style={{
                    position: "absolute",
                    left: "4%",
                    top: "2.5%",
                }}
            >
                <Ionicons name="chevron-back" size={24} color="white" />
            </Button>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: "bold",
                    }}
                >
                    Settings
                </Text>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 20,
                    alignItems: "center",
                }}
            >
                <Text style={{ color: "white", fontSize: 18 }}>
                    Notifications
                </Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#35C2C1" }}
                    thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleNotifications}
                    value={isEnabled}
                />
            </View>
        </SafeAreaView>
    );
};

export default Settings;
