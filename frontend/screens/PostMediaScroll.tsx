//COLORS DONE
import React from "react";
import { View, FlatList, Image, Dimensions, StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants/size";
import MediaCard from "../components/MediaCard";
import FooterPostDetails from "../components/FooterPostDetails";
import { POST_MEDIA_SCROLL_BCKG_COLOR } from "../constants/color";
import MediaCard2 from "../components/MediaCard2";

function PostMediaScroll({ route }: any) {
  const postProps = route.params.postProps;
  const index = route.params.index;
  const flatListRef = React.useRef<FlatList>(null);
  return (
    <View style={styles.container}>
      <View style={styles.mediaStyle}>
        <FlatList
          ref={flatListRef}
          refreshing={true}
          style={styles.imageScroll}
          data={postProps.media}
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={index}
          renderItem={({ item }) => <MediaCard2 media={item} />}
        />
      </View>
      <View style={styles.bottomBar}>
        <FooterPostDetails
          likes={postProps.likeCountUpdated}
          dislikes={postProps.dislikeCountUpdated}
          comments={postProps.comments}
          liked={postProps.likedUpdated}
          disliked={postProps.dislikedUpdated}
          postID={postProps.postID}
        />
      </View>
    </View>
  );
}

export default PostMediaScroll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: POST_MEDIA_SCROLL_BCKG_COLOR,
    justifyContent: "center",
  },
  mediaStyle: {},
  bottomBar: {
    zIndex: 1000,
    position: "absolute",
    bottom: 0,
    width: SCREEN_WIDTH,
  },
  imageScroll: {},
});
