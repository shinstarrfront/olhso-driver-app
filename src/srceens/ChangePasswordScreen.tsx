import * as React from 'react';
import { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { SignInContext } from '../contexts/SignInContext';
import { Auth } from 'aws-amplify'
import { CognitoUser } from 'amazon-cognito-identity-js';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { getDriverInfo } from '../state/queries';


interface ChangePasswordScreenRouteProp extends RouteProp<RootStackParamList, 'ChangePassword'> {}
interface ChangePasswordScreenNavigationProp extends StackNavigationProp<RootStackParamList, 'ChangePassword'> {}

interface ChangePasswordScreenProps {
  route: ChangePasswordScreenRouteProp;
  navigation: ChangePasswordScreenNavigationProp;
}

const ChangePasswordScreen: React.FunctionComponent<ChangePasswordScreenProps> = ({navigation, route}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPasswordCheckNo, setShowPasswordCheckNo] = useState(false);
  const [showPasswordCheckOk, setShowPasswordCheckOk] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [isChangingPassword, setIsChangingPassword] = useState(false); // 변경된 부분
  const { user } = route.params; // 전달 받기

  const handlePasswordChange = (value: string) => {
    setNewPassword(value);
    setIsPasswordValid(value.length >= 8);
    setHasLowerCase(/[a-z]/.test(value));
    setHasUpperCase(/[A-Z]/.test(value));
    setHasNumber(/[0-9]/.test(value));
    setHasSpecialChar(/[!@#$%^&*()]/.test(value));
    if (confirm !== '' && value !== confirm) {
      setShowPasswordCheckNo(true);
      setShowPasswordCheckOk(false);
    } else {
      setShowPasswordCheckNo(false);
      setShowPasswordCheckOk(false);
    }
  };


  const handleConfirmChange = (value: string) => {
    setConfirm(value);
    if (value !== newPassword) {
      setShowPasswordCheckNo(true);
      setShowPasswordCheckOk(false);
    } else {
      setShowPasswordCheckNo(false);
      setShowPasswordCheckOk(true);
    }
  };

  //changed 버튼을 눌렀을 때 실행되는 함수
const changePassword = async () => {
    if (newPassword !== confirm) {
      setShowPasswordCheckNo(true);
      setShowPasswordCheckOk(false);
      return;
    }
  
    // 로딩 인디케이터 활성화
    setIsLoading(true);

    // // 이미 패스워드 변경 중인 경우 더 이상의 요청을 처리하지 않음
    // if (isChangingPassword) {
    //   return;
    // }

    // setIsChangingPassword(true); // 패스워드 변경 중으로 표시
  
    try {
      setIsLoading(true);
      await Auth.completeNewPassword(user, newPassword);
      console.log('Password changed successfully', user);
      await AsyncStorage.setItem('phoneNumber', user.signInUserSession.phone_Number);
      await AsyncStorage.setItem('idToken', user.signInUserSession.idToken.jwtToken);
      await AsyncStorage.setItem('refreshToken', user.signInUserSession.refreshToken.token);
      await AsyncStorage.setItem('accessToken', user.signInUserSession.accessToken.jwtToken);
      console.log('AsyncStorage 저장된 핸드폰 번호', user.signInUserSession.phone_Number);
      console.log('AsyncStorage에 user 정보 저장', user);

      // 드라이버 기본 정보 불러오기(api 요청)
      const driverInfo = await getDriverInfo();
      console.log('드라이버 기본 정보:', driverInfo);

      // 홈으로 이동
      navigation.navigate('Home');
      console.log('Home으로 이동');

    } catch (error) {
      console.log('패스워드 수정 에러', error);
      alert('Please try again later.');
      //서버에서 에러를 줄 경우 어떻게 할지 프로세스 추가 필요!
    }
    finally {
      setIsLoading(false);
    }
  
    // 로딩 인디케이터 비활성화
    setIsLoading(false);
  };
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <View style={styles.container}>
      {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ED6A2C" />
          </View>
        )}
       <View style={styles.boxcolumn}> 
       <View style={styles.box}>
      <TouchableOpacity style={styles.password}>
        <TextInput 
        style={styles.inputpassword} 
        placeholder="Enter the new Password"
        defaultValue={newPassword}
        onChangeText={handlePasswordChange}
        secureTextEntry //입력 내용을 숨김 처리해줌
     />
      </TouchableOpacity>
      <TouchableOpacity style={styles.confirmpassword}>
      <TextInput 
        style={styles.inputconfirmpassword}  
        placeholder={'Confirm your Password'}  
        defaultValue={confirm} 
        onChangeText={handleConfirmChange}
        secureTextEntry //입력 내용을 숨김 처리해줌
        />
      </TouchableOpacity>
      </View>
      <View style={styles.box2}>
      <Text style={[styles.testpassword1, isPasswordValid && { color:  'black' }]}>
         <Text style={{ color: isPasswordValid ? '#ED6A2C' : '#FFFFFF' }}>✓</Text> At least 8 characters</Text>
      <Text style={[styles.testpassword2, hasLowerCase && { color: 'black' }]}>
        <Text style={{ color: hasLowerCase ? '#ED6A2C' : '#FFFFFF' }}>✓</Text> One lower case letter</Text>
      <Text style={[styles.testpassword3, hasUpperCase && { color: 'black' }]}>
        <Text style={{ color: hasUpperCase ? '#ED6A2C' : '#FFFFFF' }}>✓</Text> One upper case letter</Text>
      <Text style={[styles.testpassword4, hasNumber && { color: 'black' }]}>
        <Text style={{ color: hasNumber ? '#ED6A2C' : '#FFFFFF' }}>✓</Text> One number</Text>
      <Text style={[styles.testpassword5, hasSpecialChar && { color: 'black' }]}>
        <Text style={{ color: hasSpecialChar ? '#ED6A2C' : '#FFFFFF' }}>✓</Text> One special character</Text>
      {showPasswordCheckNo && <Text style={styles.testpasswordcheckno}>✕ Password doesn't match</Text>}
      {showPasswordCheckOk && <Text style={styles.testpasswordcheckok}>✓ The passwords match</Text>}
      </View>
      <View style={styles.box3}>
      <TouchableOpacity style={styles.changedbtn} onPress={changePassword} disabled={showPasswordCheckNo} >
        <Text style={styles.changedbtnfont}>Sign In</Text>
      </TouchableOpacity>
      </View>
      </View>
    </View>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FFFFFF',
    },
    loadingContainer: {
      position: 'absolute',
      top: '50%',
      left: '46.5%',
      zIndex: 999,
      justifyContent: 'center',
      alignItems: 'center',
    },
    boxcolumn: {
      width: '91.46%',
      alignSelf: 'center',
      height: '100%',
  },
    box: {
      position: 'absolute',
      height: 170,
      width: '100%',
      top:30,
    },
    box2: {
      position: 'absolute',
      width: '100%',
      heigth: 300,
      top: 157,
      // left: 20
    },
    box3: {
      position: 'absolute',
      top: 325,
      width: '100%',
      marginTop: 30
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
      position: 'absolute',
      width: '100%',
      backgroundColor:'#F1F1F4',
      borderRadius: 29,
      color: 'black',
      padding: 15,
      textAlign: 'center',
      height: 46,
    },
    inputpassword: {
        color: 'black',
        left: 10
    },
    confirmpassword: {
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
    inputconfirmpassword: {
        color: 'black',
        left: 10
    },
    changedbtn: {
      width: '100%',
      backgroundColor: '#ED6A2C',
      borderRadius: 29,
      textAlign: 'center',
      height: 46,
    },
    changedbtnfont: {
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
      paddingTop: 15,
    },
    testpassword1: {
      color: '#838796',
      fontSize: 13,
    },
    testpassword2: {
      color: '#838796',
      marginTop: 12,
      fontSize: 13,
    },
    testpassword3: {
      color: '#838796',
      marginTop: 12,
      fontSize: 13,
    },
    testpassword4: {
      color: '#838796',
      marginTop: 12,
      fontSize: 13,
    },
    testpassword5: {
      color: '#838796',
      marginTop: 12,
      fontSize: 13,
    },
    testpasswordcheckno:{
      marginTop: 12,
      color: '#838796',
      fontSize: 13,
    },
    testpasswordcheckok: {
      marginTop: 12,
      color: '#ED6A2C',
      fontSize: 13,
    }
});

export default ChangePasswordScreen;