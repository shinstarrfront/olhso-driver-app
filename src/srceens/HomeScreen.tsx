import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from "react-native";
import MapView from 'react-native-maps';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const HomeScreen = () => {
  const [nonModalHeight, setNonModalHeight] = React.useState(Dimensions.get('window').height / 3);
  const animation = React.useRef(new Animated.Value(Dimensions.get('window').height / 3)).current;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // socket.io-client 생성
    const socket = io('http://localhost:8080', { transports: ['websocket'] });

    // Truck & Drive NameSpace에 속한 TruckID 룸에 입장하고 enterRoom 이벤트 발생
    socket.emit('enterRoom', { roomName: 'TruckID', nameSpace: 'Truck & Drive' });

    // orderList 이벤트를 구독
    socket.on('orderList', (data) => {
      console.log('orderList event received: ', data);
    });

    return () => {
      // 컴포넌트가 unmount될 때? 퇴근할때 소켓 연결 종료해야한다
      socket.disconnect();
    };
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




  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.circleButton1, { left: 0 }]} />
      <TouchableOpacity style={[styles.circleButton2, { right: 0 }]} />

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
         <TouchableOpacity onPress={onButtonPress} style={[styles.button, { marginTop: 5 }]} />
         {orders && (
         <View>
         <Text>Order List:</Text>
         {orders.map((order) => (
        <Text key={order}>{order}</Text>
      ))}
    </View>
  )}
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
    width: "100%",
    height: "100%"
  },
  nonModal: {
    position: "absolute",
    bottom: 0,
    width: "100%",
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
  circleButton1: {
    position: 'absolute',
    top: 30,
    left: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'red',
  },
  circleButton2: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'gray',
  },
});

export default HomeScreen;
