import React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';



interface LogInScreen {
    
};


const LogInScreen: React.FC<LogInScreenProps> = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>OLHSO</Text>
            <Button style={styles.btn1} title="Phone Number LogIn" onPress={()=>{}}/>
            <Button style={styles.btn2} title="Connect to Service Center" onPress={()=>{}}/>
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
    btn1: {
        backgroundColor: 'grey'
    },
    btn2: {

    }
});

export default LogInScreen;
