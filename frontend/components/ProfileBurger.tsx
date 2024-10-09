import BottomSheet, {
    BottomSheetView,
    BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback } from "react";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/action";
import { PRIMARY_COLOR } from "../constants/color";

const ProfileBurger = forwardRef<BottomSheet>((props, ref) => {
    const navigation = useNavigation<NavigationProp<any>>();
    const snapPoints = ["20%"];

    const dispatch = useAppDispatch();

    const logoutHandler = async () => {
        dispatch(logout());
    };

    const renderBackdrop = useCallback(
        (backdropProps: any) => (
            <BottomSheetBackdrop
                {...backdropProps}
                enableTouchThrough={false}
            />
        ),
        []
    );

    return (
        <BottomSheet
            ref={ref}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            index={-1}
            handleIndicatorStyle={{ backgroundColor: PRIMARY_COLOR }}
            backgroundStyle={{ backgroundColor: "#292929" }}
            backdropComponent={renderBackdrop}
        >
            <BottomSheetView style={{ flex: 1, zIndex: 1000, padding: 20 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Settings")}
                    style={{
                        alignItems: "center",
                        flexDirection: "row",
                        paddingVertical: 4,
                    }}
                >
                    <Ionicons name="settings-outline" size={24} color="white" />
                    <Text
                        style={{
                            color: "white",
                            fontSize: 20,
                            marginHorizontal: 10,
                        }}
                    >
                        Settings
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={logoutHandler}
                    style={{
                        alignItems: "center",
                        flexDirection: "row",
                    }}
                >
                    <Ionicons name="log-out-outline" size={24} color="white" />
                    <Text
                        style={{
                            color: "white",
                            fontSize: 20,
                            marginHorizontal: 10,
                            paddingVertical: 2,
                        }}
                    >
                        Log Out
                    </Text>
                </TouchableOpacity>
            </BottomSheetView>
        </BottomSheet>
    );
});

export default ProfileBurger;
