import * as React from 'react';
import { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, ActivityIndicator, KeyboardType, KeyboardTypeOptions, ReturnKeyType } from "react-native";
import { Amplify, Auth } from 'aws-amplify'
import AsyncStorage from '@react-native-async-storage/async-storage'; //로그인 후 앱을 나가도 상태를 유지하기 위함
import { useMutation } from 'react-query';
import axios from 'axios';
import { useUpdateDriverStatusStart } from '../state/mutations';
import { getDriverInfo } from '../state/queries';
import { Alert } from 'react-native';


//드라이버앱에서는 로그인만!
interface PhoneLoginScreenProps {
  navigation: any; 
  accessToken: any;
}

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || '';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET || '';

//Cognito 설정
Amplify.configure({
  Auth: {
    region: 'us-west-2',
    userPoolId: 'us-west-2_UZwUaizX7',
    userPoolWebClientId: '2i53te99k4gvkam856n6entaeq',
    identityPoolId: 'us-west-2:e3f65917-26d4-411e-af9e-3a08fbb92c98'
  }
});


const PhoneLoginScreen=  ({ navigation }: PhoneLoginScreenProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const passwordInputRef = useRef<TextInput>(null);

  //로그인 요청 함수 
  const signIn = async () => {
    try {
      setIsLoading(true);
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
       // 로그인 후 phoneNumber과 토근들을 AsyncStorage에 저장(AsyncStorage에 저장되는 데이터가 모두 문자열로 저장)
       await AsyncStorage.setItem('phoneNumber', phoneNumber);
       console.log('전화번호 확인', phoneNumber);
  
      // 1)user의 "challengeName"가 "NEW_PASSWORD_REQUIRED"인 경우는 navigation.navigate('ChangePassword')로 이동
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        console.log('확인1');
        return navigation.navigate('ChangePassword', { user }); // 전달 수정
        // console.log('확인2');
        await AsyncStorage.setItem('userToken', user.signInUserSession.accessToken.jwtToken);
       
      } 
      else {
        console.log('확인3');
        // 2)user의 "challengeName"이 "NEW_PASSWORD_REQUIRED"가 아닌 경우는 
        await AsyncStorage.setItem('idToken', user.signInUserSession.idToken.jwtToken);
        await AsyncStorage.setItem('refreshToken', user.signInUserSession.refreshToken.token);
        await AsyncStorage.setItem('accessToken', user.signInUserSession.accessToken.jwtToken);
        // 2-1)드라이버 기본 정보 불러오기(api 요청)
        const driverInfo = await getDriverInfo();
        console.log('드라이버 기본 정보:', driverInfo);
        // 2-2)api 요청이 성공하면, 홈으로 이동한다
        // navigation.navigate('Home')으로 이동
        return navigation.navigate('Home', { user }); // 전달 수정
        // console.log('확인4');
        await AsyncStorage.setItem('userToken', user.signInUserSession.accessToken.jwtToken);
      }
    } catch (error: any) {
      console.log('에러 발생', error);
      // 에러 발생 시, 에러 alert 띄우기(2번 뜨고 있다, 수정 필요)
      Alert.alert('Error', 'Incorrect username or password');
      //올바르게 입력 후 여러번 눌렀을 때 틀렸다고 나옴

    }
    finally {
      setIsLoading(false);
    }
  };


  
  
  // // 이전에 로그인 한 적이 있는지 확인하고, 있다면 자동으로 로그인 처리하기(잠시 주석)
  //   const checkLoginStatus = async () => {
  //       const userToken = await AsyncStorage.getItem('userToken');
  //       console.log('userToken임', userToken);
  //   if (userToken !== null) {
  //     navigation.navigate('Home');
  //   }
  // };
  

  // //자동 로그인과 로그아웃에 대한 처리하기(잠시 주석) 
  
  const checkLoginStatus = async () => {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    const accessToken = await AsyncStorage.getItem('accessToken');

    if (refreshToken && accessToken) {
      // 여기에서 refreshToken과 accessToken의 유효성을 검사하고 필요한 처리를 진행합니다.
      // 예를 들어, 토큰이 만료되었으면 navigation.navigate('Start')로 이동합니다.
      // 유효한 경우 navigation.navigate('Home')으로 이동합니다.
      // 이 예제에서는 유효성 검사를 하지 않고 바로 Home으로 이동하도록 작성합니다.
      navigation.navigate('Home');
    } else {                  
      navigation.navigate('Start');
    }
  };



  // // PhoneLoginScreen 컴포넌트가 마운트될 때 checkLoginStatus 실행
  React.useEffect(() => {
    checkLoginStatus();
    // checkRefreshtokensStatus();
  }, []);


    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.boxcolumn}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ED6A2C" />
          </View>
        )}
          <View style={styles.box}>
            <View style={styles.phonenumber}>
              <TextInput 
              ref={passwordInputRef}
                style={styles.inputphonenumber} 
                // placeholder="+8201012345678" 
                placeholder="JayShin@shinstarr.com" 
                defaultValue={phoneNumber} 
                onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
                autoCapitalize="none" //자동 대문자 방지
                keyboardType={Platform.OS === 'ios' ? 'email-address' : 'email'} //키보드 종류 변경하기
                returnKeyType="next" // 첫번째 TextInput에서는 "next"로 설정
              />
            </View>
            <View style={styles.password}>
              <TextInput 
                style={styles.passwordplaceholder} 
                placeholder="Password" 
                defaultValue={password} 
                onChangeText={password => setPassword(password)}
                autoCapitalize="none" //자동 대문자 방지
                returnKeyType="done" // 마지막 TextInput에서는 "done"로 설정
                secureTextEntry 
              />
            </View>
            <TouchableOpacity style={styles.signinbtn} onPress={signIn}>
              <Text style={styles.signinbtnfont}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback> 
  );
};

    
    
    const styles = StyleSheet.create({
      // test: {
      //   position: 'absolute',
      //   width: '100%',
      //   backgroundColor: 'green',
      //   borderRadius: 29,
      //   textAlign: 'center',
      //   height: 46,
      //   top: 410,
      // },
        container: {
            flex: 1,
            backgroundColor:'#FFFFFF',
        },
        boxcolumn: {
          width: '91.46%',
          alignSelf: 'center',
          height: '100%',
      },
      loadingContainer: {
        position: 'absolute',
        top: '50%',
        left: '46.5%',
        zIndex: 999,
        justifyContent: 'center',
        alignItems: 'center',
      },
        box: {
          position: 'absolute',
          height: 170,
          width: '100%',
          top:30,
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
            position: 'absolute',
            width: '100%',
            backgroundColor: '#ED6A2C',
            borderRadius: 29,
            textAlign: 'center',
            height: 46,
            top: 124
        },
        signinbtnfont: {
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
            paddingTop: 15,
        },
        phonenumber:{
          position: 'absolute',
            width: '100%',
            backgroundColor:'#F1F1F4',
            borderRadius: 29,
            color: 'black',
            padding: 15,
            textAlign: 'center',
            height: 46,
        },
        code: {
            color: 'black',
            left: 290,
            top: 155,
        },
        password:{
          position: 'absolute',
            width: '100%',
            backgroundColor:'#F1F1F4',
            borderRadius: 29,
            top: 58,
            color: 'blck',
            padding: 15,
            textAlign: 'center',
            height: 46,
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