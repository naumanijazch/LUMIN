import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

import StarRating from '../components/StarRating';
import { IP } from '../constants/ip';

const data = [
  { label: 'Summer 2024', value: 'Summer 2024' },
  { label: 'Spring 2024', value: 'Spring 2024' },
  { label: 'Fall 2024', value: 'Fall 2024' },
  { label: 'Summer 2023', value: 'Summer 2023' },
  { label: 'Spring 2023', value: 'Spring 2023' },
  { label: 'Fall 2023', value: 'Fall 2023' },
  { label: 'Summer 2022', value: 'Summer 2022' },
  { label: 'Spring 2022', value: 'Spring 2022' },
  { label: 'Fall 2022', value: 'Fall 2022' },
  { label: 'Summer 2021', value: 'Summer 2021' },
  { label: 'Spring 2021', value: 'Spring 2021' },
  { label: 'Fall 2021', value: 'Fall 2021' },
  { label: 'Summer 2020', value: 'Summer 2020' },
  { label: 'Spring 2020', value: 'Spring 2020' },
  { label: 'Fall 2020', value: 'Fall 2020' },
];

const AddInstructorReview = ({ route }: any) => {
  const navigation = useNavigation();
  const instructorName = route.params.name;
  const instructorImage = route.params.instructorImage;

  const [selectedStars, setSelectedStars] = useState<number>(0);
  const [reviewDescription, setReviewDescription] = useState('');

  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleStarRatingChange = (rating: number) => {
    setSelectedStars(rating);
  };

  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  const submitReview = async () => {
    try {
      const res = await axios.post(`${IP}/review/create`, {
        instructorName: instructorName,
        ratingGiven: selectedStars,
        academicSession: selectedSession,
        reviewDescription: reviewDescription,
      });
      alert('Review submitted successfully!');
      navigation.goBack();
    } catch (err) {
      alert('You have already submitted a review for this instructor.');
      navigation.goBack();
    }
  };

  const submitPressed = () => {
    if (selectedStars === 0) {
      alert('Please select a star rating.');
    } else if (!selectedSession) {
      alert('Please select an academic session.');
    } else if (!reviewDescription.trim()) {
      alert('Please write a review.');
    } else {
      submitReview();
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

    <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContentContainer}>

        <Image style={styles.mainImage} source={{ uri: instructorImage }} />

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.instructorTitle}>Instructor: </Text>
          <Text style={styles.instructorNaming}>{instructorName} </Text>
        </View>

        <View style={{ margin: 10, marginLeft: 30, marginBottom: 20 }}>
          <StarRating onRatingChange={handleStarRatingChange} />
        </View>

        <Text style={styles.instructorTitle}>Academic Session: </Text>
        <DropDownPicker
          open={open}
          value={selectedSession}
          items={data}
          setOpen={() => {setOpen(!open)}}
          setValue={setSelectedSession}
          setItems={() => {}}
          placeholder="Select a session..."
          placeholderStyle={{ color: 'white' }}
          style={styles.dropdown}
          dropDownContainerStyle={{
            backgroundColor: "#2B2B2B",
            width: "80%",
            marginLeft: 30,
            height: 200,
          }} 
          listItemLabelStyle={{ color: 'white' }} 
          selectedItemLabelStyle={{ color: '#35C2C1' }}
          labelStyle={{ color: 'white' }} 
      />


        <Text style={styles.instructorTitle}>Review: </Text>
        <View style={styles.inputbox}>
          <TextInput
            editable
            placeholder="Write your review here..."
            placeholderTextColor="white"
            multiline
            numberOfLines={4}
            maxLength={40}
            onChangeText={setReviewDescription}
            value={reviewDescription}
            style={{ padding: 10, color: 'white', fontSize: 16 }}
          />
        </View>

        <TouchableOpacity style={styles.topicButton} onPress={submitPressed}>
          <Text style={{ color: '#000', fontWeight: 'bold' }}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
    alignItems: 'center',
  },
  instructorTitle: {
    color: '#35C2C1',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 30,
    marginBottom: 15,
  },
  instructorNaming: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
    marginBottom: 15,
  },
  mainImage: {
    width: 150,
    height: 150,
    marginTop: 20,
    marginBottom: 15,
    borderRadius: 10,
    alignSelf: 'center',
  },
  dropdown: {
    height: 50,
    width: '80%',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#2B2B2B',
    marginLeft: 30,
    marginBottom: 20,
    // color: "white"
  },
  inputbox: {
    height: 150,
    width: '80%',
    borderWidth: 0.5,
    borderRadius: 8,
    backgroundColor: '#2B2B2B',
    marginLeft: 30,
    marginBottom: 20,
  },
  topicButton: {
    backgroundColor: '#35C2C1',
    borderRadius: 10,
    width: '50%',
    marginTop: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingVertical: 20,
  },
});

export default AddInstructorReview;
