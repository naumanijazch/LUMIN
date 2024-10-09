import {
    StyleSheet,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    View,
    Pressable,
} from "react-native";

import Post from "../components/Post";
import React, { useState } from "react";
import { IP } from "../constants/ip";
import axios from "axios";
import { useEffect } from "react";
import NewPostMenu from "../components/NewPostMenu";
import { HEIGHT, OVERDRAG } from "../constants/size";
import {
    BACKDROP_COLOR,
    POST_LIKE_INACTIVE_COLOR,
    PRIMARY_COLOR,
} from "../constants/color";
import Animated, {
    SlideInDown,
    SlideOutDown,
    FadeIn,
    FadeOut,
} from "react-native-reanimated";
import { PostProps } from "../components/Post";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Loader from "../components/Loader";

// const media = [
//   "https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg?auto=compress&cs=tinysrgb&w=600",
//   "https://picsum.photos/306",
// ];

const LdfHomePage = ({ navigation }: any) => {
    const [posts, setPosts] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<any>();
    const [visible, setVisible] = useState(false);

    const toggleSheet = (post: PostProps) => {
        setVisible(!visible);
        setIsOpen(!isOpen);
        setSelectedPost(post);
    };
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
    // const ref = useRef<PostMenuRefProps>(null);

    const getData = async (page: number) => {
        try {
            const res = await axios.post(`${IP}/post/feed`, { page: page });

            setPosts((posts) => [...posts, ...res.data.posts]);
        } catch (error) {
            console.log(error);
        }
    };
    // will run every time page changes
    useEffect(() => {
        getData(page);
    }, [page, refresh]);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={styles.scrollPost}
                data={posts}
                onEndReached={() => {
                    if (posts.length < 10) return;
                    else setPage(page + 1);
                }}
                onRefresh={() => {
                    setPosts([]);
                    setPage(0);
                    setRefresh(!refresh);
                }}
                refreshing={false}
                onEndReachedThreshold={0.9}
                ListFooterComponent={() => {
                    return (
                        <View
                            style={{
                                marginVertical: "25%",
                            }}
                        >
                            <Loader />
                        </View>
                    );
                }}
                renderItem={({ item }) => (
                    <Post
                        key={item._id}
                        name={item.postedBy?.fullname || "Deleted User"}
                        profileImage={item.postedBy?.profile_picture?.url}
                        body={item.text}
                        media={item.media}
                        likes={item.likeCount}
                        dislikes={item.dislikeCount}
                        comments={item.commentCount}
                        liked={item.isLikedbyUser}
                        disliked={item.isDislikedbyUser}
                        postID={item._id}
                        toggleSheet={toggleSheet}
                        bookmarked={item.isBookmarkedByUser}
                        // postMenuRef={ref}
                    />
                )}
                extraData={posts}
            />
            {isOpen && (
                <>
                    <AnimatedPressable
                        style={styles.backdrop}
                        entering={FadeIn}
                        exiting={FadeOut}
                        onPress={() => toggleSheet(selectedPost)}
                    />
                    <Animated.View
                        style={styles.sheet}
                        entering={SlideInDown.springify().damping(15)}
                        exiting={SlideOutDown}
                    >
                        <NewPostMenu
                            name={selectedPost.name}
                            profileImage={selectedPost.profileImage}
                            body={selectedPost.body}
                            media={selectedPost.media}
                            likes={selectedPost.likes}
                            dislikes={selectedPost.dislikes}
                            comments={selectedPost.comments}
                            liked={selectedPost.liked}
                            disliked={selectedPost.disliked}
                            postID={selectedPost.postID}
                            bookmarked={selectedPost.bookmarked}
                        />
                    </Animated.View>
                </>
            )}
            <TouchableOpacity
                style={{
                    position: "absolute",
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                    backgroundColor: PRIMARY_COLOR,
                    bottom: 15,
                    right: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: visible ? -1 : 1000,
                }}
                onPress={() => navigation.navigate("AddPost")}
            >
                <MaterialCommunityIcons
                    name="feather"
                    size={30}
                    color="black"
                />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default LdfHomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
    },
    scrollPost: {
        width: "100%",
    },
    sheet: {
        backgroundColor: "black",
        borderColor: "rgba(140,140,140,1)",
        borderWidth: 0.5,
        borderTopLeftWidth: 1,
        opacity: 1,
        height: HEIGHT / 1.8,
        width: "101%",
        position: "absolute",
        bottom: -OVERDRAG * 1.5,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 9000,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: BACKDROP_COLOR,
        zIndex: 1,
    },
});
