import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Main from "./Main";
import { Provider } from "react-redux";
import store from "./redux/store";
import * as NavigationBar from "expo-navigation-bar";
// import { Platform } from "react-native";
import { OverlayProvider } from "stream-chat-expo";
import { AppProvider } from "./AppContext";
import { chatApiKey, chatUserId } from "./chatConfig";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-expo";
const chatClient = StreamChat.getInstance(chatApiKey);

export default function App() {
    NavigationBar.setBackgroundColorAsync("black");

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AppProvider>
                <OverlayProvider>
                    <Chat client={chatClient}>
                        <Provider store={store}>
                            <StatusBar style="light" />
                            <Main />
                        </Provider>
                    </Chat>
                </OverlayProvider>
            </AppProvider>
        </GestureHandlerRootView>
    );
}
