//COLOR DONE
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useCallback, useState, memo } from "react";
import { useEffect, useRef } from "react";
import { IP } from "../constants/ip";
import axios from "axios";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Foundation } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { debounce } from "lodash";
import {
    PRIMARY_COLOR,
    POST_BCKG_COLOR,
    POST_BOOKMARK_ICON_COLOR,
    POST_BORDER_COLOR,
    POST_COMMENT_COUNT_COLOR,
    POST_COMMENT_ICON_COLOR,
    POST_DISLIKE_ACTIVE_COLOR,
    POST_DISLIKE_COUNT_ACTIVE_COLOR,
    POST_DISLIKE_COUNT_INACTIVE_COLOR,
    POST_DISLIKE_INACTIVE_COLOR,
    POST_LIKE_ACTIVE_COLOR,
    POST_LIKE_COUNT_ACTIVE_COLOR,
    POST_LIKE_COUNT_INACTIVE_COLOR,
    POST_LIKE_INACTIVE_COLOR,
    POST_MEDIA_BADGE_BCKG_COLOR,
    POST_MEDIA_BADGE_TEXT_COLOR,
    POST_OPTIONS_ICON_COLOR,
    POST_POSTER_NAME_COLOR,
    POST_TEXT_COLOR,
} from "../constants/color";
import MediaCard from "./MediaCard";

export type PostProps = {
    name: string;
    profileImage: string;
    body: string;
    media: string[]; // revisit the type of image
    likes: number;
    dislikes: number;
    comments: number;
    liked: boolean;
    disliked: boolean;
    postID: string;
    bookmarked: boolean;
    toggleSheet?: (post: PostProps) => void | null;
};

