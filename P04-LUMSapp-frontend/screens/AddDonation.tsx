import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";

import { IP } from "../constants/ip";

const AddDonation = ({ route, navigation }: any) => {
    const [donationDescription, setDonationDescription] = useState("");
    const [category, setCategory] = useState("");
    const [issuingAuthority, setIssuingAuthority] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [pendingAmount, setPendingAmount] = useState("");
    const [bankName, setBankName] = useState("");
    const [accountName, setAccountName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [iban, setIban] = useState("");

    const handleKeyboardDismiss = () => {
        Keyboard.dismiss();
    };

    const submitDonation = async () => {
        try {
            const res = await axios.post(`${IP}/donations/create`, {
                donationDescription: donationDescription,
                category: category,
                issuingAuthority: issuingAuthority,
                totalAmount: totalAmount,
                pendingAmount: pendingAmount,
                bankName: bankName,
                accountName: accountName,
                accountNumber: accountNumber,
                iban: iban,
            });
            alert("Donation submitted successfully!");
            navigation.goBack();
        } catch (err) {
            alert("Error submitting donation. Please try again later.");
            navigation.goBack();
        }
    };

    const submitPressed = () => {
        const emptyFields = [];
        if (donationDescription === "") {
            emptyFields.push("Donation Details");
        }
        if (category === "") {
            emptyFields.push("Category");
        }
        if (issuingAuthority === "") {
            emptyFields.push("Issued By");
        }
        if (totalAmount === "") {
            emptyFields.push("Total Amount");
        }
        if (pendingAmount === "") {
            emptyFields.push("Pending Amount");
        }
        if (bankName === "") {
            emptyFields.push("Bank");
        }
        if (emptyFields.length > 0) {
            const fields = emptyFields.join(", ");
            alert(`Please fill the following fields: ${fields}`);
        } else {
            if ((accountName === "" || accountNumber === "") && iban === "") {
                alert("Please fill either account details or IBAN.");
            } else {
                submitDonation();
            }
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
            <ScrollView style={styles.container}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={styles.promptTitle}>Issued By:</Text>
                    <AntDesign
                        name="exclamationcircleo"
                        size={16}
                        color="#35C2C1"
                        style={{ paddingTop: 2, paddingLeft: 10 }}
                    />
                </View>
                <View style={[styles.inputbox, { height: 40 }]}>
                    <TextInput
                        editable
                        placeholder="Enter the title of the issuing authority..."
                        placeholderTextColor="#3f3f3f"
                        numberOfLines={1}
                        onChangeText={setIssuingAuthority}
                        value={issuingAuthority}
                        style={{ padding: 10, color: "white", fontSize: 16 }}
                    />
                </View>

                <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={styles.promptTitle}>Category:</Text>
                    <AntDesign
                        name="exclamationcircleo"
                        size={16}
                        color="#35C2C1"
                        style={{ paddingTop: 2, paddingLeft: 10 }}
                    />
                </View>
                <View style={[styles.inputbox, { height: 40 }]}>
                    <TextInput
                        editable
                        placeholder="Enter the category of the donation..."
                        placeholderTextColor="lightgrey"
                        numberOfLines={1}
                        onChangeText={setCategory}
                        value={category}
                        style={{ padding: 10, color: "white", fontSize: 16 }}
                    />
                </View>

                <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={styles.promptTitle}>Total Amount:</Text>
                    <AntDesign
                        name="exclamationcircleo"
                        size={16}
                        color="#35C2C1"
                        style={{ paddingTop: 2, paddingLeft: 10 }}
                    />
                </View>
                <View style={[styles.inputbox, { height: 40 }]}>
                    <TextInput
                        editable
                        placeholder="Enter the total amount in rupees..."
                        placeholderTextColor="lightgrey"
                        numberOfLines={1}
                        onChangeText={(amount) => {
                            setTotalAmount(amount);
                            setPendingAmount(amount);
                        }}
                        value={totalAmount}
                        keyboardType="numeric"
                        style={{ padding: 10, color: "white", fontSize: 16 }}
                    />
                </View>

                <Text style={styles.promptTitle}>Pending Amount: </Text>
                <View style={[styles.inputbox, { height: 40 }]}>
                    <TextInput
                        editable
                        placeholder="Enter the pending amount in rupees..."
                        placeholderTextColor="lightgrey"
                        numberOfLines={1}
                        onChangeText={setPendingAmount}
                        value={pendingAmount}
                        keyboardType="numeric"
                        style={{ padding: 10, color: "white", fontSize: 16 }}
                    />
                </View>

                <Text style={styles.promptTitle}>Bank: </Text>
                <View style={[styles.inputbox, { height: 40 }]}>
                    <TextInput
                        editable
                        placeholder="Enter the name of your bank..."
                        placeholderTextColor="lightgrey"
                        numberOfLines={1}
                        onChangeText={setBankName}
                        value={bankName}
                        style={{ padding: 10, color: "white", fontSize: 16 }}
                    />
                </View>

                <Text style={styles.promptTitle}>Account Name: </Text>
                <View style={[styles.inputbox, { height: 40 }]}>
                    <TextInput
                        editable
                        placeholder="Enter the account name..."
                        placeholderTextColor="lightgrey"
                        numberOfLines={1}
                        onChangeText={setAccountName}
                        value={accountName}
                        style={{ padding: 10, color: "white", fontSize: 16 }}
                    />
                </View>

                <Text style={styles.promptTitle}>Account Number: </Text>
                <View style={[styles.inputbox, { height: 40 }]}>
                    <TextInput
                        editable
                        placeholder="Enter the account number..."
                        placeholderTextColor="lightgrey"
                        numberOfLines={1}
                        onChangeText={setAccountNumber}
                        value={accountNumber}
                        keyboardType="numeric"
                        style={{ padding: 10, color: "white", fontSize: 16 }}
                    />
                </View>

                <Text style={styles.promptTitle}>IBAN: </Text>
                <View style={[styles.inputbox, { height: 40 }]}>
                    <TextInput
                        editable
                        placeholder="Enter the account IBAN..."
                        placeholderTextColor="lightgrey"
                        numberOfLines={1}
                        onChangeText={setIban}
                        value={iban}
                        style={{ padding: 10, color: "white", fontSize: 16 }}
                    />
                </View>

                <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={styles.promptTitle}>Details:</Text>
                    <AntDesign
                        name="exclamationcircleo"
                        size={16}
                        color="#35C2C1"
                        style={{ paddingTop: 2, paddingLeft: 10 }}
                    />
                </View>
                <View style={[styles.inputbox, { height: 150 }]}>
                    <TextInput
                        editable
                        placeholder="Enter the donation details here..."
                        placeholderTextColor="lightgrey"
                        multiline
                        numberOfLines={4}
                        maxLength={40}
                        onChangeText={setDonationDescription}
                        value={donationDescription}
                        style={{ padding: 10, color: "white", fontSize: 16 }}
                    />
                </View>

                <TouchableOpacity
                    style={styles.topicButton}
                    onPress={submitPressed}
                >
                    <Text style={{ color: "#000", fontWeight: "bold" }}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    promptTitle: {
        color: "#35C2C1",
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 30,
        marginBottom: 15,
    },
    inputbox: {
        width: "80%",
        borderWidth: 0.5,
        borderRadius: 8,
        backgroundColor: "#2B2B2B",
        marginLeft: 30,
        marginBottom: 20,
    },
    topicButton: {
        backgroundColor: "#35C2C1",
        borderRadius: 10,
        width: "50%",
        marginTop: 20,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
});

export default AddDonation;
