import {
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    View,
    Image,
    Text,
} from "react-native";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { IP } from "../constants/ip";
import axios from "axios";
import { useAppSelector } from "../redux/hooks";
import { PostMenuRefProps } from "../components/PostMenu";
import { Feather } from "@expo/vector-icons";
import ProfileTabs from "../components/ProfileTabs";
import { UserCommentProps } from "../types/userPostTypes";
import ProfileBurger from "../components/ProfileBurger";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import AccountMenu from "../components/AccountsModal";
import { PRIMARY_COLOR } from "../constants/color";

const Profile = ({ navigation }: any) => {
    const [posts, setPosts] = useState<any[]>([]);
    const [commentsWithPosts, setCommentsWithPosts] = useState<any[]>([]);
    const [postPage, setPostPage] = useState(0);
    const [commentPage, setCommentPage] = useState(0);
    const [postRefresh, setPostRefresh] = useState(false);
    const [commentRefresh, setCommentRefresh] = useState(false);

    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [icon, setIcon]: any = useState();

    const { user }: any = useAppSelector((state) => state.auth);

    useEffect(() => {
        setUsername(user?.name);
        setBio(user?.bio);
        setIcon(user?.profile_picture);
        console.log(user?.profile_picture);
    }, [user]);
    const [isAccountMenuVisible, setIsAccountMenuVisible] = useState(false);

    const ref = useRef<PostMenuRefProps>(null);

    const getPostData = async (page: number) => {
        console.log(`getPostData called with page: ${page}`);
        try {
            const res = await axios.post(`${IP}/post/user`, { page: page });
            setPosts((posts) => [...posts, ...res.data.posts]);
        } catch (error) {
            console.log(error);
        }
    };

    let UserPostProps = {
        posts,
        postPage,
        setPostPage,
        setPosts,
        postRefresh,
        setPostRefresh,
        getPostData,
    };

    const getCommentData = async (page: number) => {
        try {
            const res = await axios.post(`${IP}/comment/user`, { page: page });
            setCommentsWithPosts([
                ...commentsWithPosts,
                ...res.data.commentsWithPosts,
            ]);
        } catch (error) {
            console.log(error);
        }
    };

    let UserCommentProps: UserCommentProps = {
        commentsWithPosts,
        commentPage,
        setCommentPage,
        setCommentsWithPosts,
        commentRefresh,
        setCommentRefresh,
        getCommentData,
    };

    let ProfileTabProps = {
        UserPostProps,
        UserCommentProps,
    };

    const sheetRef = useRef<BottomSheet>(null);

    const [sheetOpen, setSheetOpen] = useState(false);

    const handlePresentModalPress = useCallback(() => {
        if (sheetOpen) {
            sheetRef.current?.close();
            setSheetOpen(false);
        } else {
            sheetRef.current?.expand();
            setSheetOpen(true);
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    width: "100%",
                    padding: 10,
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                }}
            >
                <TouchableOpacity>
                    <Ionicons name="menu" color="black" size={32} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onPress={() => setIsAccountMenuVisible(true)}
                >
                    <Text
                        style={{
                            color: "white",
                            marginTop: 8,
                            fontWeight: "600",
                            fontSize: 18,
                        }}
                    >
                        {username}
                    </Text>
                    <Ionicons
                        name="chevron-down"
                        size={24}
                        color={PRIMARY_COLOR}
                        style={{
                            marginLeft: 4,
                            paddingTop: 12,
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePresentModalPress}>
                    <Ionicons name="menu" color="white" size={32} />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-evenly",
                }}
            >
                <Image
                    style={{
                        width: "30%",
                        height: "auto",
                        borderRadius: 100,
                        aspectRatio: 1 / 1,
                    }}
                    source={
                        user?.profile_picture.url
                            ? { uri: user?.profile_picture.url }
                            : require("../assets/default_icon.png")
                    } /*require path is for static images only*/
                />
                <View
                    style={{
                        flexDirection: "column",
                        alignItems: "center",
                        alignContent: "center",
                        justifyContent: "space-around",
                    }}
                >
                    <View
                        style={{
                            alignItems: "center",
                            alignContent: "center",
                        }}
                    >
                        <View
                            style={{
                                alignItems: "center",
                                alignContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: 22,
                                    fontWeight: "700",
                                }}
                            >
                                {posts?.length}
                            </Text>
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: 14,
                                    marginBottom: 8,
                                }}
                            >
                                Post{posts?.length != 1 ? "s" : null}
                            </Text>
                        </View>
                        <Text
                            style={{
                                backgroundColor: "#19282F",
                                color: "white",
                                borderRadius: 5,
                                padding: 5,
                                paddingHorizontal: 8,
                            }}
                        >
                            @{user?.email.split("@")[0]}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "column",
                        justifyContent: "space-around",
                    }}
                >
                    <View
                        style={{
                            alignItems: "center",
                            alignContent: "center",
                        }}
                    >
                        <View
                            style={{
                                alignItems: "center",
                                alignContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: 22,
                                    fontWeight: "700",
                                }}
                            >
                                '{user?.email.split("@")[0].slice(0, 2)}
                            </Text>
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: 14,
                                    marginBottom: 8,
                                }}
                            >
                                SBASSE
                            </Text>
                        </View>
                        <Text
                            style={{
                                backgroundColor: "#19282F",
                                color: "white",
                                borderRadius: 5,
                                padding: 5,
                                paddingHorizontal: 8,
                            }}
                        >
                            <Feather name="calendar" size={16} color="white" />{" "}
                            Aug 2023
                        </Text>
                    </View>
                </View>
            </View>

            <Text
                style={{
                    color: "white",
                    width: "90%",
                    marginTop: 8,
                }}
            >
                {bio}
            </Text>
            <TouchableOpacity
                style={styles.editProfileBttn}
                onPress={() => {
                    navigation.navigate("EditProfile");
                }}
            >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                    Edit profile
                </Text>
            </TouchableOpacity>
            <ProfileTabs ref={ref} {...ProfileTabProps} />
            <ProfileBurger ref={sheetRef} />
            <AccountMenu
                isVisible={isAccountMenuVisible}
                onClose={() => setIsAccountMenuVisible(false)}
            />
        </SafeAreaView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },
    editProfileBttn: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#35C2C1",
        borderRadius: 5,
        width: "90%",
        padding: 4,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 12,
    },
    menuIcon: {
        position: "absolute",
        top: 44, // Adjust top margin to match your status bar height
        right: 16, // Keep the icon on the right side
        zIndex: 10, // Ensure the icon is above other elements
    },
    scrollPost: {},
    postMenu: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
    },
});
