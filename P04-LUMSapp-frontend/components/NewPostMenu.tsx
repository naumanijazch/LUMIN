import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { IP } from "../constants/ip";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { PostProps } from "./Post";
import { useState, useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { PRIMARY_COLOR, TERTIARY_COLOR } from "../constants/color";

const NewPostMenu = (props: PostProps) => {
  const { user }: any = useAppSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [icon, setIcon]: any = useState();

  useEffect(() => {
    setUsername(user?.name);
    setIcon(user?.profile_picture.url);
  }, [user]);

  const navigation = useNavigation<NavigationProp<any>>();

  const deletePost = async () => {
    try {
      const res = await axios.post(`${IP}/post/delete`, {
        postId: props.postID,
      });
      alert(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const editPost = async () => {
    try {
      const res = await axios.post(`${IP}/post/editPermission`, {
        postId: props.postID,
      });
      if (res.data.permission) {
        navigation.navigate("EditPost", {
          postProps: {
            ...props,
          },
        });
      } else {
        alert("You do not have permission to edit this post");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isCurrentUser = username === props.name;

  return (
    <View>
      <View style={styles.topLine}></View>
      <View style={styles.menuItems}>
        {!isCurrentUser && (
          <TouchableOpacity
            onPress={() => {
              alert("Post has been reported to Admin");
            }}
          >
            <View style={styles.Button}>
              <MaterialIcons name="report" size={24} color="red" />
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
              >
                Report Post
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {isCurrentUser && (
          <>
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
          </>
        )}
      </View>
    </View>
  );
};

export default NewPostMenu;

const styles = StyleSheet.create({
  topLine: {
    borderWidth: 2,
    borderColor: TERTIARY_COLOR,
    width: "20%",
    alignSelf: "center",
    borderRadius: 10,
    marginVertical: 5,
  },
  menuItems: {
    flexDirection: "column",
    width: "100%",
    rowGap: 5,
  },
  Button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 0.1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 20,

    backgroundColor: "rgba(20,20,20,1)",
    gap: 15,
    // borderWidth: 1,
    // borderColor: "#35C2B0",
    // borderRadius: 10,
  },
});
