import * as React from 'react';
import { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { SignInContext } from '../contexts/SignInContext';
import { AuthContext } from '../contexts/AuthContext';
import { Amplify, Auth } from 'aws-amplify'
import CryptoJS from 'crypto-js';
import AsyncStorage from '@react-native-async-storage/async-storage'; //로그인 후 앱을 나가도 상태를 유지하기 위함

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

  //로그인 요청 함수 
  const signIn = async () => {
    try {
      if (phoneNumber === '' || password === '') {
        // 폰 번호 또는 비밀번호가 비어 있는 경우 함수를 빠져나가기
        return console.log('폰 번호 또는 비밀번호가 비어있음');
      }
  
      //로그인 되는 순간
      const user = await Auth.signIn(phoneNumber, password);
  
      if (!user) {
        console.log('!user임');
        return;
      }
      console.log('로그인 확인', user);
  
      // user의 "challengeName"가 "NEW_PASSWORD_REQUIRED"인 경우는 navigation.navigate('ChangePassword')로 이동
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        console.log('확인1');
        return navigation.navigate('ChangePassword', { user }); // 전달 수정
        console.log('확인2');
        await AsyncStorage.setItem('userToken', user.signInUserSession.accessToken.jwtToken);
       
      } 
      else {
        console.log('확인3');
        // user의 "challengeName"이 "NEW_PASSWORD_REQUIRED"가 아닌 경우는 navigation.navigate('Home')으로 이동
        return navigation.navigate('Home', { user }); // 전달 수정
        console.log('확인4');
        await AsyncStorage.setItem('userToken', user.signInUserSession.accessToken.jwtToken);
      }
    } catch (error) {
      console.log('에러 발생', error);
    }
  };
  
  

  // 이전에 로그인 한 적이 있는지 확인하고, 있다면 자동으로 로그인 처리하기
    const checkLoginStatus = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        console.log('userToken임', userToken);
    if (userToken !== null) {
      navigation.navigate('Home');
    }
  };
  

  // PhoneLoginScreen 컴포넌트가 마운트될 때 checkLoginStatus 실행
  React.useEffect(() => {
    checkLoginStatus();
  }, []);


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