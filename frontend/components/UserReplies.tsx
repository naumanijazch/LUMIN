import { FlatList, View, StyleSheet } from "react-native";
import React, { useEffect, forwardRef, memo } from "react";
import Post from "./Post";
import PostMenu from "./PostMenu";
import { UserPostRef, UserCommentProps } from "../types/userPostTypes";
import PostWithComment from "./PostWithComment";

const UserPosts = forwardRef<UserPostRef, UserCommentProps>((props, ref) => {
  useEffect(() => {
    props.getCommentData(props.commentPage);
  }, [props.commentPage, props.commentRefresh]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <FlatList
        style={styles.scrollPost}
        data={props.commentsWithPosts.sort(
          (a, b) =>
            new Date(b.comment.createdAt).getTime() -
            new Date(a.comment.createdAt).getTime()
        )}
        onEndReached={() => {
          props.setCommentPage(props.commentPage + 1);
        }}
        onRefresh={() => {
          props.setCommentsWithPosts([]);
          props.setCommentPage(0);
          props.setCommentRefresh(!props.commentRefresh);
        }}
        refreshing={false}
        onEndReachedThreshold={0.9}
        renderItem={({ item }) => <PostWithComment {...item} />}
        extraData={props.commentsWithPosts}
      />
    </View>
  );
});

export default memo(UserPosts);

const styles = StyleSheet.create({
  scrollPost: {
    width: "100%",
  },
  postMenu: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});
