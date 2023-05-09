import * as React from 'react';
import { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { SignInContext } from '../contexts/SignInContext';
import { AuthContext } from '../contexts/AuthContext';
import { Amplify, Auth } from 'aws-amplify'
import CryptoJS from 'crypto-js';

//드라이버앱에서는 로그인만!
interface PhoneLoginScreenProps {
    navigation: any; 
    accessToken: any;
}

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || '';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET || '';

Amplify.configure({
    Auth: {
      region: 'us-west-2',
      userPoolId: 'us-west-2_UZwUaizX7',
      userPoolWebClientId: '2i53te99k4gvkam856n6entaeq',
      identityPoolId: 'us-west-2:e3f65917-26d4-411e-af9e-3a08fbb92c98'
    }
  });


const PhoneLoginScreen: React.FunctionComponent<PhoneLoginScreenProps> = ({navigation}) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showVerification, setShowVerification] = useState(false);

    

    //signin 요청
    const signIn = async() => {
        try {
            if (phoneNumber === '' || password === '') {
                // 폰 번호 또는 비밀번호가 비어 있는 경우 함수를 빠져나가기
                return console.log('폰 번호 또는 비밀번호가 비어있다!');
                }
            //const user로 정의 후 console.log(user)로 확인하면 cognito에서 주는 정보 볼 수 있다. 
            const user = await Auth.signIn(phoneNumber, password);
            console.log('User successfully signed in!', user);
            // user의 "challengeName"가 "NEW_PASSWORD_REQUIRED"인 경우는 navigation.navigate('ChangePassword')로 이동
            if(user.challengeName === 'NEW_PASSWORD_REQUIRED'){
                return navigation.navigate('ChangePassword', { user }); // 전달 수정 
            } 
            // user의 "challengeName"이 "NEW_PASSWORD_REQUIRED"가 아닌 경우는 navigation.navigate('Home')으로 이동
            else {
                return navigation.navigate('Home', { user });// 전달 수정
            }
          } catch (error) {
            console.log('에러!!!!', error);
          }
    };
    


    return (
        <View style={styles.container}>
          <Text style={styles.title1}>Let me know your</Text>
          <Text style={styles.title2}>phone number.</Text>
          <TouchableOpacity style={styles.phonenumber}>
            <TextInput style={styles.inputphonenumber} placeholder="ex) +8201012345678" defaultValue={phoneNumber} onChangeText={phoneNumber => setPhoneNumber(phoneNumber)} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.password}>
            <TextInput style={styles.passwordplaceholder} placeholder="Password" defaultValue={password} onChangeText={password => setPassword(password)} />
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
        color: 'black',
        left: 10
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