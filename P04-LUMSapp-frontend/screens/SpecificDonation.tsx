import {View, Text, StyleSheet} from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import { useAppSelector } from "../redux/hooks";
import { useState, useEffect} from "react";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IP } from "../constants/ip";
import axios from "axios";

const SpecificDonation = ({route ,navigation }:any) => {
    const donation = route.params.donation
    
    const [userPermission, setUserPermission] = useState(false)

    const formattedTotalAmount = parseInt(donation.totalAmount, 10).toLocaleString();
    const formattedPendingAmount = parseInt(donation.pendingAmount, 10).toLocaleString();

    const { user } = useAppSelector((state: any) => state.auth);
    useEffect(() => {
        if (user.role === "admin" || user.role === "student council") { // logic: only admins, studnet council, and others like so can create donation requests 
            setUserPermission(true)
        }
    }, [user.role]); 

    const deleteDonation = async (id: string) => {
        //const res = axios 
        try {
            console.log("Deleting id: ", id)
            const res = await axios.post(`${IP}/donations/deleteSpecificDonation`, {
                donationId: id,
              });
            navigation.navigate("Donations");
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <ScrollView style={styles.container}>
            {userPermission && (
                <TouchableOpacity
                style={{
                    display: "flex",
                    width: "100%",
                    backgroundColor: "#35C2C1",
                    borderRadius: 10,
                    marginBottom: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    paddingVertical: 5,
                    gap: 5,
                }}
                onPress={() => {
                    navigation.navigate("EditDonation", { donation: donation });
                }}
            >
                <MaterialCommunityIcons name="pencil" size={24} color="white" />
                <Text style={{ color: "white" }}>Edit Donation</Text>
            </TouchableOpacity>)}

            {userPermission && (
                <TouchableOpacity
                style={{
                    display: "flex",
                    width: "100%",
                    backgroundColor: "#35C2C1",
                    borderRadius: 10,
                    marginBottom: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    paddingVertical: 5,
                    gap: 5,
                }}
                onPress={() => {
                    deleteDonation(donation._id);
                }}
            >
                <MaterialCommunityIcons name="delete" size={24} color="white" />
                <Text style={{ color: "white" }}>Delete Donation</Text>
            </TouchableOpacity>)}

            <View style={{display: "flex", flexDirection: "row", paddingLeft: 18, paddingTop: 25}}>
                <Text style={styles.components}>From: </Text>
                <Text style={styles.componentsValue}>{donation.accountDetails.issuedBy} </Text>
            </View>
            <View style={{display: "flex", flexDirection: "row", paddingLeft: 18, paddingTop: 10}}>
                <Text style={styles.components}>Total Amount: </Text>
                <Text style={styles.componentsValue}>{formattedTotalAmount} </Text>
            </View>

            <View style={{display: "flex", flexDirection: "row", paddingLeft: 18, paddingTop: 10}}>
                <Text style={styles.components}>Pending Amount: </Text>
                <Text style={styles.componentsValue}>{formattedPendingAmount} </Text>
            </View>

            
            <View style={styles.textbox}>
                <Text style={[styles.components, {paddingBottom: 5}]}>Details: </Text>
                <View style={{flex: 1, paddingRight: 5, paddingBottom: 10}}>
                    <Text style={styles.componentsValue}>{donation.details} </Text>
                </View>
            </View>

            <View style={styles.textbox}>
                <Text style={[styles.components, {paddingBottom: 5}]}>Account Details: </Text>
                <View style={{flex: 1, flexDirection: "row", paddingRight: 5, paddingBottom: 10}}>
                    <Text style={styles.nestedComponents}>Bank Name: </Text>
                    <Text style={styles.componentsValue}>{donation.accountDetails?.bank} </Text>
                </View>
                <View style={{flex: 1, flexDirection: "row", paddingRight: 5, paddingBottom: 10}}>
                    <Text style={styles.nestedComponents}>Account Name: </Text>
                    <Text style={styles.componentsValue}>{donation.accountDetails?.accountName} </Text>
                </View>
                <View style={{flex: 1, flexDirection: "row", paddingRight: 5, paddingBottom: 10}}>
                    <Text style={styles.nestedComponents}>Account Number: </Text>
                    <Text style={styles.componentsValue}>{donation.accountDetails?.accountNumber} </Text>
                </View>
                <View style={{flex: 1, flexDirection: "row", paddingRight: 5, paddingBottom: 10}}>
                    <Text style={styles.nestedComponents}>IBAN: </Text>
                    <Text style={styles.componentsValue}>{donation.accountDetails?.IBAN} </Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        // alignItems: "c/enter",
      },
      textbox: {
        display: "flex",
        color: "#35C2C1",
        width: "97%",
        borderWidth: 3,
        height: "auto",
        borderColor: "#2B2B2B",
        borderRadius: 10,
        backgroundColor: "#0E0E0E",
        overflow: "scroll",
        paddingTop: 5,
        paddingLeft: 5,
        marginVertical: 15,
        marginHorizontal: 10.
      },
      components: {
        color: "#35C2B0",
        fontSize: 16,
        // paddingTop: 5,
    },
      nestedComponents: {
        color: "white",
        fontSize: 16,
        // paddingTop: 5,
    },
    componentsValue: {
        color: "white",
        fontSize: 16,
        // paddingTop: 5,
    },
})

export default SpecificDonation