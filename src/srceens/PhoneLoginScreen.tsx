import React from 'react';
import { StyleSheet, Text, View } from "react-native";

interface PhoneLoginScreenProps {}

const PhoneLoginScreen: React.FC<PhoneLoginScreenProps> = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>PhoneNumber Login Screen</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
    },
});

export default PhoneLoginScreen;