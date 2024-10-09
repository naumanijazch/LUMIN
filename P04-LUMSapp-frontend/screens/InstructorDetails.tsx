import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, Keyboard, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from "react-native-paper";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Avatar } from "react-native-paper";
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Loader from "../components/Loader";
import axios from "axios";
import { IP } from "../constants/ip";

import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";

// IMPORT PROFILE PICTURE WHEN INTEGRATED
const profilepicture: string = "../assets/adaptive-icon.png";

// tabview 1
const DetailsTab = (extraProp:any) => {
  const { reviewRating, reviewsCount, zambeelRating, profileDescription } = extraProp.extraProp;
  return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1}}>
          <Text style={{color: "#35C2C1", fontSize: 15, fontWeight: "bold", padding: 20}}>Overall Rating</Text>
        
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{paddingLeft: 20}}><StarRating initialValue={reviewRating}/></View>
            <Text style={{ color: 'white', marginLeft: 5, marginTop: 10, fontSize: 10}}>({reviewsCount})</Text>
            <Text  style={{ color: 'white', marginLeft: zambeelRating === 0 ? 100 : 80, fontSize: 25, fontWeight: "bold"}}>{zambeelRating === 0 ? "NA" : `${zambeelRating}/5`}</Text>
          </View>
          <Text  style={{ color: '#047CD2', marginLeft: 300, fontSize: 15}}>Zambeel</Text>
         
          <Text style={{color: "#35C2C1", fontSize: 15, fontWeight: "bold", padding: 20}}>Profile</Text>
          <Text style={{color: "white", fontSize: 15, paddingHorizontal: 20}}>{profileDescription}</Text>
        </View>
      </ScrollView>
)
  };

// tabview 2
const ReviewsTab = (extraProp: any) => {
  const navigation = useNavigation();
  const { reviewRating, reviewsCount, zambeelRating, profileDescription, reviews, name, instructorImage, userID, userImageURL, onDeleteSuccess } = extraProp.extraProp;
  // Render item function for FlatList
  const renderItem = ({ item }: any) => {
    return (
      <Reviews 
        username={item.username} 
        profilePicture={item.profilePicture}
        ratingGiven={item.ratingGiven}
        reviewDescription={item.reviewDescription}
        reviewedBy={item.reviewedBy}
        userID={userID}
        reviewID={item._id}
        onDeleteSuccess={onDeleteSuccess} // Pass onDeleteSuccess prop
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Avatar.Image style={{marginLeft: 20, marginTop: 10}} size={30} source={{uri: userImageURL}} />
        <TouchableOpacity onPress={() => {navigation.navigate("AddInstructorReview", {name: name, instructorImage: instructorImage})}}> 
          <View style={{marginLeft: 5, marginTop:10}}><StarRating initialValue={reviewRating}/></View>
        </TouchableOpacity>
      </View>

      <View style={{padding:5}}></View>
      <FlatList
        data={reviews}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()} 
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
}; 

// tab changer for details and reviews
const renderScene = ({ route, reviewRating, reviewsCount, zambeelRating, 
    profileDescription, reviews, name, instructorImage, userID, userImageURL, onDeleteSuccess }: { route: any, reviewRating: number, reviewsCount: number, zambeelRating: number, profileDescription: string, reviews: any, name: string, instructorImage: string, userID: string, userImageURL:string, onDeleteSuccess:any }) => {
  switch (route.key) {
    case 'first':
      return <DetailsTab extraProp={{reviewRating, reviewsCount, zambeelRating, profileDescription}} />;
    case 'second':
      return <ReviewsTab extraProp={{reviewRating, reviews, name, instructorImage, userID, userImageURL, onDeleteSuccess}} />;
    default:
      return null;
  }
};

const InstructorDetails = ({ route }: any) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const { name, school, department } = route.params;

  // instructor details
  const [instructorImage, setInstructorImage] = useState("https://picsum.photos/202");
  const [reviewsCount, setReviewsCount] = useState(0);
  const [reviewRating, setReviewRating] = useState(0);
  const [zambeelRating, setZambeelRating] = useState(0);
  const [profileDescription, setProfileDescription] = useState(null);
  const [timeup, setTimeup] = useState(false);

  // instructor reviews
  const [reviews, setReviews] = useState<any[]>([]);

  // userID
  const [userID, setUserID] = useState(null);
  const [userImageURL, setUserImageURL] = useState(profilepicture);

  // fetching data from backend
  const fetchData = async () => {
    try {
      const res = await axios.post(`${IP}/instructor/get`, {
        body: name,
      });
      if (res.data.success && res.data.instructorInformation) {
        const { instructorInformation, userID, requesteduserImageURL, reviewsInformation } = res.data;
        setInstructorImage(instructorInformation.instructorImage);
        setProfileDescription(instructorInformation.profileDescription);
        setReviewsCount(instructorInformation.reviewCount);
        setReviewRating(instructorInformation.reviewRating);
        setZambeelRating(instructorInformation.zambeelRating);
        setReviews(reviewsInformation);
        setUserID(userID);
        setUserImageURL(requesteduserImageURL);
      } else {
        console.log("Error: Success is false or no instructor data found.");
      }
    } catch (err) {
      console.log("Error fetching instructor data:", err);
    }
  };

  // runs once
  useEffect(() => {
    const timer = setTimeout(() => {  // wait for data to come
      setTimeup(true);
    }, 3500);

    fetchData();
    return () => clearTimeout(timer);
  }, []);

  const onDeleteSuccess = () => {  // callback function to refresh reviews
    fetchData();
  };

  // runs everytime the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  // dismiss the keyboard
  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Details' },
    { key: 'second', title: 'Reviews' },
  ]); 
  return profileDescription === null ? (
    timeup ? (  // if both timeup and data is null, show coming soon
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <Text style={styles.comingSoon}>Coming soon</Text>
      </View>
    ) : (  // if timeup is false but data is null, show loader
      <Loader />
    )
  ) : (  // if data exits show the data
  <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
    <SafeAreaView style={styles.container}>
          <View>
            <View>
              <Image style={{ width: windowWidth, height: windowHeight / 2.25 }} source={{ uri: instructorImage }} />
            </View>
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,1.0)']}
              style={{ position: 'absolute', width: '100%', height: '100%' }}
            />
          </View>
          <Text style={styles.instructorTitle}>{name}</Text>

          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: "black" }}>
            <TabView
              lazy
              navigationState={{ index, routes }}
              renderScene={({ route }) => renderScene({ route, reviewRating, reviewsCount, zambeelRating,
                profileDescription, reviews, name, instructorImage, userID, userImageURL, onDeleteSuccess })}
              onIndexChange={setIndex}
              initialLayout={{ width: windowWidth, height: (windowHeight)}}
              renderTabBar={props => <TabBar {...props} style={{ backgroundColor: 'black' }} indicatorStyle={{ backgroundColor: '#35C2C1' }} />}
            />
          </View>
      {loading && <Loader />}
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
  },
  heading: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: 'top',
    marginTop: 50,
    marginBottom: 20,
  },
  instructorTitle: {
    color: "white", 
    fontWeight: "bold",
    fontSize: 20,
    position: "absolute",
    left: "9%",
    top: "43%"
  },
  comingSoon: {
    backgroundColor: "#000",
    color: "#35C2C1",
    fontSize: 20,
  },
});

export default InstructorDetails;

