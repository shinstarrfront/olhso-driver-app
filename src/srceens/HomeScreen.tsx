import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Modal, Button, Image, ActivityIndicator } from "react-native";
import MapView from 'react-native-maps';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Dimensions } from 'react-native';
import {createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList,DrawerItem, DrawerNavigationProp } from '@react-navigation/drawer';
import { useEffect, useState } from 'react';
import socket from '../utils/socket.io';
import 'react-native-reanimated';
import SwipeButton from '@dillionverma/react-native-swipe-button';
import MenuIcon from '../assets/menu.png';
import AlertIcon from '../assets/alert.png';
import { useUpdateDriverStatusStart } from '../state/mutations';
import { AsyncStorage } from '@aws-amplify/core';
import { getPossibleTruckList } from '../state/queries';
import { getMenuInfo } from '../state/queries';

interface HomeScreenProps {
    navigation: DrawerNavigationProp<Record<string, object>, string>;
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [nonModalHeight, setNonModalHeight] = React.useState(Dimensions.get('window').height / 2.7);
  const animation = React.useRef(new Animated.Value(Dimensions.get('window').height / 2.7)).current;
  const [orders, setOrders] = useState([]);
  const updateDriverStatusStartMutation = useUpdateDriverStatusStart();
  const [isLoading, setIsLoading] = useState(false);

  //import 해온 소켓 이벤트 핸들러 등록
  useEffect(() => {
    socket.on('orderList', (data:any) => {
    setOrders(data);
    });
  }, []);
  
  //모달 위로 올리기 함수
  const onButtonPress = () => {
    const newHeight = nonModalHeight === Dimensions.get('window').height / 2.7 ? Dimensions.get('window').height * 0.9 : Dimensions.get('window').height / 2.7;

    Animated.timing(animation, {
      toValue: newHeight,
      duration: 500,
      useNativeDriver: false,
    }).start();

    setNonModalHeight(newHeight);
  };
 
  //Navigate 이동 함수(클릭시 구글 내비게이션으로 이동해야함)
  const onNavigatePress = () => {};

  //Drawer 함수
  const Drawer = createDrawerNavigator();

  // 출근 완료 모달 열기 함수
  const openModal = () => {
    setModalVisible(true);
  };

  // 출근 완료 모달 닫기 함수
  const closeModal = (navigation:any) => {
    //Done 클릭시, 모달 닫고
    setModalVisible(false);

    // 운행 가능한 트럭 리스트 가져오기
    // 운행 가능한 트럭 리스트 가져오기, 내용 console.log로 확인
    // 운행 가능한 트럭 리스트 가져오기, AsyncStorage에 저장
    getPossibleTruckList()
      .then((trucks) => {
        console.log('운행 가능한 트럭 리스트 - ', trucks.data);
        AsyncStorage.setItem('possibleTruckList', JSON.stringify(trucks.data));
      })
      .catch((error) => {
        console.log('운행 가능한 트럭 리스트 가져오기 오류 - ', error.response.data, error.response.status);
      });

    // 메뉴 정보 확인 
    // 메뉴 정보 확인, 내용 console.log로 확인
    // 메뉴 정보 확인, AsyncStorage에 저장
    getMenuInfo()
      .then((menus) => {
        console.log('메뉴 정보 - ', menus.data);
        AsyncStorage.setItem('menuInfo', JSON.stringify(menus.data.menuName));
      })
      .catch((error) => {
        console.log('메뉴 정보 확인 오류 - ', error);
      });

    // 화면 이동
    navigation.navigate('TruckInfo'); 

  
  };
  
// 스와이프를 넘겼을 때 
const handleAttendanceComplete = async () => {
  try {
    setIsLoading(true);
    openModal(); // 모달 열기
  } 
  catch(error){
    console.log('에러 발생 - ', error);
  }
  finally{
    setIsLoading(false);
    console.log('로딩끝')
  }
};

//출근 완료 Done 버튼 클릭시
const handleAttendance = async () => {
try{
  setIsLoading(true);
  closeModal(navigation); // 모달 닫기
  console.log('출근 완료');
  }
catch(error){
  console.log('에러 발생 - ', error);
}
finally{
  setIsLoading(false);
  console.log('던 로딩끝')
}
};

