import * as React from 'react';
import { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { SignInContext } from '../contexts/SignInContext';
import { Auth } from 'aws-amplify'
import { CognitoUser } from 'amazon-cognito-identity-js';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';


interface ChangePasswordScreenRouteProp extends RouteProp<RootStackParamList, 'ChangePassword'> {}
interface ChangePasswordScreenNavigationProp extends StackNavigationProp<RootStackParamList, 'ChangePassword'> {}

interface ChangePasswordScreenProps {
  route: ChangePasswordScreenRouteProp;
  navigation: ChangePasswordScreenNavigationProp;
}



const ChangePasswordScreen: React.FunctionComponent<ChangePasswordScreenProps> = ({navigation, route}) => {
    const [newPassword, setNewPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const { user } = route.params; // 전달 받기

    const handlePasswordChange = (value: string) => {
    setNewPassword(value);
    };

    //비밀번호 변경
    const changePassword = async () => {
        try {
          await Auth.completeNewPassword(user, newPassword);
          console.log('Password changed successfully');
        } catch (error) {
          console.log('Error changing password:', error);
        }
      };

  

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Change your password</Text>
            <TouchableOpacity style={styles.password}>
                <TextInput style={styles.passwordplaceholder} placeholder="Enter the new Password" defaultValue={newPassword} onChangeText={newPassword => setNewPassword(newPassword)}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmpassword}>
                <TextInput style={styles.confirmpasswordplaceholder} placeholder="Confirm your Password"  />
            </TouchableOpacity>
            <TouchableOpacity style={styles.changedbtn} onPress={changePassword} >
            <Text style={styles.changedbtnfont}>Changed</Text>
          </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FFFFFF',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'left',
        position: 'absolute',
        top: 20,
        paddingLeft: 20,
    },
    password:{
        width: '85%',
        backgroundColor:'#F1F1F4',
        borderRadius: 30,
        top: 160,
        color: 'blck',
        padding: 15,
        position: 'absolute',
        textAlign: 'center',
        left: 30,
        height: 50,
    },
    passwordplaceholder: {
        color: 'black',
        left: 10
    },
    confirmpassword: {
        width: '85%',
        backgroundColor:'#F1F1F4',
        borderRadius: 30,
        top: 230,
        color: 'blck',
        padding: 15,
        position: 'absolute',
        textAlign: 'center',
        left: 30,
        height: 50,
    },
    confirmpasswordplaceholder: {
        color: 'black',
        left: 10
    },
    changedbtn: {
        width: '85%',
        backgroundColor: '#ED6A2C',
        borderRadius: 30,
        textAlign: 'center',
        left: 30,
        height: 50,
        top: 300
    },
    changedbtnfont: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        paddingTop: 14,
    },
});

export default ChangePasswordScreen;