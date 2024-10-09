import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeButtons from "../components/HomeButtons"; //
import UploadTranscript from "../components/UploadTranscript";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const GpaPredictorHome = ({ navigation }: any) => {
    const [loading, setLoading] = useState(false);
    const [transcript, setTranscript]: any = useState(null);
    const [uploaded, setUploaded]: any = useState(false);

    useEffect(() => {
        const updateTranscript = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem("transcript");
                const jsonParsed =
                    jsonValue != null ? JSON.parse(jsonValue) : null;
                setTranscript(jsonParsed);
            } catch (e) {
                console.log(e);
            }
        };
        updateTranscript();
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 10 }}>
                <AnimatedCircularProgress
                    size={0.7 * SCREEN_WIDTH}
                    width={7}
                    delay={3}
                    fill={
                        ((transcript?.cgpa != null ? transcript?.cgpa : 0) /
                            4) *
                        100
                    }
                    rotation={360}
                    tintColor="#35C2C1"
                    backgroundColor="#2A3C44"
                    // padding={20}
                >
                    {(fill) => (
                        <View>
                            <Text style={styles.pointsValue}>
                                {transcript?.cgpa != null
                                    ? transcript?.cgpa
                                    : 0}
                            </Text>
                            <Text style={styles.pointsGPA}>CPGA</Text>
                        </View>
                    )}
                </AnimatedCircularProgress>
            </View>

            <UploadTranscript
                uploadState={setUploaded}
                transcript={transcript}
                setTranscript={setTranscript}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.actionBttns}
                    onPress={() => navigation.navigate("GpaPredictor")}
                >
                    <HomeButtons name={"GPA"} icon={"trending-up"} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionBttns}
                    onPress={() => {
                        navigation.navigate("Transcript");
                    }}
                >
                    <HomeButtons name={"Transcript"} icon={"find-in-page"} />
                </TouchableOpacity>
            </View>

            {loading && <Loader />}
            {/* <StatusBar style="auto" /> */}
        </View>
    );
};

export default GpaPredictorHome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
    },
    heading: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        textAlignVertical: "top",
        marginTop: 50,
        marginBottom: 50,
    },
    pointsValue: {
        textAlign: "center",
        color: "#fff",
        fontSize: 30,
    },
    pointsGPA: {
        textAlign: "center",
        color: "#35C2C1",
        fontSize: 25,
    },
    uploadTranscriptBttn: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#35C2C1",
        borderRadius: 10,
        width: "80%",
        marginTop: 50,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    actionBttns: {
        display: "flex",
        flexDirection: "row",
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        marginTop: 50,
    },
    backbutton: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 50,
        marginBottom: 50,
    },
});
