import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import PropTypes from 'prop-types';

interface SignInScreenProps {
    navigation: any;
}

const SignInScreen: React.FC<SignInScreenProps> = ({navigation}: SignInScreenProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>SignInScreen</Text>
            <Button title="signup" onPress={() => navigation.navigate('Home')} />
        </View>
    );
};

SignInScreen.propTypes = {

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

export default SignInScreen;
