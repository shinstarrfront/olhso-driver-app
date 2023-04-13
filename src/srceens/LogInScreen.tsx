import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import PropTypes from 'prop-types';

interface LogInScreenProps {
    navigation: any;
}

const LogInScreen: React.FC<LogInScreenProps> = ({navigation}: LogInScreenProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>LogInScreen</Text>
            <Button title="login" onPress={() => navigation.navigate('Home')} />
        </View>
    );
};

LogInScreen.propTypes = {

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

export default LogInScreen;
