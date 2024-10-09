import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { IP } from "../constants/ip";

const Reviews: React.FC<{
    username: string;
    profilePicture: string;
    ratingGiven: number;
    reviewDescription: string;
    reviewedBy: string;
    userID: string;
    reviewID: string;
    onDeleteSuccess: () => void;
}> = ({
    username,
    profilePicture,
    ratingGiven,
    reviewDescription,
    reviewedBy,
    userID,
    reviewID,
    onDeleteSuccess,
}) => {
    const [editMode, setEditMode] = useState(false);
    const [editedText, setEditedText] = useState(reviewDescription);
    const [description, setDescription] = useState(reviewDescription);

    // dismiss the keyboard
    const handleKeyboardDismiss = () => {
        Keyboard.dismiss();
    };

    const handleEdit = () => {
        setEditMode(!editMode);
    };

    const handleSave = () => {
        try {
            axios.post(`${IP}/review/edit`, {
                reviewID: reviewID,
                reviewDescription: editedText,
            });
            console.log("Review edited successfully");
            setEditMode(!editMode);
            setDescription(editedText);
        } catch (error) {
            console.error("Error editing review:", error);
        }
    };

    const handleDelete = () => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this comment?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: () => deleteReview(), // Call the function to delete review
                    style: "destructive",
                },
            ],
            { cancelable: true }
        );
    };

    // Function to delete review
    const deleteReview = async () => {
        try {
            const res = await axios.post(`${IP}/review/delete`, {
                reviewID: reviewID,
            });
            console.log("Review deleted:", res.data.success);
            onDeleteSuccess(); // Call the callback function provided by parent component
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={
                            profilePicture
                                ? {
                                      uri: profilePicture,
                                  }
                                : require("../assets/default_icon.png")
                        }
                        style={{ width: 30, height: 30, borderRadius: 50 }}
                    />
                    <Text style={{ color: "white", paddingLeft: 20 }}>
                        {username}
                    </Text>
                    <View style={[styles.header, { marginLeft: "auto" }]}>
                        <Text style={{ color: "white", paddingRight: 5 }}>
                            {ratingGiven}
                        </Text>
                        <MaterialIcons
                            name={"star"}
                            size={30}
                            color={"white"}
                        />
                    </View>
                </View>
                {editMode ? (
                    <View>
                        <TextInput
                            multiline
                            style={{
                                height: 80,
                                color: "white",
                                marginTop: 20,
                            }}
                            value={editedText}
                            onChangeText={(text) => setEditedText(text)}
                        />

                        <TouchableOpacity
                            onPress={handleSave}
                            style={styles.saveButton}
                        >
                            <Text>Save</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <Text style={{ color: "white", marginTop: 20 }}>
                        {description}
                    </Text>
                )}

                {/* edit and delete should only be visible for my own review */}
                {userID === reviewedBy && (
                    <View style={styles.header}>
                        <TouchableOpacity onPress={handleEdit}>
                            <MaterialCommunityIcons
                                name="pencil"
                                size={18}
                                color="white"
                                style={{ paddingLeft: "85%" }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDelete}>
                            <MaterialCommunityIcons
                                name="delete"
                                size={18}
                                color="white"
                                style={{ paddingLeft: "4%" }}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1D1D1D",
        padding: 15,
        marginHorizontal: 10,
        borderRadius: 8,
        borderBottomWidth: 2,
        borderBottomColor: "#35C2C1",
        marginBottom: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
    },
    saveButton: {
        backgroundColor: "#35C2C1",
        borderRadius: 10,
        width: "20%",
        marginTop: 20,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        // alignSelf: "center",
    },
});

export default Reviews;
