import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import socket from '../utils/socket.io';
import React, { useEffect, useState } from 'react';

const SideScreen = () => { 
    const [orders, setOrders] = useState([]);

     //import 해온 소켓 이벤트 핸들러 등록
     useEffect(() => {
        socket.on('orderList', (data:any) => {
          setOrders(data);
        });
      }, []);
  
    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.sidemenu1, styles.border]}>
                <Text style={styles.sidefont11}>Jay Shin</Text> 
                <Text style={styles.sidefont12}>+8201012345678</Text>
                {/* <Text style={styles.sidefont13}>></Text> */}
            </TouchableOpacity>
            <TouchableOpacity style={[styles.sidemenu2, styles.border]}>
            <Text style={styles.sidefont}>delivery history</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.sidemenu3, styles.border]}>
            <Text style={styles.sidefont}>Modify & confirm the inventory</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.sidemenu4, styles.border]}>
            <Text style={styles.sidefont}>Terms of service</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.sidemenu5, styles.border]}>
            <Text style={styles.sidefont}>End shift</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#ffffff",
        alignItems: 'flex-start',
        borderColor: 'red',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    sidemenu1: {
        width: '100%',
        height: 105,
        paddingLeft: 14,
        paddingTop: 30,
        paddingBottom: 30,
    },
    sidemenu2: {
        width: '100%',
        paddingLeft: 14,
        heigth: 60,
        paddingTop: 22,
        paddingBottom: 20,
    },
    sidemenu3: {
        paddingLeft: 14,
        width: '100%',
        heigth: 60,
        paddingTop: 22,
        paddingBottom: 20,
    },
    sidemenu4: {
        paddingLeft: 14,
        width: '100%',
        heigth: 60,
        paddingTop: 22,
        paddingBottom: 20,
    },
    sidemenu5: {
        paddingLeft: 14,
        width: '100%',
        heigth: 60,
        paddingTop: 22,
        paddingBottom: 20,
    }, 
    border: {
        borderBottomWidth: 1,
        borderBottomColor: '#E2E2E2', // Color of your choice,
        width: '100%',
    },
    sidefont: {
        fontSize: 14,
        lineHeight: 18,
        color: '#22232B',
    },
    sidefont11: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#22232B',
    },
    sidefont12: {
        fontSize: 14,
        lineHeight: 18,
        color: '#22232B',
        paddingTop: 8,
    },
    sidefont13: {

    },
});

export default SideScreen;
