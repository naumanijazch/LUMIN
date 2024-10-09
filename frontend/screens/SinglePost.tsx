import {
    Button,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Post from "../components/Post";
// import Comments from "./Comments";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import axios from "axios";
import { IP } from "../constants/ip";
import { useAppSelector } from "../redux/hooks";
import Comment from "../components/Comment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import Animated, {
    SlideInDown,
    SlideOutDown,
    FadeIn,
    FadeOut,
} from "react-native-reanimated";
import { HEIGHT, OVERDRAG } from "../constants/size";
import { BACKDROP_COLOR, PRIMARY_COLOR } from "../constants/color";
import NewPostMenu from "../components/NewPostMenu";
import Loader from "../components/Loader";

const findCommentById = (comments: any, commentId: any) => {
    for (const comment of comments) {
        if (comment._id === commentId) {
            return comment;
        }

        if (comment.replies && comment.replies.length > 0) {
            const foundInReplies: any = findCommentById(
                comment.replies,
                commentId
            );
            if (foundInReplies) {
                return foundInReplies;
            }
        }
    }

    return null; // Comment not found
};

const SinglePost = ({ route }: any) => {
    // console.log(route.params.postProps)
    const [newComment, setNewComment] = useState("");
    const { postID } = route.params.postProps;
    const inputRef = useRef<any>(null);
    const [additionalData, setAdditionalData] = useState({
        id: "-1",
        name: "nan",
    });
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState("");

    const { user } = useAppSelector((state) => state.auth);
    const [commentsData, setCommentsData] = useState<any[]>([]);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<any>();
    const [visible, setVisible] = useState(false);
    const { postProps } = route.params;

    const toggleSheet = (postProps: any) => {
        setVisible(!visible);
        setIsOpen(!isOpen);
        setSelectedPost(postProps);
    };
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

    const handlePress = () => {
        if (inputRef.current) {
            // Focus on the input when "Press me to input" is pressed
            inputRef.current.focus();
        }
    };

    const deleteComment = (commentId: any) => {
        // Filter out the deleted comment from the comment list

        const updatedComments = commentsData.filter(
            (comment) => comment._id !== commentId
        );
        setCommentsData(updatedComments);
    };

    const handleDataChange = (newData: any) => {
        // Update the additionalData in the parent component
        setAdditionalData(newData);
    };

    const submitHandler = async () => {
        const commentData = newComment;
        if (commentData.trim() === "" || commentData.length === 0) {
            return;
        }

        setNewComment("");
        try {
            // Dummy data for the new comment
            // const newCommentData = {
            //   _id: Math.random().toString(),
            //   postedBy: {fullname: user.name},
            //   text: newComment,
            //   replies: [],
            //   level: 0, // Top-level comment
            // };

            if (additionalData.id !== "-1") {
                // Replying to a comment
                // console.log(additionalData.id)
                const commentToReplyTo = findCommentById(
                    commentsData,
                    additionalData.id.toString()
                );
                // console.log(commentToReplyTo)
                if (commentToReplyTo) {
                    try {
                        const { data } = await axios.post(
                            `${IP}/comment/reply`,
                            {
                                postId: postID,
                                commentId: additionalData.id,
                                text: newComment,
                            }
                        );

                        // commentToReplyTo.replies.pop();
                        commentToReplyTo.replies.push(data.reply);
                        // setNewComment("");
                    } catch (error) {
                        console.log(error);
                    }
                }
            } else {
                try {
                    const { data } = await axios.post(`${IP}/comment/create`, {
                        postId: postID,
                        text: newComment,
                    });
                    // Handle the response data as needed
                    setCommentsData((prevComments) => [
                        ...(prevComments || []),
                        data.comment,
                    ]);
                    // setNewComment("");

                    // Close the modal and clear the reply text
                } catch (error) {
                    // Handle the error
                    console.error("Error submitting reply:", error);
                }
            }

            // Update state with the new comment

            setNewComment("");

            // Close the modal and clear the reply text
        } catch (error) {
            console.error("Error submitting reply:", error);
        }
    };

    useEffect(() => {
        const fetchComments = async () => {
            // console.log(postID)
            try {
                const { data } = await axios.post(`${IP}/comment/get`, {
                    postId: postID,
                });
                setCommentsData(data.comments);
                setUserId(data.userId);
                setLoading(false);

                // console.log(data.comments)
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [postID]);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            {/* <View style={{flex:1}}> */}
            <ScrollView contentContainerStyle={styles.container}>
                <Post
                    name={postProps.name}
                    profileImage={postProps.profileImage}
                    body={postProps.body}
                    media={postProps.media} // make this an array
                    likes={postProps.likeCountUpdated}
                    dislikes={postProps.dislikeCountUpdated}
                    comments={postProps.comments}
                    liked={postProps.likedUpdated}
                    disliked={postProps.dislikedUpdated}
                    postID={postProps.postID}
                    toggleSheet={toggleSheet}
                    bookmarked={postProps.bookmarked}
                />
                <View style={{ ...styles.container, paddingLeft: 10 }}>
                    <View style={styles.topContainer}>
                        <Text style={{ color: "grey", fontSize: 17 }}>
                            Comments
                        </Text>
                    </View>

                    {/* <FlatList
      data={commentsData}
      keyExtractor={(item, _) => item._id.toString()}
       renderItem={({ item }) => 
    
      <Comment comment={item} showReplies={false} onPress={handlePress} onDataChange={handleDataChange} />
  }

    /> */}

                    {loading ? (
                        <Loader />
                    ) : (
                        commentsData?.map((item) => (
                            <Comment
                                key={item?._id.toString()} // Ensure each item has a unique key
                                comment={item}
                                showReplies={false}
                                userId={userId}
                                onPress={handlePress}
                                onDataChange={handleDataChange}
                                deleteComment={deleteComment}
                                postId={postID}
                            />
                        ))
                    )}
                    {/* {additionalData.name !== 'nan' && (
     <View style={{...styles.userInfoContainer, marginBottom:0}}>
     <Text style={{color: "white"}}>Replying to </Text><Text style={{color: "white",fontWeight: "bold" }}>{additionalData.name}</Text>
    <TouchableOpacity onPress={() => setAdditionalData({ id: "-1", name: "nan" })}>
      <Text style={{ color: "grey", opacity: 50, paddingLeft: 30 }}>Cancel</Text>
    </TouchableOpacity>
     </View>)
    } */}
                </View>
            </ScrollView>

            <View style={{ flexDirection: "column" }}>
                {additionalData.name !== "nan" && (
                    <View
                        style={{ ...styles.userInfoContainer, marginBottom: 0 }}
                    >
                        <Text style={{ color: "white" }}>Replying to </Text>
                        <Text style={{ color: "white", fontWeight: "bold" }}>
                            {additionalData.name}
                        </Text>
                        <TouchableOpacity
                            onPress={() =>
                                setAdditionalData({ id: "-1", name: "nan" })
                            }
                        >
                            <Text
                                style={{
                                    color: "grey",
                                    opacity: 50,
                                    paddingLeft: 30,
                                }}
                            >
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                <View style={styles.newCommentContainer}>
                    <TextInput
                        style={styles.newCommentInput}
                        placeholder="Enter a new comment"
                        value={newComment}
                        onChangeText={setNewComment}
                        placeholderTextColor={"#8e8e8e"}
                        ref={inputRef}
                    />
                    <TouchableOpacity onPress={submitHandler}>
                        <View style={styles.buttonStyle}>
                            <MaterialCommunityIcons
                                name="send"
                                size={35}
                                color={"#35C2C1"}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
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
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 0,
        backgroundColor: "black",
    },
    postMenu: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
    },
    newCommentInput: {
        flex: 1,
        height: 40,
        // borderColor: "#ddd",
        // borderWidth: 1,
        backgroundColor: "#272727",
        borderRadius: 100,
        marginRight: 10,
        marginLeft: 10,
        paddingHorizontal: 8,
        color: "white",
    },
    buttonStyle: {
        backgroundColor: "#272727",
        justifyContent: "center",
        // flexDirection:"row",
        // paddingVertical: 10,
        // paddingHorizontal: 20,
        padding: 8,
        height: 50,
        width: 50,
        borderRadius: 100, // Adjust the value as needed for rounded corners
        marginLeft: 0,
        marginRight: 10,
        // transform: [{ rotate: '310deg' }]
    },
    userInfoContainer: {
        flexDirection: "row",

        backgroundColor: "black",
        borderWidth: 1,

        paddingLeft: 10,
    },
    newCommentContainer: {
        // position:"absolute",
        flexDirection: "row",

        backgroundColor: "black",

        alignItems: "center",

        paddingTop: 5,
        paddingBottom: 0,
    },
    topContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
        padding: 0,
        // borderColor: "white",
        // borderWidth: 1,
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

export default SinglePost;
