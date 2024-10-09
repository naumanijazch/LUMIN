// AccountMenu.js
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Alert,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../redux/action";
import Dialog from "react-native-dialog";

const AccountMenu = ({ isVisible, onClose }: any) => {
    const [userData, setUserData] = useState([]);
    const dispatch = useAppDispatch();

    const [dialogVisible, setDialogVisible] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await AsyncStorage.getItem("userData");

                if (data) {
                    setUserData(JSON.parse(data));
                }
            } catch (error) {
                console.error(
                    "Error retrieving user data from AsyncStorage:",
                    error
                );
            }
        };

        fetchUserData();
    }, []);

    const navigation = useNavigation();

    const handleLogin = (data: any) => {
        onClose();
        dispatch(login(data.email, data.password));
    };

    const handleLongPressAccount = (account) => {
        setSelectedAccount(account);
        setDialogVisible(true);
    };

    const deleteAccount = async () => {
        const account = selectedAccount;

        const updatedUserData = userData.filter(
            (item) => item.data.user.name !== account.data.user.name
        );
        setUserData(updatedUserData);
        try {
            await AsyncStorage.setItem(
                "userData",
                JSON.stringify(updatedUserData)
            );
            console.log("Account deleted and userData updated in AsyncStorage");
            setDialogVisible(false);
        } catch (error) {
            console.error(
                "Failed to delete the account from AsyncStorage:",
                error
            );
        }
    };

    const renderAccountItem = ({ item }: any) => (
        <TouchableOpacity
            style={styles.accountDetails}
            onPress={() => handleLogin(item)}
            onLongPress={() => handleLongPressAccount(item)}
        >
            <Image
                style={styles.avatar}
                source={
                    item.data.user.profile_picture?.url
                        ? {
                              uri: item.data.user.profile_picture?.url,
                          }
                        : require("../assets/default_icon.png")
                }
            />
            <Text style={styles.nameText}>{item.data.user.name}</Text>
            {/* <Text style={styles.detailText}>{item.data.user.bio}</Text> */}
        </TouchableOpacity>
    );

    const handleAddAccount = () => {
        onClose();
        navigation.navigate("Login");
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.overlay}
                activeOpacity={1}
                onPressOut={onClose}
            >
                <View style={styles.modalView}>
                    {/* Menu Content */}
                    <View style={styles.header}>
                        <View style={styles.horizontalBar} />
                    </View>

                    {/* FlatList to render accounts */}
                    <FlatList
                        data={userData}
                        style={{ width: "100%" }}
                        renderItem={renderAccountItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={
                            <TouchableOpacity
                                style={styles.addAccountButton}
                                onPress={handleAddAccount}
                            >
                                <Text
                                    style={[
                                        styles.addAccountText,
                                        {
                                            color: "#4ECCA3",
                                            fontSize: 60,
                                            marginBottom: 10,
                                        },
                                    ]}
                                >
                                    +
                                </Text>
                                <Text style={styles.addAccountText}>
                                    {" "}
                                    Add Account
                                </Text>
                            </TouchableOpacity>
                        }
                    />
                </View>
            </TouchableOpacity>
            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title style={{ color: "black" }}>
                    Delete Account
                </Dialog.Title>
                <Dialog.Description style={{ color: "black" }}>
                    Are you sure you want to remove this account?
                </Dialog.Description>
                <Dialog.Button
                    label="Cancel"
                    onPress={() => setDialogVisible(false)}
                />
                <Dialog.Button label="Delete" onPress={deleteAccount} />
            </Dialog.Container>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        // backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark grey, semi-transparent background
        justifyContent: "flex-end",
    },
    modalView: {
        backgroundColor: "#000000", // Assuming a dark theme as in the image
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 25,
        alignItems: "center",
    },
    header: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 25,
    },
    horizontalBar: {
        width: 40,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: "#4ECCA3", // Your color for the horizontal bar
    },
    accountDetails: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        // borderWidth:1,
        // borderColor:"#4ECCA3",
    },
    avatar: {
        width: 60, // Adjust size as needed
        height: 60, // Adjust size as needed
        borderRadius: 40, // Half the size of the width/height to make it round
        marginBottom: 0,
    },
    nameText: {
        color: "white", // White text for name
        fontSize: 20,

        marginBottom: 5,
        marginLeft: 10, // Space between the avatar and name
    },
    detailText: {
        color: "grey", // Grey text for details
        fontSize: 16,
        marginBottom: 25,
    },
    addAccountButton: {
        flexDirection: "row",

        alignItems: "center",
        justifyContent: "flex-start",
        // borderWidth:1,
        // borderColor:"#4ECCA3",
        // backgroundColor: "#4ECCA3", // Color for the button
        borderRadius: 5,
        marginTop: -5,
        width: "100%", // Button width is the same as the modal width
    },
    addAccountText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
        marginLeft: 10, // Space between the plus icon and text
    },
});

export default AccountMenu;
