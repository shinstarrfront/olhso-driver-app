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

                <Text style={styles.FN}>First Name</Text>
                <Text style={styles.LN}>Last Name</Text>
                <TouchableOpacity style={styles.firstname}>
                <TextInput style={styles.inputfirstname} placeholder="First Name"  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.lastname}>
                <TextInput style={styles.inputlastname} placeholder="Last Name"  />
                </TouchableOpacity>

                {/* <Text style={styles.PN}>Phone Number</Text>
                <TouchableOpacity style={styles.phonenumber}>
                <TextInput style={styles.inputphonenumber} placeholder="ex) +8201012345678"  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.zipcode}>
                <TextInput style={styles.zipcodeplaceholder} placeholder="Zip code(optional)" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.requestbtn}>
                <Text style={styles.requestbtnfont}>Request the Modify</Text>
                </TouchableOpacity>     
                <Text style={styles.SO}>Sign Out</Text> */}
                
        </View>
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
    },
    FN: {
        fontSize: 14,
        color: '#838796',
        left: '3.9%',
        top: '2.125%',
    },
    LN: {
        fontSize: 14,
        color: '#838796',
        left: '51.39%',
    },
    firstname: {

    },
    inputfirstname: {
        width: '44.72%',
        height: '5.75%',
        left: '3.9%',
        top: '17.125%',
        backgroundColor:'#F1F1F4',
        borderRadius: 23,
        color: 'black',
        padding: 15,
        position: 'absolute',
        textAlign: 'center',
    },
    lastname: {
       
    },
    inputlastname: {
        width: '44.72%',
        height: '5.75%',
        right: '3.9%',
        top: '17.125%',
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

    },
    inputphonenumber: {
    color: 'black',
    left: 10,

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
        top: 300,
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
        width: '92.22%',
        height: '5.75%',
        backgroundColor:'#F1F1F4',
        borderRadius: 30,
        top: '18.625%',
        color: 'black',
        padding: 15,
        position: 'absolute',
        textAlign: 'center',
        left: '3.9%',
        right: '3.9%',
    },
    code: {
        color: 'black',
        left: 290,
        top: 155,
    },
    zipcode:{
        width: '92.22%',
        height: '5.75%',
        backgroundColor:'#F1F1F4',
        borderRadius: 30,
        top: 230,
        color: 'blck',
        padding: 15,
        position: 'absolute',
        textAlign: 'center',
        left: '3.9%',
        right: '3.9%',
       
    },
    zipcodeplaceholder: {
        color: 'black',
        left: 10
    },
    
});

export default EditProfileScreen;