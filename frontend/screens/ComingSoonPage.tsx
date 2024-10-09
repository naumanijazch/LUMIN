import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';



const ComingSoonPage = () => {
    return (
        <View style={[styles.container, {justifyContent: 'center'}]}>
        <Text style={styles.comingSoon}>Coming soon</Text>
      </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
    },
    comingSoon: {
        backgroundColor: "#000",
        color: "#35C2C1",
        fontSize: 20,
      },

})

export default ComingSoonPage;
