import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
  Channel,
  MessageList,
  MessageInput,
  ChannelList,
} from "stream-chat-expo";
import { useAppContext } from "../AppContext";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";

//there is a wiggly redline under channel because of type error => leaving for later to fix :)
export default function ChatScreen() {
  const navigation = useNavigation<NavigationProp<any>>();
  const { channel, setThread } = useAppContext();

  return (
    
    <View style={styles.container}>
      <Channel channel={channel}>
        <MessageList
          onThreadSelect={(message) => {
            if (channel?.id) {
              setThread(message);
              navigation.navigate("ThreadScreen");
            }
          }}
        />
        <MessageInput />
      </Channel>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
