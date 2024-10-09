import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DonationDetails from "../components/DonationDetails";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import Loader from "../components/Loader";
import { getDonations } from "../redux/action";
import { useFocusEffect } from "@react-navigation/native"; // Import the useFocusEffect hook


const Donations = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { donations, loading } = useAppSelector(
    (state: any) => state.donations || { donations: [], loading: false }
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { user } = useAppSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(getDonations());
  }, [dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getDonations());
    }, [])
  );

  if (loading) {
    return <Loader />;
  }

  if (!donations || donations.length === 0) {
    return <Text style={{ color: "red" }}>No donations available.</Text>;
  }

  const filteredDonations = donations.filter((donation: any) =>
    donation.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <MaterialIcons
          name="search"
          size={20}
          color="#414141"
          style={{ alignSelf: "center" }}
        />
        <TextInput
          placeholder="Search Donations by Category"
          placeholderTextColor="#414141"
          style={{ fontSize: 13, color: "white", flex: 1 }}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {user?.role === "admin" && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddDonation")}
        >
          <MaterialIcons name="add" size={24} color="white" />
          <Text style={{ color: "white" }}>Add Donation</Text>
        </TouchableOpacity>
      )}
      <FlatList
        style={{ width: "100%", marginTop: 10 }}
        data={filteredDonations}
        onRefresh={() => {
          setRefresh(!refresh);
          dispatch(getDonations());
        }}
        refreshing={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SpecificDonation", {
                donation: item,
              });
            }}
          >
            <DonationDetails
              category={item.category}
              description={item.details}
              date={item.createdAt}
              amountPending={item.pendingAmount}
              issuedBy={item.accountDetails.issuedBy}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// styling for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    color: "#fff",
    paddingHorizontal: 15,
    justifyContent: "flex-start",
  },
  search: {
    width: "100%",
    backgroundColor: "#292626",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
  },
  addButton: {
    width: "100%",
    backgroundColor: "#35C2C1",
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 5,
    gap: 5,
  },
});

export default Donations;
