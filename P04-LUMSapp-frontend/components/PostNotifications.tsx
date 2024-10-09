import { FlatList, View, Image, Text } from "react-native";
import { getTimeAgo } from "../utils/timeUtil";
import { groupNotifications } from "../utils/groupNotifications";
const PostNotifications = (props: any) => {
    return (
        <FlatList
            style={{
                width: "100%",
            }}
            data={groupNotifications(props.notifs).sort(
                (a, b) =>
                    new Date(b.group[0].timestamp).getTime() -
                    new Date(a.group[0].timestamp).getTime()
            )}
            onRefresh={() => {
                props.setNotifRefresh(true);
            }}
            ListFooterComponent={() =>
                props.notifs.length > 0 ? null : (
                    <Text
                        style={{
                            color: "grey",
                            width: "100%",
                            textAlign: "center",
                            paddingVertical: "25%",
                            fontSize: 18,
                        }}
                    >
                        Nothing to show
                    </Text>
                )
            }
            refreshing={props.notifRefresh}
            keyExtractor={(item) => item?.group[0]?._id}
            renderItem={({ item }) => (
                <View
                    style={{
                        paddingVertical: 15,
                        flexDirection: "row",
                        alignItems: "center",
                        margin: 0,
                    }}
                >
                    <Image
                        style={{
                            width: "10%",
                            height: "auto",
                            borderRadius: 100,
                            aspectRatio: 1 / 1,
                        }}
                        source={
                            item.group[0].actor.profile_picture?.url
                                ? {
                                      uri: item.group[0].actor.profile_picture
                                          ?.url,
                                  }
                                : require("../assets/default_icon.png")
                        }
                    />
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                paddingHorizontal: 10,
                                width: "85%",
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    padding: 0,
                                    margin: 0,
                                }}
                            >
                                {item.group[0].actor.fullname}
                            </Text>
                            {item.message}
                        </Text>
                        <Text
                            style={{
                                color: "#696969",
                                paddingHorizontal: 10,
                            }}
                        >
                            {getTimeAgo(item.group[0].timestamp)}
                        </Text>
                    </View>
                </View>
            )}
        ></FlatList>
    );
};

export default PostNotifications;
