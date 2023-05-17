import { StyleSheet, Text, View } from "react-native";
import socket from '../utils/socket.io';
import React, { useEffect, useState } from 'react';
import styled from "styled-components";

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
            <View style={styles.box1}>
            <Text style={styles.date}>Date</Text>
            <Text style={styles.price}>Price</Text>
            </View>
            <View style={styles.box2}>
                <Text style={styles.orderscontent}>Orders</Text>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
    },
    box1: {
        flex: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'yellow',
    },
    box2: {
        flex: 90,
        backgroundColor: 'green',
        width: '100%',
    },
    date: {
        top: '1%',
        color: '#838796',
        fontSize: 14,
        width: '50%',
        left: '14.26%',
    },
    price: {
        top: '1%',
        color: '#838796',
        fontSize: 14,
        width: '50%',
        rigth: '14.26%',
    },
    orderscontent: {

    },
});

export default OrdersScreen;