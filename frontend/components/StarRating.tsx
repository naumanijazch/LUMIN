import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const StarRating = ({ initialValue, onRatingChange }: { initialValue?: number, onRatingChange?: (rating: number) => void }) => {
  const starRatingOptions = [1, 2, 3, 4, 5];

  const [starRating, setStarRating] = useState<number | null>(initialValue || null);

  const animatedButtonScale = new Animated.Value(1);

  useEffect(() => {
    if (initialValue !== undefined) {
      setStarRating(initialValue);
    }
  }, [initialValue]);

  const handlePressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.5,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handleStarPress = (rating: number) => {
    setStarRating(rating);
    onRatingChange(rating); // Pass the selected rating to the parent component
  };

  const animatedScaleStyle = {
    transform: [{ scale: animatedButtonScale }],
  };

  return (
    <View style={styles.starRatingContainer}>
      <View style={styles.stars}>
        {starRatingOptions.map((option) => (
          <TouchableWithoutFeedback
            key={option}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => handleStarPress(option)}
            disabled={initialValue !== undefined}
          >
            <Animated.View style={animatedScaleStyle}>
              <MaterialIcons
                name={starRating && starRating >= option ? 'star' : 'star-border'}
                size={35} 
                style={starRating && starRating >= option ? styles.starSelected : styles.starUnselected}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
};

export default StarRating;

const styles = StyleSheet.create({
  starRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row', 
  },
  starUnselected: {
    color: '#292929',
  },
  starSelected: {
    color: '#35C2C1',
  },
});
