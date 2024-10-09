import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Loader from "../components/Loader";

const Transcript = ({ navigation }: any) => {
    const [transcript, setTranscript]: any = useState(null);

    function truncateName(text: string, length: number) {
        if (text.length <= length) {
            return text;
        }

        return text.substring(0, length) + "\u2026";
    }

    useEffect(() => {
        const updateTranscript = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem("transcript");
                setTranscript(jsonValue != null ? JSON.parse(jsonValue) : null);
            } catch (e) {
                console.log(e);
            }
        };

        updateTranscript();
    }, []);

    return !transcript ? (
        <Loader />
    ) : (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    paddingVertical: "5%",
                    flex: 1,
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        color: "white",
                        width: "100%",
                        textAlign: "center",
                        paddingVertical: 22,
                        fontWeight: "bold",
                        fontSize: 28,
                    }}
                >
                    CGPA {transcript.cgpa}
                </Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                    }}
                >
                    {transcript.semesters
                        ? transcript.semesters.map((sem: any) => (
                              <View
                                  key={sem.semester}
                                  style={{
                                      width: "100%",
                                      flexDirection: "column",
                                      justifyContent: "space-between",
                                      marginVertical: 4,
                                      alignItems: "center",
                                  }}
                              >
                                  <View
                                      style={{
                                          flexDirection: "row",
                                          justifyContent: "space-between",
                                          width: "95%",
                                          paddingVertical: 4,
                                      }}
                                  >
                                      <Text
                                          style={{
                                              color: "#7A7A7A",
                                          }}
                                      >
                                          {sem.semester}
                                      </Text>
                                      <Text
                                          style={{
                                              color: "#2fa192",
                                          }}
                                      >
                                          {sem.course_info.reduce(
                                              (
                                                  accumulator: number,
                                                  currentValue: any
                                              ) => {
                                                  return (
                                                      accumulator +
                                                      currentValue.credits
                                                  );
                                              },
                                              0
                                          )}{" "}
                                          credits
                                      </Text>
                                  </View>
                                  {sem.course_info.map((course: any) => (
                                      <View
                                          key={course.code}
                                          style={{
                                              width: "100%",
                                              flexDirection: "row",
                                              justifyContent: "space-between",
                                              alignItems: "center",
                                              backgroundColor: "#2B2B2B",
                                              paddingHorizontal: 10,
                                              paddingVertical: 8,
                                              marginVertical: 3,
                                              borderRadius: 8,
                                          }}
                                      >
                                          <View
                                              style={{
                                                  flexDirection: "column",
                                              }}
                                          >
                                              <Text
                                                  style={{
                                                      color: "white",
                                                      fontSize: 15,
                                                  }}
                                              >
                                                  {truncateName(
                                                      course.name,
                                                      36
                                                  )}
                                              </Text>
                                              <Text
                                                  style={{
                                                      color: "#35C2B0",
                                                      fontSize: 12,
                                                  }}
                                              >
                                                  {course.code}
                                              </Text>
                                          </View>
                                          <Text
                                              style={{
                                                  color: "#35C2B0",
                                                  fontWeight: "bold",
                                                  fontSize: 20,
                                                  width: "8%",
                                              }}
                                          >
                                              {course.grade}
                                          </Text>
                                      </View>
                                  ))}
                              </View>
                          ))
                        : null}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Transcript;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        color: "#fff",
        paddingHorizontal: 20,
        justifyContent: "flex-start",
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginTop: 20,
        padding: 0,
    },
});
