//스크린이 아니라 사이드 스크린의 퇴근하기 리스트 클릭시 모달 뜨고 모달의 예스 버튼 누르면 소켓 연결 끊기게 할 것이기에 이 스크린은 삭제 예정
import { StyleSheet, Text, View } from "react-native";
import socket from '../utils/socket.io';
import React, { useEffect, useState } from 'react';

const LeavingWorkScreen = () => {
    const [orders, setOrders] = useState([]);

    //import 해온 소켓 이벤트 핸들러 등록
    useEffect(() => {
        socket.on('orderList', (data:any) => {
          setOrders(data);
        });
      }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}></Text>
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
});

export default LeavingWorkScreen;