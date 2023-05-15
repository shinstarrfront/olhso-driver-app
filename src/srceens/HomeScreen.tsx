import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Modal, Button } from "react-native";
import MapView from 'react-native-maps';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Dimensions } from 'react-native';
import {createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList,DrawerItem, DrawerNavigationProp } from '@react-navigation/drawer';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import socket from '../utils/socket.io';
import 'react-native-reanimated';
import SwipeButton from '@dillionverma/react-native-swipe-button';



interface HomeScreenProps {
    navigation: DrawerNavigationProp<Record<string, object>, string>;
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [nonModalHeight, setNonModalHeight] = React.useState(Dimensions.get('window').height / 3);
  const animation = React.useRef(new Animated.Value(Dimensions.get('window').height / 3)).current;
  const [orders, setOrders] = useState([]);

  // 소켓 연결 및 이벤트 핸들러 등록(중앙에서 관리하도록 분리 전 코드)
//   useEffect(() => {
//     // 위치 권한 요청
//     (async () => {
//         const { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//           console.log('위치 액세스 권한이 거부됨');
//           return;
//         }
//       })();

//     // socket.io-client 생성
//     const socket = io('http://localhost:8080/truck', 
//      { transports: ['websocket'] });
    
//     // connect 이벤트 구독(출근)
//     socket.on('connect', () => {
//       console.log('소켓 연결 성공적');
//     });
  
//     // Truck & Drive NameSpace에 속한 TruckID 룸에 입장하고 enterRoom 이벤트 발생
//     socket.emit('enterRoom', 
//      { truckID: '1234' });
  
//     // orderList 이벤트를 구독
//     socket.on('orderList', (data) => {
//       console.log('주문 목록 이벤트가 수신됨', data);
//     });
  
//     // GPS 정보를 업데이트하는 함수
//     const updateLocation = (truckID:string, lng: number, lat: number) => {
//         socket.emit('updateLocation', 
//          { truckID, lng, lat }, 'Truck & Drive', 'TruckID');
//      }
  
//     // 위치 정보 업데이트를 위한 이벤트 핸들러 등록(expo-location 사용)
//     Location.watchPositionAsync({ accuracy: Location.Accuracy.High }, 
//         (position)=> {
//             const { coords } = position;
//             const { longitude, latitude } = coords;
//             updateLocation('1234', longitude, latitude);
//      });
  
  
//     return () => {
//       // 컴포넌트가 unmount될 때 소켓 연결 종료(퇴근)
//      //  socket.disconnect();
//     };
//   }, []);
  
    //import 해온 소켓 이벤트 핸들러 등록
    useEffect(() => {
        socket.on('orderList', (data:any) => {
          setOrders(data);
        });
      }, []);
  
  //모달 위로 올리기 함수
  const onButtonPress = () => {
    const newHeight = nonModalHeight === Dimensions.get('window').height / 3 ? Dimensions.get('window').height * 0.9 : Dimensions.get('window').height / 3;

    Animated.timing(animation, {
      toValue: newHeight,
      duration: 500,
      useNativeDriver: false,
    }).start();

    setNonModalHeight(newHeight);
  };
 
  //Drawer 함수
  const Drawer = createDrawerNavigator();


  return (
    <View style={styles.container}>
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
      <Animated.View style={[styles.nonModal, { height: animation }]}>
      <SwipeButton />
         <TouchableOpacity onPress={onButtonPress} style={[styles.button, { marginTop: 5 }]} />
         <View>
         {orders.map((orders) => (
              <Text>Orders: {JSON.stringify(orders)}</Text>
            ))}
         </View>
     </Animated.View>
     </View>
  );
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
  map: {
    width: '100%',
    height: '100%'
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
  
});

export default HomeScreen;
