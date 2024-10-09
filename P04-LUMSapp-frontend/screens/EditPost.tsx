import { Text, View, TextInput, StyleSheet, Pressable } from "react-native";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { IP } from "../constants/ip";
import { Image, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";

import {
  SECONDARY_COLOR,
  PRIMARY_COLOR,
  CROSS_COLOR,
  ADD_POST_HEADING_COLOR,
  ADD_POST_PLACE_HOLDER_TEXT_COLOR,
  ADD_POST_DISCREET_HEADING_COLOR,
  ADD_POST_UPLOAD_MEDIA_ICON_COLOR,
  ADD_POST_SECONDARY_HEADING_COLOR,
  ADD_POST_BUTTON_COLOR,
  ADD_POST_POSTER_NAME_COLOR,
  ADD_POST_MINI_MEDIA_TILES_COLOR,
} from "../constants/color";
import { AutoGrowTextInput } from "react-native-auto-grow-textinput";
import { SCREEN_HEIGHT } from "../constants/size";
import { useAppSelector } from "../redux/hooks";

//Icon imports
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import Loader from "../components/Loader";
import { ADD_POST_BCKG_COLOR } from "../constants/color";

const EditPost = ({ route }: any) => {
  const { postProps } = route.params;
  const [text, setText] = useState(postProps.body);
  const [media, setMedia] = useState<any[]>(
    postProps.media.map((m: any) => m.url)
  );
  const [isPosting, setPosting] = useState(false);

  const { user }: any = useAppSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [icon, setIcon]: any = useState();

  useEffect(() => {
    setUsername(user?.name);
    setIcon(user?.profile_picture.url);
  }, [user]);

  const pickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setMedia([...media, ...result.assets.map((asset) => asset.uri)]);
    }
  };

  const deleteMedia = (index: number) => {
    const newMedia = [...media];
    newMedia.splice(index, 1);
    setMedia(newMedia);
  };

  // const [pressed, setPressed] = useState(false);

  const addPost = async () => {
    setPosting(true);
    setMedia([]);
    setText("");
    try {
      const formData = new FormData();
      formData.append("text", text);
      formData.append("postId", postProps.postID);
      media.forEach((uri, index) => {
        formData.append("media" + index, {
          name: `media${index}.jpg`,
          type: "image/jpg",
          uri: uri,
        });
      });
      const resp = await axios.post(`${IP}/post/edit`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      if (resp.data.success) {
        console.log("Post added successfully");
      }
    } catch (err) {
      console.log(err);
    }
    setPosting(false);
  };

  return isPosting ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageName}></Text>
        <Pressable onPress={addPost} style={styles.addPost}>
          <Text
            style={{
              color: ADD_POST_HEADING_COLOR,
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Post
          </Text>
        </Pressable>
      </View>
      {/* <View
        style={{
          borderBottomColor: "white",
          borderBottomWidth: 0.3,
          marginBottom: 10,
          marginTop: 10,
        }}
      ></View> */}
      <ScrollView style={styles.scrollBar}>
        <View style={styles.profileComponent}>
          {/* Image and Name are One Element so we have a separate View(div) for them */}
          <Image
            style={{ width: 60, height: 60, borderRadius: 100 }}
            source={
              icon ? { uri: icon } : require("../assets/default_icon.png")
            } /*require path is for static images only*/
          />
          <Text style={styles.posterName}>{username}</Text>
        </View>
        <AutoGrowTextInput
          style={styles.inputText}
          onChangeText={setText}
          value={text}
          multiline={true} // ios fix for centering it at the top-left corner
          placeholder="Write something here..."
          placeholderTextColor={ADD_POST_PLACE_HOLDER_TEXT_COLOR}
        />
        {media[0] && (
          <Image source={{ uri: media[0] }} style={styles.mainMediaTile} />
        )}
        <View style={styles.miniMediaTilesBox}>
          {media.map(
            (uri, index) =>
              index > 0 && (
                <View key={index} style={styles.miniMediaTiles}>
                  <Entypo
                    name="circle-with-cross"
                    size={24}
                    color={CROSS_COLOR}
                    style={styles.cross}
                    onPress={() => deleteMedia(index)}
                  />
                  <Image source={{ uri: uri }} style={styles.miniMedia} />
                </View>
              )
          )}
        </View>
        <View style={styles.footer}>
          <Pressable onPress={pickMedia} style={styles.attach}>
            <Feather
              name="upload"
              size={40}
              color={ADD_POST_UPLOAD_MEDIA_ICON_COLOR}
            />
            <View style={styles.mediaText}>
              <Text
                style={{ color: ADD_POST_DISCREET_HEADING_COLOR, fontSize: 10 }}
              >
                Add
              </Text>
              <Text
                style={{ color: ADD_POST_DISCREET_HEADING_COLOR, fontSize: 10 }}
              >
                Media
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ADD_POST_BCKG_COLOR,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  pageName: {
    color: ADD_POST_SECONDARY_HEADING_COLOR,
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },

  addPost: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ADD_POST_BUTTON_COLOR,
    paddingVertical: 5,
    borderRadius: 30,
    width: "18%",
  },
  scrollBar: {
    height: SCREEN_HEIGHT,
  },

  profileComponent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
  },
  inputText: {
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 20,
    textAlignVertical: "top", // top fixes for android
    color: "white",
    fontSize: 20,
  },
  posterName: {
    color: ADD_POST_POSTER_NAME_COLOR,
    fontWeight: "bold",
    fontSize: 16,
  },
  miniMediaTilesBox: {
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    width: "100%",
    flexWrap: "wrap",
  },
  mainMediaTile: {
    width: "100%",
    height: SCREEN_HEIGHT / 2.5,
    borderRadius: 2,
  },
  miniMedia: {
    width: 80,
    height: 80,
    borderWidth: 3,
    borderRadius: 10,
    opacity: 0.5,
    backgroundColor: ADD_POST_MINI_MEDIA_TILES_COLOR,
    zIndex: 1,
  },
  miniMediaTiles: {
    position: "relative",
    display: "flex",
  },
  cross: {
    position: "absolute",
    top: -8,
    right: -8,
    zIndex: 500,
  },

  attach: {
    marginTop: 12,
    display: "flex",
    flexDirection: "column",
    gap: 5,
    alignItems: "center",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 30,
  },
  mediaText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditPost;