  return (
    <View style={styles.container}>
      {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ED6A2C"  />
          </View>
        )}
      <MapView //구글 지도 띄우기 
        style={styles.map}
        initialRegion={{
          latitude: 37.50736766932199,
          longitude: -122.26005668254102,
          latitudeDelta: 0.1, //확대 레벨 조정
          longitudeDelta: 0.1, //확대 레밸 조정
        }}
        provider={PROVIDER_GOOGLE}
      > 
        <Marker
          coordinate={{
            latitude: 37.50736766932199,
            longitude: -122.26005668254102,
          }}
          pinColor="red"
          title="Hi there"
          description="This my test"
        />
      </MapView>
      <TouchableOpacity onPress={onNavigatePress} style={styles.navigatebtn}>
          <Text style={styles.navigatebtnfont}>Navigate</Text> 
      </TouchableOpacity>
        <Image
          source={MenuIcon}
          style={styles.menuIcon}
        />
        <Image
          source={AlertIcon}
          style={styles.alertIcon}
        />
      <Animated.View style={[styles.nonModal, { height: animation }]}>
      {/*출근하기 버튼*/}
      <SwipeButton 
      title="Slide To Start Delivery"
      onSwipeEnd={handleAttendanceComplete}
      />
         <TouchableOpacity onPress={onButtonPress} hitSlop={15} style={[styles.button, { marginTop: 5 }]} />
         <View>
         {/* {orders.map((orders) => (
              <Text style={styles.orders}>Orders: {JSON.stringify(orders)}</Text>
            ))} */}
         </View>
     </Animated.View>
       {/*출근완료 모달 시작*/}
     <Modal visible={modalVisible} animationType="slide">
     <View style={styles.modalContainer1}>
        <View style={styles.modalContainer2}>
          <Text style={styles.modalText}>Welcome to OLHSO</Text>
          {/* <Button title="Done" onPress={closeModal} style={styles.modalbtn} /> */}
          <TouchableOpacity style={styles.modalbtn} 
          onPress={() => closeModal(navigation)}
          // onPress={handleAttendance}
          >
            <Text style={styles.modalbtnfont}>Done</Text>
          </TouchableOpacity>
        </View>
        </View>
      </Modal>
      {/*출근완료 모달 끝*/}
     </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '46.5%',
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orders: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
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
  title: {
    fontSize: 30,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  menuIcon: {
    height: 42,
    top: 30,
    left: 16,
  },
  alertIcon: {
    height: 42,
    top: 30,
  },
  nonModal: {
    position: "absolute",
    bottom: 0,
    width: '100%',
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'lightgray',
    padding: 3,
    margin: 5,
    borderRadius: 5,
    width: 90,
    position: 'absolute',
    top: 10,
  },
  navigatebtn: {
    backgroundColor:'black',
    position: 'absolute',
    width: 102,
    height: 32,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    right: 16,
    top: 481,
    bottom: 12,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',
  },
  navigatebtnfont: {
    //fontFamily: 'Poppins',
    color:'#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 9,
    alignContent: 'center',
    justifyContent: 'center',
  },
  modalText: {
    //fontFamily: 'Poppins',
    color:'#22232B',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 9,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    top: 66,
  },
  modalbtn: {
    backgroundColor: '#ED6A2C',
    height: 46,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    top: 148,
    position: 'absolute',
    width: '91.46%',
    alignSelf: 'center',
  },
  modalbtnfont: {
    color: '#ffffff',
    //fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 9,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'absolute',
  },
});

export default HomeScreen;
