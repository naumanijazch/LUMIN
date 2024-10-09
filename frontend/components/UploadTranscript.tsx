import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import axios from "axios";
import { IP } from "../constants/ip";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { HOME_ICON_BCKG_COLOR, PRIMARY_COLOR } from "../constants/color";
import { Ionicons } from "@expo/vector-icons";
import Loader from "./Loader";

const UploadTranscript = (props: any) => {
    const [file, setFile]: any = useState();
    const [uploading, setUploading] = useState(false);
    console.log(props);

    const removeTranscript = async () => {
        try {
            await AsyncStorage.removeItem("transcript");
            props.setTranscript(null);
        } catch (e) {
            console.log(e);
        }
    };
    const selectTranscript = async () => {
        // Use expo-document-picker to choose Transcript from PDF files.
        try {
            const docRes = await DocumentPicker.getDocumentAsync({
                type: "application/pdf",
            });

            const assets = docRes.assets;
            if (!assets) return;
            const fileInfo = assets[0];

            let { name, size, uri } = fileInfo;
            let nameParts = name.split(".");
            let fileType = nameParts[nameParts.length - 1];

            var fileToUpload = {
                name: name,
                size: size,
                uri: uri,
                type: "application/" + fileType,
            };
            setFile(fileToUpload);
        } catch (error) {
            console.log(error);
        }
    };
    const uploadTranscript = async () => {
        // Upload the selected PDF file to server.
        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        console.log(formData);

        axios
            .post(`${IP}/transcript/parse`, formData, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(async (response) => {
                setUploading(false);
                if (!response.data.success) {
                    alert(response.data.message);
                    setFile(null);
                } else {
                    try {
                        await AsyncStorage.setItem(
                            "transcript",
                            JSON.stringify(response.data.parsedData)
                        );
                        props.setTranscript(response.data.parsedData);
                    } catch (e) {
                        console.log(e);
                    } finally {
                        props.uploadState(true);
                        setFile(null);
                    }
                }
            })
            .catch((error) => {
                setUploading(false);
                setFile(null);
                console.log(error);
                alert("Invalid Transcript!");
            });
    };

    return (
        <View
            style={{
                width: "80%",
                backgroundColor: HOME_ICON_BCKG_COLOR,
                marginTop: 32,
                padding: 12,
                borderRadius: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <TouchableOpacity
                style={styles.uploadTranscriptBttn}
                onPress={() => {
                    uploading
                        ? ""
                        : file
                        ? uploadTranscript()
                        : selectTranscript();
                }}
            >
                <Text style={{ color: "#000", fontWeight: "bold" }}>
                    {file ? "Upload" : "Select"}
                </Text>
            </TouchableOpacity>
            <Text style={{ color: "#fff" }}>
                {file
                    ? file.name.split(".")[0].length > 10
                        ? file.name.split(".")[0].slice(0, 10) + "..."
                        : file.name.split(".")[0]
                    : props.transcript
                    ? "SSR_TSRPT.pdf"
                    : ""}
            </Text>
            {uploading ? (
                <Loader />
            ) : file ? (
                <TouchableOpacity
                    onPress={() => {
                        setFile(null);
                    }}
                    style={{
                        backgroundColor: PRIMARY_COLOR,
                        borderRadius: 100,
                        padding: 8,
                        justifyContent: "center",
                    }}
                >
                    <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
            ) : (
                props.transcript && (
                    <TouchableOpacity
                        onPress={() => {
                            removeTranscript();
                        }}
                        style={{
                            backgroundColor: PRIMARY_COLOR,
                            borderRadius: 100,
                            padding: 8,
                            justifyContent: "center",
                        }}
                    >
                        <Ionicons name="close" size={24} color="black" />
                    </TouchableOpacity>
                )
            )}
        </View>
    );
};

export default UploadTranscript;

const styles = StyleSheet.create({
    uploadTranscriptBttn: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#35C2C1",
        borderRadius: 10,
        width: "25%",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});
