import { StyleSheet, Text, View, TouchableOpacity, TextInput, Platform, Linking, Modal } from "react-native";
import socket from '../utils/socket.io';
import React, { useEffect, useState } from 'react';
import { AsyncStorage } from "@aws-amplify/core";
import { Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import { getDriverInfo } from "../state/queries";

const EditProfileScreen = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [driverInfo, setDriverInfo] = useState({
    driverFirstName: '',
    driverLastName: '',
    driverMobileNum: ''
  });
  const navigation = useNavigation();

  // AsyncStorage에서 드라이버 정보 가져오기
  // useEffect(() => {
  //   const getDriverInfo = async () => {
  //     try {
  //       const data = await AsyncStorage.getItem('driverInfo');
  //       if (data) {
  //         const driverInfo = JSON.parse(data);
  //         setFirstName(driverInfo.driverFirstName);
  //         setLastName(driverInfo.driverLastName);
  //         setPhoneNumber(driverInfo.driverMobileNum);
  //         console.log('드라이버 정보', driverInfo.driverFirstName, driverInfo.driverLastName, driverInfo.driverMobileNum );
  //       }
  //     } catch (error) {
  //       console.log('드라이버 정보 가져오기 에러', error);
  //     }
  //   };

  //   getDriverInfo();
  // }, []);



  useEffect(() => {
    const fetchDriverInfo = async () => {
      setLoading(true);
      try {
        const driverData = await getDriverInfo();
        if (driverData && driverData.data && driverData.data.length > 0) {
          const driverInfoData = driverData.data[0];
          setDriverInfo({
            driverFirstName: driverInfoData.driverFirstName,
            driverLastName: driverInfoData.driverLastName,
            driverMobileNum: driverInfoData.driverMobileNum
          });
          // AsyncStorage에 드라이버 정보 저장
          await AsyncStorage.setItem('driverFirstName', driverInfoData.driverFirstName);
          await AsyncStorage.setItem('driverLastName', driverInfoData.driverLastName);
          await AsyncStorage.setItem('driverMobileNum', driverInfoData.driverMobileNum);
        }
        setLoading(false);
      } catch (error) {
        console.log('드라이버 기본 정보 저장 에러', error);
        setLoading(false);
      }
    };
    
    fetchDriverInfo();
  }, []);

  // import 해온 소켓 이벤트 핸들러 등록
  useEffect(() => {
    socket.on('orderList', (data: any) => {
      setOrders(data);
    });
  }, []);

  // 로그아웃 확인 모달 열기 
  const handleModalOpen = (slot: any) => {
    setModalVisible(true);
  };

  // 로그아웃 확인 모달 닫기 
  const handleModalClose = () => {
    setModalVisible(false);
  };

  // 로그아웃 함수
  const handleLogout = async () => {
    try {
      // AWS Cognito에 로그아웃 요청
      await Auth.signOut();
      // 모달 닫기
      handleModalClose();
      // StartScreen으로 이동
      navigation.navigate('Start');
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.boxcolumn}>
        <View style={styles.box1}>
          <Text style={styles.FN}>First Name</Text>
          <Text style={styles.LN}>Last Name</Text>
        </View>
        <View style={styles.box2}>
          <TouchableOpacity style={styles.firstname}>
            <TextInput
              style={styles.inputfirstname}
              value={loading ? 'Loading...' : driverInfo.driverFirstName} 
              editable={false} // 입력 및 수정 불가 설정
              selectTextOnFocus={false} // 입력 및 수정 불가 설정
           />

          </TouchableOpacity>
          <TouchableOpacity style={styles.lastname}>
            <TextInput
              style={styles.inputlastname}
              value={loading ? 'Loading...' : driverInfo.driverLastName} 
              editable={false} // 입력 및 수정 불가 설정
              selectTextOnFocus={false} // 입력 및 수정 불가 설정
            />
          </TouchableOpacity>
        </View>
        <View style={styles.box3}>
          <Text style={styles.PN}>Phone Number</Text>
          <TouchableOpacity style={styles.phonenumber}>
            <TextInput
              style={styles.inputphonenumber}
              value={loading ? 'Loading...' : driverInfo.driverMobileNum} 
              editable={false} // 입력 및 수정 불가 설정
              selectTextOnFocus={false} // 입력 및 수정 불가 설정
            />
          </TouchableOpacity>
        </View>
        <View style={styles.box4}>
          <TouchableOpacity 
            style={styles.requestbtn} 
            onPress={() => {Linking.openURL('tel:01056325968');}
          }
          >
            <Text style={styles.requestbtnfont}>Request the Modify</Text>
          </TouchableOpacity>
          <TouchableOpacity>
          <Text 
            style={styles.SO}
            onPress={handleModalOpen}  
          >
          Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/*로그아웃 확인 모달창*/}
      <Modal visible={modalVisible} animationType="slide">
              <View style={styles.modalContainer1}>
                  <View style={styles.modalContainer2}>
                    <Text style={styles.modalText1}>Are you sure you want to sign out of your account?</Text>
                    {/*Cancel 클릭시*/}
                    <TouchableOpacity style={styles.modalbtn1} 
                    >
                    <Text 
                      style={styles.modalbtnfont1}
                      onPress={handleModalClose}
                    >Cancel</Text>
                    </TouchableOpacity>
                    {/*Sign Out 클릭시*/}
                    <TouchableOpacity style={styles.modalbtn2} 
                    >
                    <Text 
                      style={styles.modalbtnfont2}
                      onPress={handleLogout}
                    >Sign Out</Text>
                    </TouchableOpacity>
                  </View>
                  </View>
          </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FFFFFF',
        // paddingTop: Platform.OS === 'android' ? 0 : Platform.OS === 'ios' ? 0 : 0, // 상단 여백 조정
    },
    boxcolumn: {
        width: '91.46%',
        alignSelf: 'center',
        height: '100%',
    },
    box1: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        top: 28,
    },
    box2: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: 52,
        paddingTop:6,
        width: '100%',
        height: 52,
    },
    box3: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: 120,
        width: '100%',
        height: 124,
    },
    box4: {
        position: 'absolute',
        top: 284,
        width: '100%',
        height: 83,
        textAlign: 'center',
        alignContent: 'center',
    },
    FN: {
        fontSize: 14,
        height: 18,
        color: '#838796',
        left: '0%',
        width: '50%',
    },
    LN: {
        fontSize: 14,
        height: 18,
        color: '#838796',
        width: '50%',
    },
    firstname: {
        width: '48.6%',
    },
    inputfirstname: {
        backgroundColor:'#F1F1F4',
        borderRadius: 23,
        color: '#9EA1AE',
        padding: 15,
        height: 46,
        fontSize: 14,
    },
    boxFN: {
        width: '50%',
        height: 120,
    },
    lastname: {
        width: '48.6%',
    },
    inputlastname: {
        backgroundColor:'#F1F1F4',
        borderRadius: 23,
        color: '#9EA1AE',
        padding: 15,
        height: 46,
        fontSize: 14,
        fontWeight: 'solid'
    },
    PN:{
        fontSize: 14,
        color: '#838796',
        width: '100%',
    },
    phonenumber:{
        position: 'absolute',
        height: 46,
        width: '100%',
        top: 24,
    },
    inputphonenumber: {
        width: '100%',
        position: 'absolute',
        backgroundColor:'#F1F1F4',
        borderRadius: 23,
        color: '#9EA1AE',
        padding: 10,
        paddingLeft: 20,
        height: 46,
        fontSize: 14,
        top: 6,
    },
    SO: {
        // position: 'absolute',
        fontSize: 14,
        color: '#838796',
        alignItems: 'center',
        textAlign: 'center',
        top: 24,
    },
    btncode: {
        color: '#838796'
    },
    requestbtn: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        height: 46,
        borderWidth: 1,
    },
    requestbtnfont: {
        color: '#393C46',
        fontWeight: 'bold',
        fontSize: 18,
        alignItems: 'center',
        textAlign: 'center',
        padding: 10,
    },
    code: {
        color: 'black',
        left: 290,
        top: 155,
    },
    modalContainer1: {
      backgroundColor: 'rgba(0,0,0,0.9)',
      height: '100%',
      width: '100%',
      position: 'absolute',
    },
    modalContainer2: {
      width: '91.46%',
      height: 210,
      top: 295,
      bottom: 295,
      borderRadius: 4,
      zIndex: 99,
      backgroundColor: '#FFFFFF',
      position: 'absolute',
      alignSelf: 'center',
    },
    modalText1: {
      //fontFamily: 'Poppins',
      color:'#22232B',
      fontSize: 16,
      fontWeight: 'bold',
      padding: 9,
      alignContent: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      top: 55,
    },
    modalText2: {
      color: '#838796',
      top: 59,
      fontSize: 12,
      alignContent: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
    modalbtn1: {
      backgroundColor: '#FFFFFF',
      height: 46,
      borderRadius: 24,
      left: 10,
      top: 148,
      position: 'absolute',
      width: '45.5%',
      borderColor: 'black',
      borderWidth: 1,
    },
    modalbtn2: {
      backgroundColor: '#ED6A2C',
      height: 46,
      borderRadius: 24,
      left: 181,
      top: 148,
      position: 'absolute',
      width: '45.5%',

    },
    modalbtnfont1: {
      color: 'black',
      //fontFamily: 'Poppins',
      fontSize: 16,
      fontWeight: 'bold',
      padding: 13,
      alignContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      position: 'absolute',
    },
    modalbtnfont2: {
      color: '#ffffff',
      //fontFamily: 'Poppins',
      fontSize: 16,
      fontWeight: 'bold',
      padding: 13,
      alignContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      position: 'absolute',
    },
});

export default EditProfileScreen;