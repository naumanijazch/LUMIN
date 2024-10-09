import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  View,
  Image,
  Text,
} from "react-native";

import Post from "./Post";
import React, { useState } from "react";
import { IP } from "../constants/ip";
import axios from "axios";
import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import PostMenu from "./PostMenu";
import { useRef } from "react";
import { PostMenuRefProps } from "./PostMenu";
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

const SavedPosts = ({ navigation }: any) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
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

  const ref = useRef<PostMenuRefProps>(null);

  const getData = async (page: number) => {
    try {
      const res = await axios.post(`${IP}/post/bookmarks`, {
        page: page,
      });

      setPosts((posts) => [...posts, ...res.data.posts]);
    } catch (error) {
      console.log(error);
    }
  };
  // will run every time page changes
  useEffect(() => {
    getData(page);
    // console.log(user);
  }, [page, refresh]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: "100%",
          opacity: 0.6,
          // borderBottomColor: "#848484",
          // borderBottomWidth: 1,
        }}
      />
      <FlatList
        style={styles.scrollPost}
        data={posts}
        onEndReached={() => {
          setPage(page + 1);
        }}
        onRefresh={() => {
          setPosts([]);
          setPage(1);
          setRefresh(!refresh);
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
    </SafeAreaView>
  );
};

export default SavedPosts;

const styles = StyleSheet.create({
  menuIcon: {
    position: "absolute",
    top: 44, // Adjust top margin to match your status bar height
    right: 16, // Keep the icon on the right side
    zIndex: 10, // Ensure the icon is above other elements
  },

  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollPost: {
    width: "100%",
    minHeight: "100%",
  },
  postMenu: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
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
