import {
    Alert,
    Button,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { IP } from "../constants/ip";

const Comment = ({
    comment,
    showReplies,
    userId,
    onReplySubmit,
    onPress,
    onDataChange,
    deleteComment,
    postId,
}: any) => {
    const [showRepliesInside, setShowReplies] = useState(false);
    const [upvotes, setUpvotes] = useState(0);
    const [downvotes, setDownvotes] = useState(0);
    const [upVoted, setUpVoted] = useState(false);
    const [downVoted, setDownVoted] = useState(false);
    const [replies, setReplies] = useState(false);

    const [editMode, setEditMode] = useState(false);
    const [editedText, setEditedText] = useState(comment.text);
    const commentUserId: string = comment.postedBy._id;
    const myId: string = userId;

    const handleEdit = () => {
        setEditMode(!editMode);
    };

    const handleSave = async () => {
        try {
            const res = await axios.post(`${IP}/comment/update`, {
                commentId: comment._id,
                text: editedText,
            });
            console.log("Comment updated successfully:", res.data);
            comment.text = editedText;

            setEditMode(false);
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    const handleDelete = () => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this comment?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: () => deleteCommentInternal(), // Call the function to delete comment
                    style: "destructive",
                },
            ],
            { cancelable: true }
        );
    };

    // Function to delete comment
    const deleteCommentInternal = async () => {
        try {
            const res = await axios.post(`${IP}/comment/delete`, {
                postId: postId,
                commentId: comment._id,
            });

            // console.log("Comment deleted successfully:", res.data);

            deleteComment(comment._id);
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const deleteReply = (replyId: any) => {
        // Filter out the deleted reply from the replies list
        const updatedReplies = comment.replies.filter(
            (reply: any) => reply._id !== replyId
        );
        comment.replies = updatedReplies;
        if (updatedReplies.length === 0) {
            // setReplies(false);
            setShowReplies(false);
        } else {
            setReplies(false);
            setReplies(true);
        }
    };

    useEffect(() => {
        comment?.likeCount ? setUpvotes(comment.likeCount) : setUpvotes(0);
        comment?.dislikeCount
            ? setDownvotes(comment.dislikeCount)
            : setDownvotes(0);

        const isCurrentUserDisliked = comment?.isDislikedByUser ? true : false;
        const isCurrentUserLiked = comment?.isLikedByUser ? true : false;
        if (isCurrentUserLiked) {
            setUpVoted(true);
        } else {
            setUpVoted(false);
        }
        if (isCurrentUserDisliked) {
            setDownVoted(true);
        } else {
            setDownVoted(false);
        }
    }, [comment?.likeCount, comment?.dislikeCount]);

    const toggleReplies = () => {
        setShowReplies(!showRepliesInside);
    };

    useEffect(() => {
        // console.log("hfsefa")
        if (showRepliesInside) {
            const data = axios.post(`${IP}/comment/replies`, {
                commentId: comment._id,
            });
            data.then((res) => {
                comment.replies = res.data.replies;
                setReplies(true);
            }).catch((error) => {
                console.log(error);
            });

            // console.log(replies);
        }
    }, [showRepliesInside]);

    const [data, setData] = useState({
        id: "-1",
        name: "NaN",
    });

    // console.log(comment)

    const handlePress = () => {
        const userName = comment.postedBy ? comment.postedBy.fullname : "";
        const newData = {
            id: comment._id,
            name: userName,
        };
        setData(newData);
        // Pass the modified data to the parent component
        onDataChange ? onDataChange(newData) : "";
        onPress ? onPress() : "";
    };
    const handleUpVote = () => {
        if (downVoted) {
            setDownvotes((prevDownvotes) => prevDownvotes - 1);
            setUpvotes((prevUpvotes) => prevUpvotes + 1);
            setDownVoted(false);
            setUpVoted(true);
            submitVote("del_down")
                .then(() => {
                    submitVote("up");
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (upVoted) {
            setUpvotes((prevUpvotes) => prevUpvotes - 1);
            setUpVoted(false);
            submitVote("del_up");
        } else {
            setUpvotes((prevUpvotes) => prevUpvotes + 1);
            setUpVoted(true);
            submitVote("up");
        }
    };

    const handleDownVote = () => {
        if (upVoted) {
            setUpvotes((prevUpvotes) => prevUpvotes - 1);
            setDownvotes((prevDownvotes) => prevDownvotes + 1);
            setUpVoted(false);
            setDownVoted(true);
            submitVote("del_up")
                .then(() => {
                    submitVote("down");
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (downVoted) {
            setDownvotes((prevDownvotes) => prevDownvotes - 1);
            setDownVoted(false);
            submitVote("del_down");
        } else {
            setDownvotes((prevDownvotes) => prevDownvotes + 1);
            setDownVoted(true);
            submitVote("down");
        }
    };

    const submitVote = async (vote: string) => {
        try {
            const res = await axios.post(`${IP}/comment/vote`, {
                commentId: comment._id,
                voteType: vote,
            });
            // console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View
            style={{
                paddingBottom: 5,
                marginTop: 2,
                marginLeft: comment.level !== 0 ? 10 : 0,
            }}
        >
            <View style={styles.userInfoContainer}>
                <View
                    style={comment.level !== 0 ? styles.lineContainer : null}
                ></View>
                <Image
                    source={
                        comment.postedBy.profile_picture?.url
                            ? {
                                  uri: comment.postedBy.profile_picture?.url,
                              }
                            : require("../assets/default_icon.png")
                    }
                    style={{
                        ...styles.profile_picture,
                        width: comment.level !== 0 ? 20 : 30,
                        height: comment.level !== 0 ? 20 : 30,
                    }}
                />
                <Text
                    style={{
                        ...styles.fullname,
                        fontSize: comment.level !== 0 ? 12 : 14,
                    }}
                >
                    {comment.postedBy ? comment.postedBy.fullname : ""}
                </Text>
            </View>

            <View style={styles.commentContainer}>
                <View
                    style={{
                        ...styles.InnerCommentContainer,
                        borderLeftWidth: showRepliesInside ? 3 : 0,
                    }}
                ></View>

                <View style={styles.commentContent}>
                    {editMode ? (
                        <TextInput
                            value={editedText}
                            onChangeText={setEditedText}
                            autoFocus
                            multiline
                            style={styles.commentText}
                        />
                    ) : (
                        <TouchableOpacity onPress={handlePress}>
                            <Text style={styles.commentText}>
                                {comment.text}
                            </Text>
                        </TouchableOpacity>
                    )}

                    {!editMode ? (
                        commentUserId === myId && (
                            <View
                                style={{
                                    position: "relative",
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                    right: 0,
                                    marginBottom: 1,
                                }}
                            >
                                {onDataChange ? (
                                    <TouchableOpacity onPress={handleEdit}>
                                        <MaterialCommunityIcons
                                            name="pencil"
                                            size={15}
                                            color="white"
                                            style={{ right: 10 }}
                                        />
                                    </TouchableOpacity>
                                ) : (
                                    ""
                                )}
                                {deleteComment ? (
                                    <TouchableOpacity onPress={handleDelete}>
                                        <MaterialCommunityIcons
                                            name="delete"
                                            size={15}
                                            color="white"
                                            style={{ right: 0 }}
                                        />
                                    </TouchableOpacity>
                                ) : (
                                    ""
                                )}
                            </View>
                        )
                    ) : (
                        <View
                            style={{
                                position: "relative",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                right: 0,
                                marginBottom: 1,
                            }}
                        >
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                onPress={handleSave}
                            >
                                <Text>save</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <View style={styles.voteContainer}>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                            onPress={handleUpVote}
                            style={{ padding: 1 }}
                        >
                            <MaterialCommunityIcons
                                name="arrow-up-bold"
                                size={20}
                                color={upVoted ? "#35C2C1" : "white"}
                            />
                        </TouchableOpacity>

                        <Text style={{ fontStyle: "italic", color: "white" }}>
                            {upvotes}
                        </Text>
                    </View>
                    <View style={{ marginLeft: 40, flexDirection: "row" }}>
                        <TouchableOpacity
                            onPress={handleDownVote}
                            style={{ padding: 1 }}
                        >
                            <MaterialCommunityIcons
                                name="arrow-down-bold"
                                size={20}
                                color={downVoted ? "#35C2C1" : "white"}
                            />
                        </TouchableOpacity>
                        <Text style={{ fontStyle: "italic", color: "white" }}>
                            {downvotes}
                        </Text>
                    </View>
                    {comment.replies && comment.replies.length > 0 && (
                        <View style={{ position: "absolute", right: 40 }}>
                            {/* <View style={{ flexDirection: "row", right: 0 }}> */}
                            <TouchableOpacity
                                onPress={toggleReplies}
                                style={{ flexDirection: "row" }}
                            >
                                {showRepliesInside ? (
                                    <MaterialCommunityIcons
                                        name="chevron-up"
                                        size={20}
                                        color="white"
                                    />
                                ) : (
                                    <>
                                        <Text
                                            style={{
                                                top: 2,
                                                fontSize: 12,
                                                color:
                                                    comment.replies.length > 0
                                                        ? "white"
                                                        : "grey",
                                                fontStyle: "italic",
                                                bottom: 10,
                                            }}
                                        >
                                            {comment.replies.length}{" "}
                                            {comment.replies.length > 1
                                                ? "Replies"
                                                : "Reply"}
                                        </Text>
                                        <View style={{ marginLeft: 0 }}>
                                            <MaterialCommunityIcons
                                                name="chevron-double-down"
                                                size={20}
                                                color="#35C2C1"
                                            />
                                        </View>
                                    </>
                                )}
                            </TouchableOpacity>
                            {/* </View> */}
                        </View>
                    )}
                </View>
            </View>
            {/* )} */}

            {comment.replies &&
                comment.replies.length > 0 &&
                showRepliesInside &&
                // <FlatList
                //   data={comment.replies}
                //   keyExtractor={(commentId, _) => commentId._id.toString()}
                //   renderItem={({ item, index }) => (
                //     <>
                //       {index !== comment.replies.length - 1 && (
                //         <View style={styles.commentContainer}>
                //            <View style={styles.InnerCommentContainer}>
                //            </View>
                //           <Comment comment={item} showReplies={showRepliesInside} onReplySubmit={onReplySubmit} onPress = {onPress} onDataChange = {onDataChange}/>
                //         </View>

                //       )}
                //       {index === comment.replies.length - 1 && (
                //         <View style={{ ...styles.commentContainer, borderColor: "transparent"}}>
                //            {/* <View style={{...styles.InnerCommentContainer,borderColor:"transparent"}}> */}

                //         <Comment comment={item} showReplies={showRepliesInside} onReplySubmit={onReplySubmit} onPress = {onPress} onDataChange = {onDataChange} />
                //         </View>

                //       )}
                //     </>
                //   )}
                // />
                comment &&
                replies &&
                comment.replies.map((item: any, index: any) => (
                    <View
                        key={item._id.toString()}
                        style={styles.commentContainer}
                    >
                        {index !== comment.replies.length - 1 && (
                            <View style={styles.InnerCommentContainer}></View>
                        )}
                        <Comment
                            comment={item}
                            showReplies={showRepliesInside}
                            userId={userId}
                            onReplySubmit={onReplySubmit}
                            onPress={onPress}
                            onDataChange={onDataChange}
                            deleteComment={deleteReply}
                            postId={postId}
                        />
                    </View>
                ))}
        </View>
    );
};

const styles = StyleSheet.create({
    InnerCommentContainer: {
        position: "absolute",
        left: 0,
        right: 644,
        bottom: 0,
        height: "100%",
        width: 0,
        marginBottom: 0,
        borderLeftWidth: 3,
        borderLeftColor: "#3C4848",

        paddingTop: 0,
        marginLeft: 0,
        paddingLeft: 0,

        // backgroundColor: "#195e5e",

        // borderColor:"white",
        // borderWidth:4,

        // borderRadius: 5,

        // padding: 0,
    },
    commentContainer: {
        marginBottom: 0,
        // borderLeftWidth: 3,

        paddingTop: 0,
        marginLeft: 15,
        paddingLeft: 0,

        // backgroundColor: "#195e5e",
        // borderWidth: 1,

        // borderRadius: 5,

        padding: 0,
    },
    lineContainer: {
        position: "absolute",
        left: -10,
        right: 644,
        bottom: 15,
        height: 50,
        width: 30,
        borderLeftWidth: 3,
        borderBottomWidth: 3,
        // marginRight:0,
        // padding:10,
        // borderBottomColor: "white",
        // borderWidth: 1,
        // borderBlockColor: "white",
        paddingTop: 0,
        borderBottomLeftRadius: 5,
        paddingLeft: 0,
        // marginLeft: 10,
        borderColor: "#3C4848",
    },

    userInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
        // borderColor: "white",

        // paddingLeft: 10,
        //  borderWidth: 1,
        marginTop: 3,

        paddingLeft: 1,
        marginBottom: 0,
    },
    profile_picture: {
        width: 40,
        height: 40,
        borderRadius: 100,
        marginRight: 5,
        marginLeft: 1,
    },
    fullname: {
        fontSize: 24,

        // fontWeight: "bold",

        color: "white",
    },
    voteContainer: {
        flexDirection: "row",
        // borderColor:"white",
        // borderWidth:2,

        paddingLeft: 20,
    },
    commentContent: {
        marginBottom: 1,
        backgroundColor: "#272727",
        borderTopLeftRadius: 0,
        borderRadius: 25,
        padding: 13,
        marginLeft: 10,
        marginRight: 20,
        // borderColor: "grey",
    },
    commentText: {
        fontSize: 14,
        lineHeight: 20,
        color: "white",
    },
    buttonStyle: {
        backgroundColor: "#35C2C1",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10, // Adjust the value as needed for rounded corners
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5, // For Android shadow
    },
});

export default Comment;
