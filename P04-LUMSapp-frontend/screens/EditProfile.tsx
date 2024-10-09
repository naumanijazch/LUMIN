import {
    StyleSheet,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    View,
    ImageBackground,
    Text,
    TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { reloadUser } from "../redux/action";
import { Button } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { IP } from "../constants/ip";

const EditProfile = ({ navigation }: any) => {
    const { user }: any = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [icon, setIcon]: any = useState();

    useEffect(() => {
        setUsername(user?.name);
        setBio(user?.bio);
        setIcon({ uri: user?.profile_picture.url });
    }, [dispatch]);

    const selectImage = async () => {
        try {
            const docRes = await DocumentPicker.getDocumentAsync({
                type: "image/*",
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
            setIcon(fileToUpload);
        } catch (error) {
            console.log(error);
        }
    };

    const uploadData = async () => {
        // Upload the selected PDF file to server.
        const formData = new FormData();
        if (icon.name) {
            formData.append("icon", icon);
        }
        formData.append("username", username);
        formData.append("bio", bio);
        console.log(icon);

        axios
            .post(`${IP}/user/update`, formData, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(async (response) => {
                console.log(response.data.message);
                if (!response.data.success) {
                    alert(response.data.message);
                } else {
                    console.log("success");
                    dispatch(reloadUser());
                    navigation.goBack();
                }
            })
            .catch((error) => {
                console.log(error);
                alert("Invalid input!");
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "5%",
                }}
            >
                <Button
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={{
                        position: "absolute",
                        left: "4%",
                    }}
                >
                    <Feather name="x" size={24} color="white" />
                </Button>
                <Text
                    style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 22,
                    }}
                >
                    Edit Profile
                </Text>
                <Button
                    onPress={() => {
                        uploadData();
                    }}
                    style={{
                        position: "absolute",
                        right: "4%",
                    }}
                >
                    <Feather name="check" size={24} color="#35C2C1" />
                </Button>
            </View>
            <View
                style={{
                    width: "100%",
                    alignItems: "center",
                }}
            >
                <TouchableOpacity
                    style={{
                        width: "40%",
                        height: "auto",
                        borderRadius: 100,
                        aspectRatio: 1 / 1,
                        marginTop: "8%",
                        marginBottom: "3%",
                    }}
                    onPress={() => {
                        selectImage();
                    }}
                >
                    <ImageBackground
                        style={{
                            width: "100%",
                            height: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        imageStyle={{
                            borderRadius: 100,
                            aspectRatio: 1 / 1,
                            opacity: 0.55,
                        }}
                        source={
                            icon?.uri
                                ? { uri: icon.uri }
                                : require("../assets/default_icon.png")
                        } /*require path is for static images only*/
                    >
                        <Feather
                            name="camera"
                            size={32}
                            color="#35C2C1"
                            style={{
                                position: "relative",
                            }}
                        />
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        selectImage();
                    }}
                >
                    <Text
                        style={{
                            color: "#35C2C1",
                            fontSize: 16,
                            fontWeight: "600",
                        }}
                    >
                        Edit picture
                    </Text>
                </TouchableOpacity>
                <View
                    style={{
                        width: "90%",
                        marginTop: "12%",
                    }}
                >
                    <Text
                        style={{
                            color: "#848484",
                            fontSize: 14,
                        }}
                    >
                        Name
                    </Text>
                    <TextInput
                        editable
                        maxLength={30}
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                        style={{
                            paddingVertical: 8,
                            color: "white",
                            fontSize: 18,
                            borderBottomColor: "#848484",
                            borderBottomWidth: 1,
                        }}
                    />
                    <Text
                        style={{
                            color: "#848484",
                            fontSize: 14,
                            marginTop: 20,
                        }}
                    >
                        Bio
                    </Text>
                    <TextInput
                        editable
                        maxLength={30}
                        value={bio}
                        onChangeText={(text) => setBio(text)}
                        style={{
                            paddingVertical: 8,
                            color: "white",
                            fontSize: 18,
                            borderBottomColor: "#848484",
                            borderBottomWidth: 1,
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
});
