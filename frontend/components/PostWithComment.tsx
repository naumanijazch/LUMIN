import { FlatList, View, StyleSheet } from "react-native";
import Post from "./Post";
import Comment from "./Comment";

interface PostWithCommentProps {
  post: {
    _id: string;
    postedBy: {
      _id: string;
      fullname: string;
      profile_picture: {
        url: string;
        public_id: string;
      };
    };
    text: string;
    likeCount: number;
    dislikeCount: number;
    commentCount: number;
    isLikedbyUser: boolean;
    isDislikedbyUser: boolean;
    isBookmarkedByUser: boolean;
    media: any[];
  };
  comment: {
    _id: string;
    text: string;
    postedBy: {
      _id: string;
      fullname: string;
      profile_picture: {
        url: string;
        public_id: string;
      };
    };
    likeCount: number;
    dislikeCount: number;
    isLikedbyUser: boolean;
    isDislikedbyUser: boolean;
  };
}

const PostWithComment = (props: PostWithCommentProps) => {
  return (
    <View style={{ width: "100%" }}>
      <Post
        key={props.post?._id}
        name={props.post?.postedBy?.fullname || "Deleted User"}
        profileImage={props.post?.postedBy?.profile_picture.url}
        body={props.post?.text}
        media={props.post?.media} // make this an array
        likes={props.post?.likeCount}
        dislikes={props.post?.dislikeCount}
        comments={props.post?.commentCount}
        liked={props.post?.isLikedbyUser}
        disliked={props.post?.isDislikedbyUser}
        postID={props.post?._id}
        bookmarked={props.post?.isBookmarkedByUser}
      />
      <Comment
        key={props.comment?._id.toString()} // Ensure each item has a unique key
        comment={props.comment}
        showReplies={false}
        userId={props.comment?.postedBy?._id}
      />
    </View>
  );
};

export default PostWithComment;
