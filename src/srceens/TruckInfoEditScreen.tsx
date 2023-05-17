//출근 후 재고 수정하는 화면 
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import socket from '../utils/socket.io';
import React, { useEffect, useState } from 'react';

const TruckInfoEditScreen = () => {
    const [orders, setOrders] = useState([]);

    //import 해온 소켓 이벤트 핸들러 등록
    useEffect(() => {
        socket.on('orderList', (data:any) => {
          setOrders(data);
        });
      }, []);
      return (
        <View style={styles.container}>
          <Text style={styles.title1}>Truck Number</Text>
    
          <Text style={styles.title2}>Food Inventory</Text>
          <View style={styles.row}>
            <View style={styles.box}>
              <Text style={styles.text}>CS</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.text}>JC</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.text}>JC</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.text}>JC</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.box}>
              <Text style={styles.text}>CS</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.text}>JC</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.text}>JC</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.text}>JC</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.box}>
              <Text style={styles.text}>CS</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.text}>JC</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.text}>JC</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.text}>JC</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.box}>
              <Text style={styles.text}>CS</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.text}>JC</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.text}>JC</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.text}>JC</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.savebtn}>
            <Text style={styles.savebtnfont}>Save</Text>
          </TouchableOpacity>
        </View>
      );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
      },
      row: {
        flexDirection: 'row',
      },
      box: {
        width: 80,
        height: 82,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1F1F4',
        borderRadius: 9,
        margin: 5,
      },
      text: {
        fontSize: 20,
      },
      title1: {
    
      },
      title2: {
    
      },
      savebtn: {
    
      },
      savebtnfont: {
    
      }
});

export default TruckInfoEditScreen;