const Post = (
    props: PostProps /*{ { postMenuRef: React.RefObject<PostMenuRefProps> }}*/ /// The PostMenuRef is causing the non-serlizable value warning, you have to find a workaround for this
) => {
    const navigation = useNavigation<NavigationProp<any>>();
    const [liked, setLiked] = useState(props.liked);
    const [disliked, setDisliked] = useState(props.disliked);
    const [likeCount, setLikeCount] = useState<any>(props.likes);
    const [dislikeCount, setDislikeCount] = useState<any>(props.dislikes);

    const [update, setUpdate] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [bookmarked, setBookmarked] = useState(props.bookmarked);
    const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            var firstVisibleItemIndex = viewableItems[0].index ?? 0;
            firstVisibleItemIndex += 1;
            setCurrentIndex(firstVisibleItemIndex);
        }
    }, []);

    // Define the viewabilityConfig
    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50, // Consider an item visible if 50% or more of it is visible
    };

    // const ref = props.postMenuRef;

    // const onOptionSelect = useCallback(async () => {
    //   const isActive = ref?.current?.isActive();
    //   ref?.current?.setPostPropsFunc(props);

    // const bookmarkHandler = async () => {
    //     try {
    //         const res = await axios.post(`${IP}/post/bookmark`, {
    //             postId: props.postID,
    //         });
    //         setBookmarked(!bookmarked);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const submitBookmark = async (bookmark: boolean) => {
        try {
            if (bookmark) {
                const res = await axios.post(`${IP}/post/bookmark`, {
                    postId: props.postID,
                });
                console.log(res.data);
            } else {
                const res = await axios.post(`${IP}/post/unbookmark`, {
                    postId: props.postID,
                });
                console.log(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const bookmarkHandler = () => {
        console.log("sent");
        if (bookmarked) {
            setBookmarked(false);
            submitBookmark(false).catch((error) => {
                console.log(error);
            });
        } else {
            setBookmarked(true);
            submitBookmark(true).catch((error) => {
                console.log(error);
            });
        }
    };

    const debouncedBookmarkHandler = debounce(bookmarkHandler, 200);

    const likePressed = async () => {
        let originalData = { liked: liked, disliked: disliked };

        try {
            if (originalData.liked) {
                setLikeCount(likeCount - 1);
            } else {
                setLikeCount(likeCount + 1);
            }
            if (originalData.disliked) {
                setDisliked(false);
                setDislikeCount(dislikeCount - 1);
            }

            setLiked(!liked); // Reverse the liked status

            setUpdate(!update);
            //////// NOW WE HAVE DONE IT ON THE FRONTEND, LETS DO IT ON THE BACKEND

            const res = await axios.post(`${IP}/post/like`, {
                postId: props.postID,
            });

            if (originalData.disliked == true) {
                const res2 = await axios.post(`${IP}/post/dislike`, {
                    postId: props.postID,
                });
            }
            console.log(res.data); // SEND LIKE REQUEST

            // console.log("Sent Like Request");
        } catch (error) {
            console.log(error);
        }
    };

    const dislikePressed = async () => {
        let originalData = { liked: liked, disliked: disliked };

        try {
            if (originalData.disliked) {
                setDislikeCount(dislikeCount - 1);
            } else {
                setDislikeCount(dislikeCount + 1);
            }
            if (originalData.liked) {
                setLiked(false);
                setLikeCount(likeCount - 1);
            }
            setDisliked(!disliked); // Reverse the disliked status
            setUpdate(!update);

            const res = await axios.post(`${IP}/post/dislike`, {
                postId: props.postID,
            });

            if (originalData.liked == true) {
                // console.log("Was Liked Earlier -> Decrementing  ");
                const res2 = await axios.post(`${IP}/post/like`, {
                    postId: props.postID,
                });
                console.log(res2.data);
            }
            console.log(res.data);

            // console.log("Sent Dislike Request");
        } catch (error) {
            console.log(error);
        }
    };
    // const submitLikeDislike = async (option: string) => {
    //   try {
    //     const res = await axios.post(`${IP}/post/${option}`, {
    //       postId: props.postID,
    //     });

    //     console.log(res.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    useEffect(() => {
        setLiked(liked);
        setDisliked(disliked);
    }, [update]);

    return (
        <View style={styles.post}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    const { toggleSheet, ...rest } = props;
                    navigation.navigate("SinglePost", {
                        postProps: {
                            ...rest,
                            likedUpdated: liked,
                            dislikedUpdated: disliked,
                            likeCountUpdated: likeCount,
                            dislikeCountUpdated: dislikeCount,
                            bookmarked: bookmarked,
                        },
                    });
                }}
            >
                <View style={styles.headerPost}>
                    <View style={styles.profileComponent}>
                        {/* Image and Name are One Element so we have a separate View(div) for them */}
                        <Image
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50 / 2,
                            }}
                            source={
                                props.profileImage
                                    ? { uri: props.profileImage }
                                    : require("../assets/default_icon.png")
                            } /*require path is for static images only*/
                        />
                        <Text style={styles.posterName}>{props.name}</Text>
                    </View>
                    {/* Here include the the on pressable functions for options select for the old Post Menu */}
                    <TouchableOpacity
                        style={styles.options}
                        onPress={() => props.toggleSheet?.(props)}
                    >
                        <SimpleLineIcons
                            name="options-vertical"
                            size={18}
                            color="grey"
                        />
                    </TouchableOpacity>
                </View>

                <Text style={styles.bodyFont}>{props.body}</Text>
            </TouchableOpacity>
            {props.media?.length == 0 ? null : (
                <View style={styles.imageFlatlist}>
                    <FlatList
                        refreshing={true}
                        style={styles.imageScroll}
                        data={props.media}
                        horizontal={true}
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => {
                                    const { toggleSheet, ...rest } = props;
                                    navigation.navigate("PostMediaScroll", {
                                        postProps: {
                                            ...rest,
                                            likedUpdated: liked,
                                            dislikedUpdated: disliked,
                                            likeCountUpdated: likeCount,
                                            dislikeCountUpdated: dislikeCount,
                                        },
                                        index: index,
                                    });
                                }}
                            >
                                <View style={styles.mediaBox}>
                                    <Text style={styles.mediaBadge}>
                                        {index + 1} / {props.media.length}
                                    </Text>

                                    <MediaCard media={item} />
                                </View>
                            </TouchableOpacity>
                        )}
                    ></FlatList>
                </View>
            )}

            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    navigation.navigate("SinglePost", {
                        postProps: {
                            ...props,
                            // ref: ref,
                            likedUpdated: liked,
                            dislikedUpdated: disliked,
                            likeCountUpdated: likeCount,
                            dislikeCountUpdated: dislikeCount,
                        },
                    });
                }}
            >
                <View style={styles.footerPost}>
                    <View style={styles.leftFooter}>
                        <View style={styles.likeDislike}>
                            <TouchableOpacity
                                style={styles.footerComponent}
                                onPress={() => {
                                    likePressed();
                                }}
                            >
                                <Foundation
                                    name="arrow-up"
                                    size={28}
                                    color={liked ? PRIMARY_COLOR : "grey"}
                                />
                                <Text
                                    style={{
                                        color: liked ? "white" : "grey",
                                        fontSize: 10,
                                    }}
                                >
                                    {likeCount}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.footerComponent}
                                onPress={() => {
                                    dislikePressed();
                                }}
                            >
                                <Foundation
                                    name="arrow-down"
                                    size={28}
                                    color={disliked ? PRIMARY_COLOR : "grey"}
                                />
                                <Text
                                    style={{
                                        color: disliked ? "white" : "grey",
                                        fontSize: 10,
                                    }}
                                >
                                    {dislikeCount}
                                </Text>
                                {/* This is grey because it is not pressed(we haven't disliked). We have to make this dynamic rather than static*/}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.comment}>
                            <View style={styles.footerComponent}>
                                <Octicons
                                    name="comment"
                                    size={25}
                                    color="grey"
                                />
                                <Text style={{ color: "grey", fontSize: 10 }}>
                                    {props.comments}
                                </Text>
                                {/* This is grey because it is not pressed (we haven't commented). We have to make this dynamic rather than static*/}
                            </View>
                        </View>
                    </View>
                    <View style={styles.rightFooter}>
                        <View style={styles.rightFooter}>
                            <TouchableOpacity
                                style={styles.footerComponent}
                                onPress={() => {
                                    debouncedBookmarkHandler();
                                }}
                            >
                                <FontAwesome
                                    name={
                                        bookmarked ? "bookmark" : "bookmark-o"
                                    }
                                    size={24}
                                    color={bookmarked ? "#35C2C1" : "grey"}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};
