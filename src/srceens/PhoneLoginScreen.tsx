import * as React from 'react';
import { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { SignInContext } from '../contexts/SignInContext';
import { AuthContext } from '../contexts/AuthContext';
import { Amplify, Auth } from 'aws-amplify'
import CryptoJS from 'crypto-js';

interface PhoneLoginScreenProps {
    navigation: any; 
    accessToken: any;
}

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || '';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET || '';

Amplify.configure({
    Auth: {
      region: 'us-west-2',
      userPoolId: 'uus-west-2_UZwUaizX7',
      userPoolWebClientId: '2i53te99k4gvkam856n6entaeq',
      identityPoolId: 'us-west-2:e3f65917-26d4-411e-af9e-3a08fbb92c98'
    }
  });

function createSecretHash(username: string, clientId: string, clientSecret: string) {
    const hash = CryptoJS.HmacSHA256(username + clientId, clientSecret);
    return hash.toString(CryptoJS.enc.Base64);
  }
  
  interface CognitoUser {
    idToken: any;
  }

const PhoneLoginScreen: React.FC<PhoneLoginScreenProps> = ({navigation}) => {
    const { phoneNumber, setPhoneNumber, password, setPassword } = React.useContext(SignInContext);
    const { setIdToken, setAccessToken } = useContext(AuthContext); 
    
    //signin 요청
    const signIn = async() => {
        try{

        }
        catch(error){
            console.log("error", error);
        }
    };

    return (
        <View style={styles.container}>
          <Text style={styles.title1}>Let me know your</Text>
          <Text style={styles.title2}>phone number</Text>
          <TouchableOpacity style={styles.phonenumber}>
            <TextInput style={styles.inputphonenumber} placeholder="Enter your phone number"  />
          </TouchableOpacity>
          <TouchableOpacity style={styles.code}>
          </TouchableOpacity>
          <TouchableOpacity style={styles.password}>
            <TextInput style={styles.passwordplaceholder} placeholder="Password"  />
          </TouchableOpacity>
          <TouchableOpacity style={styles.signinbtn} onPress={signIn}>
            <Text style={styles.signinbtnfont}>Sign In</Text>
          </TouchableOpacity>
        </View>
      );
    };
    
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor:'#FFFFFF',
        },
        title1: {
            fontSize: 32,
            fontWeight: 'bold',
            textAlign: 'left',
            position: 'absolute',
            top: 20,
            paddingLeft: 20,
        },
        title2: {
            fontSize: 32,
            fontWeight: 'bold',
            textAlign: 'left',
            position: 'absolute',
            top: 60,
            paddingLeft: 20,
        },
        inputtitle1: {
            top: 130,
            left: 30,
            fontSize: 18,
            color: 'gray',
        },
        inputtitle2: {
            top: 200,
            left: 30,
            fontSize: 18,
            color: 'gray',
        },
        inputtitle3: {
            top: 290,
            left: 30,
            fontSize: 18,
            color: 'gray',
        },
        inputphonenumber: {
        color: '#838796'
        },
        btncode: {
            color: '#838796'
        },
        signinbtn: {
            width: '85%',
            backgroundColor: '#ED6A2C',
            borderRadius: 30,
            textAlign: 'center',
            left: 30,
            height: 50,
            top: 300
        },
        signinbtnfont: {
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
            paddingTop: 14,
        },
        phonenumber:{
            width: '85%',
            backgroundColor:'#F1F1F4',
            borderRadius: 30,
            top: 160,
            color: 'black',
            padding: 15,
            position: 'absolute',
            textAlign: 'center',
            left: 30,
            height: 50,
        },
        code: {
            color: 'black',
            left: 290,
            top: 155,
        },
        password:{
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
        passwordplaceholder: {
            color: 'black',
            left: 10
        },
        confirmpassword:{
            width: '85%',
            backgroundColor: 'lightgray',
            borderRadius: 30,
            top: 380,
            color: 'black',
            padding: 15,
            position: 'absolute',
            textAlign: 'center',
            left: 30,
            height: 50,
        }
    });
    

export default PhoneLoginScreen;