import React from "react";
import { Image, View } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants/size";

import { Video, ResizeMode } from "expo-av";
import { useState, useRef } from "react";

export type MediaCardProps = {
  media: any;
};

// HERE I NEED TO CONDITIONAL VIDEO OR IMAGE RENDERING
// right now its checking if the url includes .mp4
// this needs to be better also I need to connect cloudinary to the backend of this so lets do that first and understand how it works
const MediaCard = (props: MediaCardProps) => {
  const video = useRef(null);
  const [status, setStatus] = useState<any>({});
  return (
    <View>
      {false ? (
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: props.media.url,
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping={true}
          onPlaybackStatusUpdate={(status: any) => setStatus(() => status)}
        />
      ) : (
        <Image
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT / 3,
            resizeMode: "cover",
          }}
          source={{
            uri: props.media.url,
          }} /*require path is for static images only*/
        />
      )}
    </View>
  );
};

export default MediaCard;

const styles = {
  video: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 2,
  },
};
