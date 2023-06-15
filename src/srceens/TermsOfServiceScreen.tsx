import { StyleSheet, Text, View } from "react-native";
import socket from '../utils/socket.io';
import React, { useEffect, useState } from 'react';


const TermsOfServiceScreen = () => {
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
                <Text style={styles.font}>no data</Text>
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
        backgroundColor: 'gray',
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

    },
    pricedata: {

    },
    font: {
        textAlign: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        top: '50%',
    }
});

export default TermsOfServiceScreen;

