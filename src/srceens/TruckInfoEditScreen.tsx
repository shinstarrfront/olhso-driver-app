//출근 후 재고 수정하는 화면 

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Nonmodal from '../components/NonModal';
import socket from '../utils/socket.io';


interface NonmodalProps {
  visible: boolean;
  onClose: () => void;
}


const TruckInfoEditScreen = () => {
  const [orders, setOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // import 해온 소켓 이벤트 핸들러 등록
    socket.on('orderList', (data: any) => {
      setOrders(data);
    });
  }, []);

  const handleNonmodalPress = () => {
    setModalVisible(true);
  };


      
      
      return (
        <View style={styles.container}>
           <View style={styles.boxcolumn}> 
            <View style={styles.box1}> 
                <Text style={styles.TN}>Truck Number</Text>
                <TextInput style={styles.inputTN} placeholder="트럭 넘버 불러올꺼야"></TextInput>
            </View>
            <View style={styles.box2}> 
                <Text style={styles.FI}>Food Inventory</Text>
                <View style={styles.box21}> 
                <TouchableOpacity onPress={handleNonmodalPress}>
                <View style={styles.row}>
                    <View style={styles.slot}>
                      <Text style={styles.text}></Text>
                      <Text style={styles.text2}></Text>
                      <Text style={styles.count}></Text>
                    </View>
                    <View style={styles.slot}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.count}></Text>
                    </View>
                    <View style={styles.slot}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.count}></Text>
                    </View>
                    <View style={styles.slot}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.count}></Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.slot}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.count}></Text>
                    </View>
                    <View style={styles.slot}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.count}></Text>
                    </View>
                    <View style={styles.slot}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.count}></Text>
                    </View>
                    <View style={styles.slot}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.count}></Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.slot}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.count}></Text>
                    </View>
                    <View style={styles.slot}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.count}></Text>
                    </View>
                    <View style={styles.slot}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.count}></Text>
                    </View>
                    <View style={styles.slot}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.count}></Text>
                    </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.slot}>
                        <Text style={styles.text}></Text>
                        <Text style={styles.text2}></Text>
                        <Text style={styles.count}></Text>
                        </View>
                        <View style={styles.slot}>
                        <Text style={styles.text}></Text>
                        <Text style={styles.text2}></Text>
                        <Text style={styles.count}></Text>
                        </View>
                        <View style={styles.slot}>
                        <Text style={styles.text}></Text>
                        <Text style={styles.text2}></Text>
                        <Text style={styles.count}></Text>
                        </View>
                        <View style={styles.slot}>
                        <Text style={styles.text}></Text>
                        <Text style={styles.text2}></Text>
                        <Text style={styles.count}></Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                </View>
              
            </View>
            <View style={styles.box3}> 
                <TouchableOpacity style={styles.savebtn}>
                <Text style={styles.savebtnfont}>Save</Text>
             </TouchableOpacity>
             </View>
             </View>
             <Nonmodal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </View>
      );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
      },
      boxcolumn: {
        width: '91.46%',
        alignSelf: 'center',
        height: '100%',
        flexDirection: 'column',
      },
      row: {
        flexDirection: 'row',
      },
      box1: {
        position: 'absolute',
        top: 27,
        flex: 20,
        width: '100%',
        height: 71,
      },
      box2: {
        flex: 60,
        width: '100%',
        position: 'absolute',
        top: 135,
      },
      box21: {
        position: 'absolute',
        top: 25,
        width: '100%',
      },
      box3: {
        position: 'absolute',
        flex: 20,
        width: '100%',
        top: 609,
      },
      slot: {
        width: '24.09%',
        height: 82,
        backgroundColor: '#F1F1F4',
        borderRadius: 9,
        marginRight: 4.13,
        marginBottom: 4.13,
    
      },
      text: {
        fontSize: 14,
        //fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: '400',
        top: 8,
        left: 8.25,
        position: 'absolute'
      },
      text2: {
        fontSize: 10,
        //fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: '400',
        top: 26,
        left: 8.26,
        position: 'absolute'
      },
      count: {
        fontSize: 18,
        position: 'absolute',
        //fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: '500',
        top: 56,
        left: 8.26,
      },
      TN: {
        color: '#838796',
        fontSize: 14,
        lineHeight: 21,
        //fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: '700',
        position: 'absolute',
      },
      inputTN: {
        top: 25,
        width: '100%',
        backgroundColor:'#F1F1F4',
        borderRadius: 23,
        color: 'black',
        padding: 15,
        position: 'absolute',
      },
      FI: {
        color: '#838796',
        fontSize: 14,
        lineHeight: 21,
        //fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: '700',
        position: 'absolute',
      },
      savebtn: {
        width: '100%',
        backgroundColor: '#ED6A2C',
        borderRadius: 30,
        textAlign: 'center',
        height: 46,
      },
      savebtnfont: {
        textAlign: 'center',
        alignContent: 'center',
        color: 'white',
        fontSize: 16,
        //fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: '600',
        paddingTop: 15,
      }
});

export default TruckInfoEditScreen;