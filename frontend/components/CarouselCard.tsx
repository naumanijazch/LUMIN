import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import PagerView from "react-native-pager-view";
import { useEffect, useState } from "react";
import axios from "axios";
import { IP } from "../constants/ip";
import Loader from "./Loader";
import { useNavigation } from "@react-navigation/native";
import { amToPm, getMonth } from "../utils/eventHelpers";

const CarouselCard = () => {
    const [info, setInfo] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<any>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${IP}/user/carousel`);
                setInfo(response.data.carouselInfo);

                // console.log(response.data.carouselInfo);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        // <View
        //   style={{
        //     height: "30%",
        //     width: "100%",
        //     borderRadius: 10,
        //   }}
        // >
        //   {!loading && (
        //     <FlatList
        //       style={{
        //         borderColor: "red",
        //         borderWidth: 1,
        //         borderRadius: 10,
        //       }}
        //       data={temp}
        //       keyExtractor={(_, index) => index.toString()}
        //       horizontal={true}
        //       pagingEnabled
        //       showsHorizontalScrollIndicator={false}
        //       renderItem={({ item }) => {
        //         return (
        //           <View
        //             key="1"
        //             style={{
        //               flex: 1,
        //               width: SCREEN_WIDTH,
        //               height: SCREEN_HEIGHT * 0.3,
        //               backgroundColor: "white",
        //               borderRadius: 10,
        //             }}
        //           >
        //             <TouchableOpacity style={{ flex: 1, borderRadius: 10 }}>
        //               <Text style={{ color: "black" }}>ndinfnvdg</Text>
        //             </TouchableOpacity>
        //           </View>
        //         );
        //       }}
        //     />
        //   )}
        // </View>
        loading ? (
            <View style={{ width: "100%", height: "30%" }} />
        ) : (
            <PagerView
                style={{ width: "100%", height: "30%", marginTop: 10 }}
                initialPage={0}
                collapsable={false}
                pageMargin={50}
            >
                {loading ? (
                    <Loader />
                ) : (
                    info.map((item: any, index: number) => (
                        <View
                            key={index}
                            style={{
                                flex: 1,
                                backgroundColor: "#111111",
                                borderRadius: 10,
                            }}
                        >
                            <TouchableOpacity
                                style={{ flex: 1 }}
                                onPress={() => {
                                    index === 0 &&
                                        navigation.navigate("SpecificEvent", {
                                            event: item,
                                        });
                                }}
                            >
                                <ImageBackground
                                    style={{
                                        flex: 1,
                                        borderRadius: 10,
                                        overflow: "hidden",
                                    }}
                                    source={{
                                        uri: "https://picsum.photos/201",
                                    }}
                                    resizeMode="cover"
                                >
                                    <View
                                        style={{
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            backgroundColor: "rgba(0,0,0,0.6)",
                                            width: "100%",
                                        }}
                                    >
                                        {index === 0 && (
                                            <View>
                                                <Text
                                                    style={{
                                                        color: "white",
                                                        paddingHorizontal: 5,
                                                        paddingVertical: 5,
                                                        letterSpacing: 1,
                                                        lineHeight: 20,
                                                    }}
                                                    // numberOfLines={1}
                                                >
                                                    {`${item.title}\n${new Date(
                                                        item.startTime
                                                    ).getDate()} ${getMonth(
                                                        new Date(
                                                            item.startTime
                                                        ).getMonth()
                                                    )} - ${
                                                        amToPm(
                                                            new Date(
                                                                item.startTime
                                                            ).getHours()
                                                        ).hour
                                                    } ${
                                                        amToPm(
                                                            new Date(
                                                                item.startTime
                                                            ).getHours()
                                                        ).period
                                                    } | ${item.locationName}`}
                                                </Text>
                                            </View>
                                        )}
                                        {index === 1 && (
                                            <View>
                                                <Text
                                                    style={{
                                                        color: "white",
                                                        paddingHorizontal: 5,
                                                        paddingTop: 5,
                                                        letterSpacing: 1,
                                                        lineHeight: 20,
                                                    }}
                                                >
                                                    {`${item.category}\nPending Amount: ${item.pendingAmount}`}
                                                    {/* </Text>
                        <Text
                          style={{
                            color: "white",
                            paddingHorizontal: 5,
                            paddingBottom: 5,
                            letterSpacing: 1,
                            lineHeight: 20,
                          }}
                          numberOfLines={1}
                        >
                          {item.details}
                        </Text> */}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    ))
                )}

                {/* <View
          key="1"
          style={{
            backgroundColor: "white",
            borderRadius: 10,
          }}
        >
          <TouchableOpacity style={{ flex: 1 }}>
            <Text style={{ color: "black" }}>ndinfnvdg</Text>
          </TouchableOpacity>
        </View>
        <View
          key="2"
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            position: "relative",
          }}
        >
          <TouchableOpacity style={{ flex: 1 }}>
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                backgroundColor: "rgba(0,0,0,0.6)",
                width: "100%",
              }}
            >
              <Text
                style={{
                  color: "white",
                  paddingHorizontal: 5,
                  paddingVertical: 10,
                }}
              >
                scf
              </Text>
            </View>
          </TouchableOpacity>
        </View> */}
            </PagerView>
        )
    );
};

export default CarouselCard;
