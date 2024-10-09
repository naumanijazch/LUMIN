import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView, Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

import Signup from "./screens/Signup";
import Login from "./screens/Login";
import BottomTabs from "./components/BottomTabs";
import SignupPIN from "./screens/SignupPIN";
import SignupProfilePicture from "./screens/SignupProfilePicture";
// import Comments from "./screens/Comments";
import CampusInfo from "./screens/CampusInfo";
import InstructorInfo from "./screens/InstructorInfo";
import InstructorDetails from "./screens/InstructorDetails";
import AddInstructorReview from "./screens/AddInstructorReview";

import { loadUser, registerPushToken } from "./redux/action";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import Loader from "./components/Loader";
import SinglePost from "./screens/SinglePost";
import Transcript from "./screens/Transcript";
import GpaPredictorHome from "./screens/GpaPredictorHome";
import GpaPredictor from "./screens/GpaPredictor";
import EditPost from "./screens/EditPost";
import EditProfile from "./screens/EditProfile";
import PostMediaScroll from "./screens/PostMediaScroll";
import SpecificEvent from "./screens/SpecificEvent";
import AddPost from "./screens/AddPost";
// import EditProfile from "./screens/EditProfile";
// import PostImageScroll from "./screens/PostImageScroll";
// import VideoPlayer from "./screens/VideoPlayer";
import AddEvent from "./screens/AddEvent";
import Settings from "./screens/Settings";
import { usePushNotifications } from "./hooks/usePushNotifications";
import SavedPosts from "./components/SavedPosts";
import { NOTIFICATION_BAR_COLOR } from "./constants/color";
import ChatScreen from "./screens/ChatScreen";
import ChatsHome from "./screens/ChatsHome";
import ThreadScreen from "./screens/ThreadScreen";
import { useChatClient } from "./useChatClient";
import { useState } from "react";
import Donations from "./screens/Donations";
import SpecificDonation from "./screens/SpecificDonation";
import AddDonation from "./screens/AddDonation";
import EditDonation from "./screens/EditDonation";
import Donation from "./screens/Donations";
import ComingSoonPage from "./screens/ComingSoonPage";
import ForgotPassword from "./screens/ForgotPassword";
import PasswordPin from "./screens/PasswordPin";

const Stack = createNativeStackNavigator();

