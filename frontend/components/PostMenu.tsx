import { report } from "process";
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useAnimatedStyle } from "react-native-reanimated";

import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { IP } from "../constants/ip";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { PostProps } from "./Post";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT / 3;

type PostMenuProps = {};
export type PostMenuRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
  setPostPropsFunc: (postProps: PostProps) => void;
};

const PostMenu = React.forwardRef<PostMenuRefProps, PostMenuProps>(
  ({}, ref) => {
    const navigation = useNavigation<NavigationProp<any>>();
    const translateY = useSharedValue(-200); // start as closed
    const context = useSharedValue({ y: 0 });
    const active = useSharedValue(false);
    const postProps = useSharedValue<PostProps>({} as PostProps);

    const scrollTo = useCallback((destination: number) => {
      "worklet";
      active.value = destination !== MAX_TRANSLATE_Y;
      translateY.value = withSpring(destination, { damping: 50 });
    }, []);

    const isActive = useCallback(() => {
      return active.value;
    }, []);

    const setPostPropsFunc = useCallback((postPropsPassed: PostProps) => {
      postProps.value = postPropsPassed;
    }, []);

    useImperativeHandle(
      ref,
      () => ({ scrollTo, isActive, setPostPropsFunc }),
      []
    );
    const pan = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(MAX_TRANSLATE_Y, translateY.value);
      })
      .onEnd(() => {
        if (translateY.value < -SCREEN_HEIGHT / 9) {
          scrollTo(MAX_TRANSLATE_Y);
        } else {
          scrollTo(200); // revisit this
        }
      });

    const rPostMenuStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [20, 15],
        Extrapolate.CLAMP
      );
      return {
        borderRadius,
        transform: [{ translateY: translateY.value }],
      };
    });

    const deletePost = async () => {
      try {
        const res = await axios.post(`${IP}/post/delete`, {
          postId: postProps.value.postID,
        });
        alert(res.data.message);
      } catch (error) {
        console.log(error);
      }
    };

    const editPost = async () => {
      try {
        const res = await axios.post(`${IP}/post/editPermission`, {
          postId: postProps.value.postID,
        });
        if (res.data.permission) {
          navigation.navigate("EditPost", {
            postProps: {
              ...postProps.value,
              ref: ref,
            },
          });
        } else {
          alert("You do not have permission to edit this post");
        }
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      scrollTo(250); // should start as closed
    }, []);

    return (
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.container, rPostMenuStyle]}>
          <View style={styles.line}></View>
          <View style={styles.menuItems}>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.Button}>
                <MaterialIcons name="report" size={24} color="red" />
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
                >
                  Report Post
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.lineSeparator}></View>

            <TouchableOpacity
              onPress={() => {
                editPost();
              }}
            >
              <View style={styles.Button}>
                <Feather name="edit-2" size={24} color="cyan" />
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
                >
                  Edit Post
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.lineSeparator}></View>
            <TouchableOpacity
              onPress={() => {
                deletePost();
              }}
            >
              <View style={styles.Button}>
                <Feather name="trash-2" size={24} color="grey" />
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
                >
                  Delete Post
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </GestureDetector>
    );
  }
);

export default PostMenu;

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT / 1.5,
    width: "100%",
    backgroundColor: "#2B2B2B",
    top: SCREEN_HEIGHT / 2,
    borderRadius: 20,
  },
  line: {
    width: 75,
    height: 5,
    backgroundColor: "white",
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: 10,
  },
  menuItems: {
    flexDirection: "column",
    marginTop: 20,
    gap: 10,
  },
  Button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    // backgroundColor: "black",
    gap: 10,
    // borderWidth: 1,
    // borderColor: "#35C2B0",
    // borderRadius: 10,
  },
  lineSeparator: {
    width: "90%",
    height: 0.5,
    backgroundColor: "white",
    borderRadius: 10,
    alignSelf: "center",
  },
});
