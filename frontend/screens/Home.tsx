//COLOR DONE

import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import buttons from "../constants/homebutton";
import HomeButtons from "../components/HomeButtons";
import {
    HOME_BCKG_COLOR,
    HOME_ICON_BCKG_COLOR,
    HOME_ICON_COLOR,
    HOME_ICON_DISCREET_HEADING_COLOR,
    HOME_ICON_TEXT_COLOR,
} from "../constants/color";
import CarouselCard from "../components/CarouselCard";
// import { useNavigation } from "@react-navigation/native";

const Home = ({ navigation }: any) => {
    // const navigation = useNavigation();
    const handleButtonPress = (buttonName: string) => {
        if (buttonName === "GPA Predictor") {
            navigation.navigate("GpaPredictorHome");
        } else if (buttonName === "Scheduler") {
            navigation.navigate("Scheduler");
        } else if (buttonName === "Donations") {
            navigation.navigate("Donations");
        }
    };

    const lumsLogo = require("../assets/Lums.png");

    return (
        <SafeAreaView style={styles.container}>
            <CarouselCard />
            {/* <Image source={lumsLogo} style={{ width: 150, height: 150 }} /> */}

            <View
                style={{
                    paddingHorizontal: "5%",
                    paddingVertical: "5%",
                    flex: 1,
                    // borderColor: "red",
                    // borderWidth: 1,
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        // borderWidth: 1,
                        // borderColor: "red",
                    }}
                >
                    {buttons.map((button) => (
                        <TouchableOpacity
                            key={button.name}
                            onPress={() => handleButtonPress(button.name)}
                            style={{ margin: 10 }}
                            activeOpacity={0.7}
                        >
                            <HomeButtons
                                name={button.name}
                                icon={button.icon}
                            />
                            <Text
                                style={{
                                    color:
                                        button.name == "Coming Soon"
                                            ? "#505050"
                                            : HOME_ICON_TEXT_COLOR,
                                    marginTop: 5,
                                    textAlign: "center",
                                }}
                            >
                                {button.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("CampusInfo")}
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        width: "100%",
                        justifyContent: "flex-start",
                        backgroundColor: HOME_ICON_BCKG_COLOR,
                        borderRadius: 20,
                        padding: 10,
                        marginVertical: 10,
                        paddingLeft: 20,
                    }}
                >
                    <MaterialIcons
                        name="info"
                        size={40}
                        color={HOME_ICON_COLOR}
                    />
                    <View>
                        <Text
                            style={{
                                color: HOME_ICON_TEXT_COLOR,
                                fontWeight: "bold",
                            }}
                        >
                            Campus Information
                        </Text>
                        <Text
                            style={{
                                color: HOME_ICON_DISCREET_HEADING_COLOR,
                                fontSize: 10,
                            }}
                        >
                            Instructor Emails, Gym Timings, Eateries Info etc
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: HOME_BCKG_COLOR,
        alignItems: "center",
        paddingHorizontal: 20,
        justifyContent: "flex-start",
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginTop: 20,
        // borderColor: "red",
        // borderWidth: 1,
        padding: 0,
    },
});
