import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Slider from "@react-native-community/slider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const minor = "NA";
// get gpa, admissionyear, credits, minor from backend and then set the usestate for gpa

const GpaPredictorHome = ({ navigation }: any) => {
    const [loading, setLoading] = useState(false);
    const [gpa, setGpa] = useState(0);
    const [credits, setCredits] = useState(0);
    const [academicYear, setAcademicYear] = useState(0);
    const [academicRank, setAcademicRank] = useState("Not Applicable");
    const [sliderCredits, setSliderValue] = useState(12);
    const [sliderGPA, setSliderGPA] = useState(0);
    const [estimatedGPA, setEstimatedGPA] = useState(0);
    const [minorChecker, setMinorChecker] = useState("");
    const [transcript, setTranscript]: any = useState(null);
    const [semesters, setSemesters] = useState(0);
    const [majorSems, setMajorSems]: any = useState();

    const handleSliderChange = (value: number) => {
        if (value > 4) {
            setSliderValue(value);
        } else {
            setSliderGPA(parseFloat(value.toFixed(2)));
        }
    };

    useEffect(() => {
        if (transcript) {
            setGpa(transcript.cgpa);

            const semesterValues: string[] = transcript.semesters
                ? transcript.semesters.map((entry: any) =>
                      entry.semester.slice(0, -8)
                  )
                : [];
            setMajorSems(
                semesterValues.filter(
                    (entry: string) =>
                        entry.includes("Fall") || entry.includes("Spring")
                )
            );

            setSemesters(
                transcript.semesters ? transcript.semesters.length : 0
            );
            setAcademicYear(new Date().getFullYear() - transcript.admitted);
            setCredits(transcript.credits);
            setMinorChecker(minor);
            switch (academicYear) {
                case 1:
                    setAcademicRank("Freshman");
                    break;
                case 2:
                    setAcademicRank("Sophomore");
                    break;
                case 3:
                    setAcademicRank("Junior");
                    break;
                case 4:
                    setAcademicRank("Senior");
                    break;
                case 5:
                    setAcademicRank("Super Senior");
                    break;
            }
        }
    }, [transcript, academicYear]);

    useEffect(() => {
        let fullCredits = 130;
        if (minorChecker !== "NA") {
            fullCredits = 150;
        }
        let creditsLeft = sliderCredits * (8 - majorSems?.length);
        let tempEst: number =
            (gpa * credits + sliderGPA * creditsLeft) / (credits + creditsLeft);
        setEstimatedGPA(parseFloat(tempEst?.toFixed(2)));
    }, [sliderCredits, sliderGPA, gpa]);

    useEffect(() => {
        const updateTranscript = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem("transcript");
                setTranscript(jsonValue != null ? JSON.parse(jsonValue) : []);
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
                    size={0.5 * SCREEN_WIDTH}
                    width={7}
                    delay={3}
                    fill={(gpa / 4) * 100}
                    rotation={360}
                    tintColor="#35C2C1"
                    backgroundColor="#2A3C44"
                    // padding={20}
                >
                    {(fill) => (
                        <View>
                            <Text style={styles.pointsValue}>{gpa}</Text>
                            <Text style={styles.pointsGPA}>CPGA</Text>
                        </View>
                    )}
                </AnimatedCircularProgress>
            </View>

            <Text style={{ color: "#fff", marginTop: 20 }}>{academicRank}</Text>

            <View style={styles.infoContainer}>
                <Text style={{ color: "#fff", paddingRight: 20 }}>
                    Semesters: {semesters}/{8}
                </Text>
                <Text style={{ color: "#fff", paddingLeft: 20 }}>
                    Credits: {credits}/{minorChecker === "NA" ? 130 : 150}
                </Text>
            </View>

            {estimatedGPA === 0 || Number.isNaN(estimatedGPA) ? (
                <Text
                    style={{
                        color: "#fff",
                        fontSize: 20,
                        padding: 20,
                        alignSelf: "flex-start",
                    }}
                >
                    {" "}
                    CGPA by Graduation:{" "}
                </Text>
            ) : (
                <Text
                    style={{
                        color: "#fff",
                        fontSize: 20,
                        padding: 20,
                        alignSelf: "flex-start",
                    }}
                >
                    {" "}
                    CGPA by Graduation: {estimatedGPA}
                </Text>
            )}

            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
            </View>

            <Text
                style={{ color: "#fff", padding: 20, alignSelf: "flex-start" }}
            >
                Credit Hours per Semester: {sliderCredits}
            </Text>
            <Slider
                style={{ width: "90%", height: 40 }}
                minimumValue={12} // 12 for ugrads
                maximumValue={25} // can be altered
                minimumTrackTintColor="#35C2C1"
                maximumTrackTintColor="#CFFBC0"
                step={1}
                onValueChange={handleSliderChange}
            />

            <Text
                style={{ color: "#fff", padding: 20, alignSelf: "flex-start" }}
            >
                Average GPA per Semester: {sliderGPA}
            </Text>
            <Slider
                style={{ width: "90%", height: 40 }}
                minimumValue={0} // 12 for ugrads
                maximumValue={4} // can be altered
                minimumTrackTintColor="#35C2C1"
                maximumTrackTintColor="#CFFBC0"
                step={0.01}
                onValueChange={handleSliderChange}
            />

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
        // justifyContent: "center",
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
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: "5%",
        width: "80%",
    },
    dividerLine: {
        flex: 1,
        height: 1,
        width: "auto",
        backgroundColor: "#35C2C1",
    },
    backbutton: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 50,
        marginBottom: 50,
    },
});
