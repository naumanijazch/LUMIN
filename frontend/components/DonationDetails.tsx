import { View, Text, StyleSheet } from "react-native";

const DonationDetails = ({
    category,
    description,
    amountPending,
    issuedBy
}: {category: string, description: string, date: string, amountPending: string, issuedBy: string} ) => {
    const formattedAmountPending = parseInt(amountPending, 10).toLocaleString();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{issuedBy}</Text>
            
            <View style={{display: "flex", flexDirection: "row"}}>
                <Text style={styles.components}>Category: </Text>
                <Text style={styles.componentsValue}>{category} </Text>
            </View>

            <View style={{display: "flex", flexDirection: "row"}}>
                <Text style={styles.components}>Amount Pending: </Text>
                <Text style={styles.componentsValue}>{formattedAmountPending} </Text>
            </View>

            <View style={{display: "flex", flexDirection: "row"}}>
                <Text style={styles.components}>Details: </Text>
                <View style={{flex: 1, paddingRight: 5, paddingBottom: 10}}>
                    <Text style={styles.componentsValue} numberOfLines={3}>{description} </Text>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        display: "flex",
        // flexDirection: "row",
        // alignItems: "center",
        width: "100%",
        borderWidth: 3,
        height: 140,
        borderColor: "#2B2B2B",
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: "#0E0E0E",
        overflow: "hidden",
        paddingLeft: 10,
    },
    header: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        paddingTop: 15,
    },
    components: {
        color: "#35C2B0",
        fontSize: 13,
        paddingTop: 5,
    },
    componentsValue: {
        color: "white",
        fontSize: 13,
        paddingTop: 5,
    },
    footer: {
        paddingBottom: 15,
    }
});

export default DonationDetails;
