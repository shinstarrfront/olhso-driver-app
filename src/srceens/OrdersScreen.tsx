import { StyleSheet, Text, View } from "react-native";
import socket from '../utils/socket.io';
import React, { useEffect, useState } from 'react';

const OrdersScreen = () => {
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

export default OrdersScreen;