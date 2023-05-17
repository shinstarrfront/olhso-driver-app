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
            <Text style={styles.date}>Date</Text>
            <Text style={styles.price}>Price</Text>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    date: {

    },
    price: {
        
    },

});

export default OrdersScreen;