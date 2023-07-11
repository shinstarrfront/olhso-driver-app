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
            <View style={styles.boxcolumn}>
                <View style={styles.box1}>
                <Text style={styles.date}>Date</Text>
                <Text style={styles.price}>Price</Text>
                </View>
                <View style={styles.box2}>
                <Text style={styles.datedata}>0525 Thu 15:12</Text>
                <Text style={styles.pricedata}>18.63$</Text>
           
                {/* {orders.map((order, index) => (
                        <Text key={index} style={styles.orderscontent}>{order}</Text>
                    ))} */}
                </View>
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
    boxcolumn: {
        width: '91.46%',
        alignSelf: 'center',
        height: '100%',
    },
    box1: {
        position: 'absolute',
        top: 14,
        flex: 9.16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 48,
        textAlign: 'center',
        alignContent: 'center',
    },
    box2: {
        flex: 90.84,
        width: '100%',
        top: 68,
        display: 'flex',
        flexDirection: 'row',
    },
    date: {
        color: '#838796',
        fontSize: 16,
        width: '50%',
        left: '14.26%',
        textAlign: 'center',
        alignContent: 'center',
    },
    price: {
        color: '#838796',
        fontSize: 16,
        width: '50%',
        rigth: '14.26%',
        textAlign: 'center',
        alignContent: 'center',
    },
    orderscontent: {

    },
    datedata: {
        left: '5%',
    },
    pricedata: {
        left: '20%',
    },
});

export default OrdersScreen;

