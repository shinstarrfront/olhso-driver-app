import { StyleSheet, Text, View, TouchableOpacity, TextInput, Platform } from "react-native";
import socket from '../utils/socket.io';
import React, { useEffect, useState } from 'react';

const EditProfileScreen = () => {
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
            <Text style={styles.FN}>First Name</Text>
            <Text style={styles.LN}>Last Name</Text>
          </View>
            <View style={styles.box2}>
              <TouchableOpacity style={styles.firstname}>
                <TextInput style={styles.inputfirstname} placeholder="First Name" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.lastname}>
                <TextInput style={styles.inputlastname} placeholder="Last Name" />
              </TouchableOpacity>
            </View>
            <View style={styles.box3}>
            <Text style={styles.PN}>Phone Number</Text>
            <TouchableOpacity style={styles.phonenumber}>
              <TextInput style={styles.inputphonenumber} placeholder="ex) +8201012345678" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.zipcode}>
              <TextInput style={styles.inputzipcode} placeholder="Zip code(optional)" />
            </TouchableOpacity>
            </View>
            <View style={styles.box4}>
            <TouchableOpacity style={styles.requestbtn}>
              <Text style={styles.requestbtnfont}>Request the Modify</Text>
            </TouchableOpacity>
            <Text style={styles.SO}>Sign Out</Text>
            </View>
        </View>
    </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FFFFFF',
        // paddingTop: Platform.OS === 'android' ? 0 : Platform.OS === 'ios' ? 0 : 0, // 상단 여백 조정
    },
    boxcolumn: {
        width: '91.46%',
        alignSelf: 'center',
        height: '100%',
    },
    box1: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        top: 28,
    },
    box2: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: 52,
        paddingTop:6,
        width: '100%',
        height: 52,
    },
    box3: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: 120,
        width: '100%',
        height: 124,
    },
    box4: {
        position: 'absolute',
        top: 284,
        width: '100%',
        height: 83,
        textAlign: 'center',
        alignContent: 'center',
    },
    FN: {
        fontSize: 18,
        height: 18,
        color: '#838796',
        left: '0%',
        width: '50%',
    },
    LN: {
        fontSize: 18,
        height: 18,
        color: '#838796',
        width: '50%',
    },
    firstname: {
        width: '48.6%',
    },
    inputfirstname: {
        backgroundColor:'#F1F1F4',
        borderRadius: 23,
        color: 'black',
        padding: 15,
        height: 46,
        fontSize: 18,
    },
    boxFN: {
        width: '50%',
        height: 120,
    },
    lastname: {
        width: '48.6%',
    },
    inputlastname: {
        backgroundColor:'#F1F1F4',
        borderRadius: 23,
        color: 'black',
        padding: 15,
        height: 46,
        fontSize: 18,
    },
    PN:{
        fontSize: 18,
        color: '#838796',
        width: '100%',
    },
    phonenumber:{
        position: 'absolute',
        height: 46,
        width: '100%',
        top: 24,
    },
    inputphonenumber: {
        width: '100%',
        position: 'absolute',
        backgroundColor:'#F1F1F4',
        borderRadius: 23,
        color: 'black',
        padding: 10,
        paddingLeft: 20,
        height: 46,
        fontSize: 18,
    },
    zipcode:{
        position: 'absolute',
        top:78,
        width: '100%',
        height: 46,
    },
    inputzipcode: {
        width: '100%',
        position: 'absolute',
        backgroundColor:'#F1F1F4',
        borderRadius: 23,
        color: 'black',
        padding: 10,
        paddingLeft: 20,
        height: 46,
        fontSize: 18,
    },
    SO: {
        // position: 'absolute',
        fontSize: 14,
        color: '#838796',
        alignItems: 'center',
        textAlign: 'center',
        top: 24,
    },
    btncode: {
        color: '#838796'
    },
    requestbtn: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        height: 46,
        borderWidth: 1,
    },
    requestbtnfont: {
        color: '#393C46',
        fontWeight: 'bold',
        fontSize: 18,
        alignItems: 'center',
        textAlign: 'center',
        padding: 10,
    },
    code: {
        color: 'black',
        left: 290,
        top: 155,
    },
});

export default EditProfileScreen;