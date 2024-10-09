import { FlatList, View, StyleSheet } from "react-native";
import React, { useEffect, forwardRef, memo } from "react";
import Post from "./Post";
import PostMenu from "./PostMenu";
import { UserPostRef, UserPostProps } from "../types/userPostTypes";
import { useState } from "react";
import NewPostMenu from "./NewPostMenu";
import { PostProps } from "./Post";
import Animated, {
  SlideInDown,
  SlideOutDown,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import { Pressable } from "react-native";
import { HEIGHT, OVERDRAG } from "../constants/size";
import { BACKDROP_COLOR } from "../constants/color";

const UserPosts = forwardRef<UserPostRef, UserPostProps>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>();
  const [visible, setVisible] = useState(false);

  const toggleSheet = (post: PostProps) => {
    setVisible(!visible);
    setIsOpen(!isOpen);
    setSelectedPost(post);
  };
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  useEffect(() => {
    props.getPostData(props.postPage);
  }, [props.postPage, props.postRefresh]);
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
        data={props.posts}
        onEndReached={() => {
          console.log("User Posts end reached");
          if (props.posts.length < 10) return;
          else props.setPostPage(props.postPage + 1);
        }}
        onRefresh={() => {
          props.setPosts([]);
          props.setPostPage(0);
          props.setPostRefresh(!props.postRefresh);
        }}
        refreshing={false}
        onEndReachedThreshold={0.9}
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
        extraData={props.posts}
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
