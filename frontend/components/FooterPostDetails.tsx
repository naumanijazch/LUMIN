import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { PRIMARY_COLOR } from "../constants/color";
import { useState, useEffect } from "react";
import { Foundation } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import axios from "axios";
import { IP } from "../constants/ip";
import { Feather } from "@expo/vector-icons";

export type FooterPostDetailsProps = {
  likes: number;
  dislikes: number;
  comments: number;
  liked: boolean;
  disliked: boolean;
  postID: string;
};

function FooterPostDetails(props: FooterPostDetailsProps) {
  const [liked, setLiked] = useState(props.liked);
  const [disliked, setDisliked] = useState(props.disliked);
  const [likeCount, setLikeCount] = useState<any>(props.likes);
  const [dislikeCount, setDislikeCount] = useState<any>(props.dislikes);
  const [update, setUpdate] = useState(false);

  const likePressed = async () => {
    try {
      if (liked) {
        setLikeCount(likeCount - 1);
      } else {
        setLikeCount(likeCount + 1);
      }
      if (disliked) {
        setDisliked(false);
        setDislikeCount(dislikeCount - 1);
      }

      setLiked(!liked); // Reverse the liked status

      setUpdate(!update);
      //////// NOW WE HAVE DONE IT ON THE FRONTEND, LETS DO IT ON THE BACKEND

      const res = await axios.post(`${IP}/post/like`, {
        postId: props.postID,
      });
      console.log(res.data); // SEND LIKE REQUEST

      if (disliked == true) {
        const res2 = await axios.post(`${IP}/post/dislike`, {
          postId: props.postID,
        });
        console.log(res2.data);
      }

      // console.log("Sent Like Request");
    } catch (error) {
      console.log(error);
    }
  };

  const dislikePressed = async () => {
    try {
      if (disliked) {
        setDislikeCount(dislikeCount - 1);
      } else {
        setDislikeCount(dislikeCount + 1);
      }
      if (liked) {
        setLiked(false);
        setLikeCount(likeCount - 1);
      }
      setDisliked(!disliked); // Reverse the disliked status
      setUpdate(!update);

      const res = await axios.post(`${IP}/post/dislike`, {
        postId: props.postID,
      });
      console.log(res.data);

      if (liked == true) {
        // console.log("Was Liked Earlier -> Decrementing  ");
        const res2 = await axios.post(`${IP}/post/like`, {
          postId: props.postID,
        });
        console.log(res2.data);
      }

      // console.log("Sent Dislike Request");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLiked(liked);
    setDisliked(disliked);
  }, [update]);

  return (
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
              size={30}
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
              size={30}
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
              style={{ marginTop: 4 }}
            />
            <Text style={{ color: "grey", fontSize: 10 }}>
              {props.comments}
            </Text>
            {/* This is grey because it is not pressed (we haven't commented). We have to make this dynamic rather than static*/}
          </View>
        </View>
      </View>
      <View style={styles.rightFooter}>
        {/* <View style={styles.footerComponent}>
              <Feather name="send" size={24} color="grey" />
            </View> */}
        <View style={styles.footerComponent}>
          <Feather name="bookmark" size={30} color="grey" />
        </View>
      </View>
    </View>
  );
}

export default FooterPostDetails;
const styles = StyleSheet.create({
  footerPost: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    gap: 50,
    backgroundColor: "rgba(128, 128, 128, 0)",
    borderTopColor: "rgba(128, 128, 128, 0.5)",
    borderTopWidth: 0.2,
  },
  leftFooter: {
    display: "flex",
    flexDirection: "row",
    gap: 60,
  },
  likeDislike: {
    display: "flex",
    flexDirection: "row",
    gap: 30,
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
});
