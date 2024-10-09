import { View, Text } from "react-native";
import React from "react";
import { Thread, Channel } from "stream-chat-expo";
import { useAppContext } from "../AppContext";

export default function ThreadScreen() {
  const { channel, thread } = useAppContext();

  return (
    <Channel channel={channel} thread={thread} threadList>
      <Thread />
    </Channel>
  );
}
