//출근 후 재고 수정하는 화면 
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import socket from '../utils/socket.io';
import React, { useEffect, useState } from 'react';
import { TextInput } from "react-native-gesture-handler";

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
            <View style={styles.box1}> 
                <Text style={styles.TN}>Truck Number</Text>
                <TextInput style={styles.inputTN} placeholder="트럭 넘버 불러올꺼야">트럭 넘버 API로 불러오기</TextInput>
            </View>
            <View style={styles.box2}> 
                <Text style={styles.FI}>Food Inventory</Text>
                <View style={styles.row}>
                    <View style={styles.slot}>
                    <Text style={styles.text}>CS</Text>
                    </View>
                    <View style={styles.slot}>
                    <Text style={styles.text}>JC</Text>
                    </View>
                    <View style={styles.slot}>
                    <Text style={styles.text}>JC</Text>
                    </View>
                    <View style={styles.slot}>
                    <Text style={styles.text}>JC</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.slot}>
                    <Text style={styles.text}>CS</Text>
                    </View>
                    <View style={styles.slot}>
                    <Text style={styles.text}>JC</Text>
                    </View>
                    <View style={styles.slot}>
                    <Text style={styles.text}>JC</Text>
                    </View>
                    <View style={styles.slot}>
                    <Text style={styles.text}>JC</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.slot}>
                    <Text style={styles.text}>CS</Text>
                    </View>
                    <View style={styles.slot}>
                    <Text style={styles.text}>JC</Text>
                    </View>
                    <View style={styles.slot}>
                    <Text style={styles.text}>JC</Text>
                    </View>
                    <View style={styles.slot}>
                    <Text style={styles.text}>JC</Text>
                    </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.slot}>
                        <Text style={styles.text}>CS</Text>
                        </View>
                        <View style={styles.slot}>
                        <Text style={styles.text}>JC</Text>
                        </View>
                        <View style={styles.slot}>
                        <Text style={styles.text}>JC</Text>
                        </View>
                        <View style={styles.slot}>
                        <Text style={styles.text}>JC</Text>
                        </View>
                    </View>
                    </View>
            <View style={styles.box3}> 
                <TouchableOpacity style={styles.savebtn}>
                <Text style={styles.savebtnfont}>Save</Text>
             </TouchableOpacity>
             </View>
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
      box1: {
        flex: 20,
        backgroundColor: 'yellow',
        width: '100%',
      },
      box2: {
        flex: 60,
        backgroundColor: 'green',
        width: '100%',
      },
      box3: {
        flex: 20,
        backgroundColor: 'blue',
        width: '100%',
      },
      slot: {
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
      TN: {
        left: '3.89%',
        top: '10%',
        color: '#838796',
      },
      inputTN: {
        backgroundColor:'#F1F1F4',
        borderRadius: 23,
        color: 'black',
        padding: 15,
        position: 'absolute',
        width: '92.22%',
        top: '30%',
        left: '3.89%',
      },
      FI: {
        color: '#838796',
      },
      savebtn: {
        width: '85%',
        backgroundColor: '#ED6A2C',
        borderRadius: 30,
        textAlign: 'center',
        left: 30,
        height: 50,
        top: '15%',
        borderWidth: 1,
      },
      savebtnfont: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        paddingTop: 14,
      }
});

export default TruckInfoEditScreen;