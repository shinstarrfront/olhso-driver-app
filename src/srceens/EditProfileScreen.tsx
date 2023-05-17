import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
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
        <View style={styles.box1}> 
          <View style={styles.box11}> 
          <View style={styles.box111}>
            <Text style={styles.FN}>First Name</Text>
            <Text style={styles.LN}>Last Name</Text>
            </View>
            <View style={styles.box112}>
              <TouchableOpacity style={styles.firstname}>
                <TextInput style={styles.inputfirstname} placeholder="First Name" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.lastname}>
                <TextInput style={styles.inputlastname} placeholder="Last Name" />
              </TouchableOpacity>
              </View>
          </View>
          <View style={styles.box12}> 
            <Text style={styles.PN}>Phone Number</Text>
            <TouchableOpacity style={styles.phonenumber}>
              <TextInput style={styles.inputphonenumber} placeholder="ex) +8201012345678" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.zipcode}>
              <TextInput style={styles.inputzipcode} placeholder="Zip code(optional)" />
            </TouchableOpacity>
          </View>
          <View style={styles.box13}> 
            <TouchableOpacity style={styles.requestbtn}>
              <Text style={styles.requestbtnfont}>Request the Modify</Text>
            </TouchableOpacity>
            <Text style={styles.SO}>Sign Out</Text>
          </View>
        </View>
        <View style={styles.box2}></View> 
      </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FFFFFF',
    },
    box1: {
        flex: 1,
        backgroundColor: 'grey',
    },
    box11: {
        backgroundColor: 'yellow',
        flex: 1,
    },
    box111: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        left: '14.26%',
    },
    box112: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        left: '14.26%',
        // width: '100%',
    },
    box12:{
        backgroundColor: 'orange',
        flex: 2,
    },
    box13: {
        backgroundColor: 'blue',
        flex: 1,
    },
    box2: {
        flex: 1,
    },
    FN: {
        fontSize: 14,
        color: '#838796',
        left: '14.26%',
        top: '3%',
        width: '50%',
    },
    LN: {
        fontSize: 14,
        color: '#838796',
        width: '50%',
        top: '3%',
    },
    firstname: {
        width: '50%',
        height: '12.67%',
        top: '6%',
    },
    inputfirstname: {
        backgroundColor:'#F1F1F4',
        borderRadius: 23,
        color: 'black',
        padding: 15,
        position: 'absolute',
        textAlign: 'center',
    },
    lastname: {
        width: '50%',
        height: '12.67%',
        top: '6%',
    },
    inputlastname: {
        backgroundColor:'#F1F1F4',
        borderRadius: 23,
        color: 'black',
        padding: 15,
        position: 'absolute',
        textAlign: 'center',
    },
    PN:{
        fontSize: 14,
        color: '#838796',
        left: '3.9%',
        top: '10.625 %',
    },
    SO: {
        fontSize: 14,
        color: '#838796',
        alignItems: 'center',
        left: '44.26%',
        top: '20%'
    },
    inputphonenumber: {
        backgroundColor:'#F1F1F4',
        borderRadius: 23,
        color: 'black',
        padding: 15,
        position: 'absolute',
        width: '92.22%',
    },
    btncode: {
        color: '#838796'
    },
    requestbtn: {
        width: '85%',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        textAlign: 'center',
        left: 30,
        height: 50,
        top: '15%',
        borderWidth: 1,
    },
    requestbtnfont: {
        textAlign: 'center',
        color: '#393C46',
        fontWeight: 'bold',
        fontSize: 16,
        paddingTop: 14,
    },
    phonenumber:{
        top: '25.625%',
        left: '3.9%',
    },
    code: {
        color: 'black',
        left: 290,
        top: 155,
    },
    zipcode:{
        top: '55.625%',
        left: '3.9%',
    },
    inputzipcode: {
        backgroundColor:'#F1F1F4',
        borderRadius: 23,
        color: 'black',
        padding: 15,
        position: 'absolute',
        width: '92.22%',
    },
    
});

export default EditProfileScreen;