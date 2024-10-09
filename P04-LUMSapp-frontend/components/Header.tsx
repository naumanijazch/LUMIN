//COLORS DONE
import { StyleSheet, View, Image } from "react-native";
import { Avatar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { HEADER_ICON_COLOR } from "../constants/color";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";

const Header = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const { user }: any = useAppSelector((state) => state.auth);
    const [username, setUsername] = useState("");
    const [icon, setIcon]: any = useState();

    useEffect(() => {
        setUsername(user?.name);
        setIcon(user?.profile_picture.url);
    }, [user]);

    return (
        <View style={styles.header}>
            <Avatar.Image
                size={30}
                source={
                    icon ? { uri: icon } : require("../assets/default_icon.png")
                } /*require path is for static images only*/
            />
            <Image
                style={{ width: 50, height: 30, opacity: 1 }}
                source={require("../assets/logo3.png")}
            />
            <MaterialIcons
                name="message"
                size={24}
                color={HEADER_ICON_COLOR}
                onPress={() => navigation.navigate("ChatsHome")}
            />
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
});
