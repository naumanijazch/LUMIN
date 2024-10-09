import { Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import UserPosts from "./UserPosts";
import { forwardRef } from "react";
import {
    UserPostProps,
    UserPostRef,
    UserCommentProps,
} from "../types/userPostTypes";
import UserReplies from "./UserReplies";
import SavedPosts from "./SavedPosts";
// import { IP } from "../constants/ip";

const TopTabs = createMaterialTopTabNavigator();

const ProfileTabs = forwardRef<
    UserPostRef,
    { UserPostProps: UserPostProps; UserCommentProps: UserCommentProps }
>((props, ref) => {
    return (
        <TopTabs.Navigator
            screenOptions={{
                tabBarLabelStyle: {
                    textTransform: "none",
                    fontSize: 14,
                    fontWeight: "500",
                },
                tabBarStyle: { backgroundColor: "black" },
                tabBarIndicatorStyle: { backgroundColor: "#35C2C1" },
                tabBarActiveTintColor: "#35C2C1",
                tabBarInactiveTintColor: "#DDDDDD",
            }}
            style={{
                width: "100%",
            }}
        >
            <TopTabs.Screen
                name="Posts"
                children={() => (
                    <UserPosts ref={ref} {...props.UserPostProps} />
                )}
            />
            <TopTabs.Screen
                name="Replies"
                children={() => (
                    <UserReplies ref={ref} {...props.UserCommentProps} />
                )}
            />
            <TopTabs.Screen name="Saved" children={() => <SavedPosts />} />
        </TopTabs.Navigator>
    );
});

export default ProfileTabs;