const Main = () => {
  const dispatch = useAppDispatch();
  const { expoPushToken, notification } = usePushNotifications();
  let token: string | undefined = expoPushToken?.data;
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(registerPushToken(token));
    }
  }, [token]);

  // useEffect(() => {
  //     const subscription =
  //         Notifications.addPushTokenListener(registerPushToken);
  //     return () => subscription.remove();
  // }, []);

  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  return loading ? (
    <Loader />
  ) : (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          backgroundColor: "black",
          // paddingHorizontal: 20,
        }}
      >
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={isAuthenticated ? "BottomTabs" : "Login"}
            screenOptions={{ headerShown: false }}
          >
            {isAuthenticated ? (
              <Stack.Group>
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="BottomTabs" component={BottomTabs} />
                {/* <Stack.Screen
                                    name="Comments"
                                    component={Comments}
                                /> */}
                <Stack.Screen
                  name="SinglePost"
                  component={SinglePost}
                  options={{
                    headerShown: true,
                    title: "Post",
                    headerStyle: {
                      backgroundColor: "black",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                      color: "white",
                    },
                    headerTitleAlign: "center",
                    headerBackTitleVisible: false,
                  }}
                />
                <Stack.Screen name="AddPost" component={AddPost} />
                <Stack.Screen
                  name="PostMediaScroll"
                  component={PostMediaScroll}
                />
                <Stack.Screen name="ChatsHome" component={ChatsHome} />
                <Stack.Screen name="ChatScreen" component={ChatScreen} />
                <Stack.Screen name="ThreadScreen" component={ThreadScreen} />
                <Stack.Screen
                  name="Transcript"
                  component={Transcript}
                  options={{
                    headerShown: true,
                    title: "Transcript",
                    headerStyle: {
                      backgroundColor: "black",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                      color: "white",
                    },
                    headerTitleAlign: "center",
                    headerBackTitleVisible: false,
                  }}
                />
                <Stack.Screen
                  name="GpaPredictorHome"
                  component={GpaPredictorHome}
                  options={{
                    headerShown: true,
                    title: "GPA Predictor",
                    headerStyle: {
                      backgroundColor: "black",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                      color: "white",
                    },
                    headerTitleAlign: "center",
                    headerBackTitleVisible: false,
                  }}
                />
                <Stack.Screen
                  name="GpaPredictor"
                  component={GpaPredictor}
                  options={{
                    headerShown: true,
                    title: "GPA Predictor",
                    headerStyle: {
                      backgroundColor: "black",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                      color: "white",
                    },
                    headerTitleAlign: "center",
                    headerBackTitleVisible: false,
                  }}
                />
                <Stack.Screen
                  name="EditPost"
                  component={EditPost}
                  options={{
                    headerShown: true,
                    title: "Edit post",
                    headerStyle: {
                      backgroundColor: "black",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                      color: "white",
                    },
                    headerTitleAlign: "center",
                    headerBackTitleVisible: false,
                  }}
                />
                <Stack.Screen name="EditProfile" component={EditProfile} />
                <Stack.Screen
                  name="CampusInfo"
                  component={CampusInfo}
                  options={{
                    headerShown: true,
                    title: "Campus Information",
                    headerStyle: {
                      backgroundColor: "black",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                      color: "white",
                    },
                    headerTitleAlign: "center",
                    headerBackTitleVisible: false,
                  }}
                />
                <Stack.Screen
                  name="InstructorInfo"
                  component={InstructorInfo}
                  options={{
                    headerShown: true,
                    title: "Instructor Information",
                    headerStyle: {
                      backgroundColor: "black",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                      color: "white",
                    },
                    headerTitleAlign: "center",
                    headerBackTitleVisible: false,
                  }}
                />
                {/* <Stack.Screen
                                    name="InstructorDetails"
                                    component={InstructorDetails}
                                /> */}
                <Stack.Screen
                  name="InstructorDetails"
                  component={InstructorDetails}
                  options={{
                    headerShown: true,
                    title: "Instructor Details",
                    headerStyle: {
                      backgroundColor: "black",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                      color: "white",
                    },
                    headerTitleAlign: "center",
                    headerBackTitleVisible: false,
                  }}
                />
                <Stack.Screen
                  name="ComingSoonPage"
                  component={ComingSoonPage}
                  options={{
                    headerShown: true,
                    title: "",
                    headerStyle: {
                      backgroundColor: "black",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                      color: "white",
                    },
                    headerTitleAlign: "center",
                    headerBackTitleVisible: false,
                  }}
                />
                <Stack.Screen
                  name="AddInstructorReview"
                  component={AddInstructorReview}
                  options={{
                    headerShown: true,
                    title: "Add Instructor Review",
                    headerStyle: {
                      backgroundColor: "black",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                      color: "white",
                    },
                    headerTitleAlign: "center",
                    headerBackTitleVisible: false,
                  }}
                />

                <Stack.Screen name="SpecificEvent" component={SpecificEvent} />
                <Stack.Screen
                  name="SavedPosts"
                  component={SavedPosts}
                  options={{
                    headerShown: true,
                    title: "Saved Posts",
                    headerStyle: {
                      backgroundColor: "black",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                      color: "white",
                    },
                    headerTitleAlign: "center",
                    headerBackTitleVisible: false,
                  }}
                />
                <Stack.Screen
                  name="Donations"
                  component={Donations}
                  options={{
                    headerShown: true,
                    title: "Donations",
                    headerStyle: {
                      backgroundColor: "black",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                      color: "white",
                    },
                    headerTitleAlign: "center",
                    headerBackTitleVisible: false,
                  }}
                />
                <Stack.Screen
                  name="SpecificDonation"
                  component={SpecificDonation}
                  options={{
                    headerShown: true,
                    title: "Donations",
                    headerStyle: {
                      backgroundColor: "black",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                      color: "white",
                    },
                    headerTitleAlign: "center",
                    headerBackTitleVisible: false,
                  }}
                />
                <Stack.Screen
                  name="EditDonation"
                  component={EditDonation}
                  options={{
                    headerShown: true,
                    title: "Edit Donations",
                    headerStyle: {
                      backgroundColor: "black",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                      color: "white",
                    },
                    headerTitleAlign: "center",
                    headerBackTitleVisible: false,
                  }}
                />
                <Stack.Screen
                  name="AddDonation"
                  component={AddDonation}
                  options={{
                    headerShown: true,
                    title: "Add Donations",
                    headerStyle: {
                      backgroundColor: "black",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                      color: "white",
                    },
                    headerTitleAlign: "center",
                    headerBackTitleVisible: false,
                  }}
                />
                {/* component={AddInstructorReview} */}
                {/* /> */}

                <Stack.Screen
                  name="AddEvent"
                  component={AddEvent}
                  options={{
                    headerShown: true,
                    title: "Add Event",
                    headerStyle: {
                      backgroundColor: "black",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                      fontWeight: "bold",
                      color: "white",
                    },
                    headerTitleAlign: "center",
                    headerBackTitleVisible: false,
                  }}
                />
                <Stack.Screen name="Login" component={Login} />
              </Stack.Group>
            ) : (
              <Stack.Group>
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="PIN" component={SignupPIN} />
                <Stack.Screen
                  name="ProfilePicture"
                  component={SignupProfilePicture}
                />
                <Stack.Screen
                  name="ForgotPassword"
                  component={ForgotPassword}
                />
                <Stack.Screen name="PasswordPin" component={PasswordPin} />
              </Stack.Group>
            )}
          </Stack.Navigator>
        </NavigationContainer>

        {/* <BottomTabs /> */}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
export default Main;

const styles = StyleSheet.create({});