export default memo(Post);

const styles = StyleSheet.create({
    post: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: POST_BCKG_COLOR,
        borderWidth: 0.1,
        borderColor: POST_BORDER_COLOR,
        paddingBottom: 12,
        paddingTop: 12,
        width: "100%",
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        gap: 20,
        marginBottom: 10,
    },
    headerPost: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: "-3%",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    bodyPost: {},
    mediaBox: {
        position: "relative",
    },
    mediaBadge: {
        color: POST_MEDIA_BADGE_TEXT_COLOR,
        position: "absolute",
        zIndex: 1,
        top: 10,
        right: 10,
        backgroundColor: POST_MEDIA_BADGE_BCKG_COLOR,
        borderRadius: 10,
        paddingHorizontal: 5,
        fontSize: 12,
        opacity: 0.8,
    },
    bodyFont: {
        color: POST_TEXT_COLOR,
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 14,
    },
    footerPost: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    leftFooter: {
        display: "flex",
        flexDirection: "row",
        gap: 35,
    },
    likeDislike: {
        display: "flex",
        flexDirection: "row",
        gap: 20,
    },
    comment: {},
    rightFooter: {
        display: "flex",
        flexDirection: "row",
        gap: 30,
        alignItems: "center",
    },
    footerComponent: {
        // used for like, dislike, comment, share and bookmark
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
    },
    posterName: {
        color: POST_POSTER_NAME_COLOR,
        fontWeight: "bold",
        fontSize: 16,
    },
    profileComponent: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
    },
    options: {
        padding: "3%",
        borderRadius: 10,
    },
    imageFlatlist: {
        //   width: SCREEN_WIDTH,
        //   aspectRatio: 16 / 9,
        //   height: "auto",
    },

    imageScroll: {},
});
//  <Image
//    style={{ width: "100%", aspectRatio: 16 / 9, height: "auto" }} // This a temporary solution, what we need to is get the size of the image and set the aspect ratio accordingly so that it takes the whole width and height is set accordingly
//    source={{
//      uri: "https://picsum.photos/304",
//    }} /*require path is for static images only*/
//  />;
