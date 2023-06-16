import { StyleSheet, Text, View, TouchableOpacity, Modal, TouchableWithoutFeedback } from "react-native";
import socket from '../utils/socket.io';
import React, { useEffect, useState } from 'react';
import { getInventoryInfo } from '../state/queries'; 
import { getDeliveryList } from '../state/queries';
import { updateDriverStatusStart } from '../state/mutations';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SideScreenProps {
    navigation: any;
};

interface DriverInfo {
    driverFirstName: string;
    driverLastName: string;
    driverMobileNum: string;
  }

  
const SideScreen: React.FC<SideScreenProps> = ({ navigation }) => {
    const [orders, setOrders] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [driverInfo, setDriverInfo] = useState<DriverInfo | null>(null);


     //import 해온 소켓 이벤트 핸들러 등록
     useEffect(() => {
        socket.on('orderList', (data:any) => {
          setOrders(data);
        });
      }, []);

      useEffect(() => {
        const fetchDriverInfo = async () => {
            const info = await AsyncStorage.getItem('driverInfo');
            if (info) {
                setDriverInfo(JSON.parse(info));
            }
        };
        fetchDriverInfo();
    }, []);


    //등록된 재고 불러오고, 스크린 이동하기 
      const handleInventoryCheck = async () => {
        await getInventoryInfo(); 
        navigation.navigate('TruckInfoEdit');
    }

    //트럭의 배달완료 목록 불러오고, 스크린 이동하기
        // const handleDeliveryListCheck = async () => {
        // await getDeliveryList();
        // navigation.navigate('Orders');
        // }

    //퇴근하고, 스크린 이동하기
    const handleEndShift = async () => {
        await updateDriverStatusStart();
        navigation.navigate('Home');
    }
  
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={[styles.sidemenu1, styles.border]}
                onPress={() => navigation.navigate('EditProfile')}
                >
                <Text style={styles.sidefont11}>{driverInfo ? `${driverInfo.driverFirstName} ${driverInfo.driverLastName}` : 'Name'}</Text>
                <Text style={styles.sidefont12}>{driverInfo ? `${driverInfo.driverMobileNum}`  : 'phonenumber'}</Text>
                {/* <Text style={styles.sidefont13}>></Text> */}
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.sidemenu2, styles.border]}
                onPress={() => navigation.navigate('Orders')}
            >
            <Text 
                style={styles.sidefont}
                >delivery history</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.sidemenu3, styles.border]}
                onPress={handleInventoryCheck} 
            >
            <Text style={styles.sidefont}>Modify & confirm the inventory</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.sidemenu4, styles.border]}
                onPress={() => navigation.navigate('TermsOfService')}
            >
            <Text style={styles.sidefont}>Terms of service</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.sidemenu5, styles.border]}
                onPress={handleEndShift}
                >
            <Text style={styles.sidefont}>End shift</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContainer1}>
                        <TouchableWithoutFeedback onPress={() => {}}>
                            <View style={styles.modalContainer2}>
                                <Text style={styles.modalText1}>Will you end shift for today?</Text>
                                {/*Cancel 클릭시*/}
                                <TouchableOpacity style={styles.modalbtn1} 
                                onPress={() => setModalVisible(false)}
                                >
                                <Text style={styles.modalbtnfont1}>Cancel</Text>
                                </TouchableOpacity>
                                {/*Yes 클릭시*/}
                                <TouchableOpacity style={styles.modalbtn2} 
                                onPress={() => {
                                    setModalVisible(false);

                                }}
                                >
                                <Text style={styles.modalbtnfont2}>Yes</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
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
    modalContainer1: {
        backgroundColor: 'rgba(0,0,0,0.9)',
        height: '100%',
        width: '100%',
        position: 'absolute',
      },
      modalContainer2: {
        width: '91.46%',
        height: 210,
        top: 295,
        bottom: 295,
        borderRadius: 4,
        zIndex: 99,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        alignSelf: 'center',
      },
      modalText1: {
        //fontFamily: 'Poppins',
        color:'#22232B',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 9,
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        top: 55,
      },
      modalText2: {
        color: '#838796',
        top: 59,
        fontSize: 12,
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      },
      modalbtn1: {
        backgroundColor: '#FFFFFF',
        height: 46,
        borderRadius: 24,
        left: 10,
        top: 148,
        position: 'absolute',
        width: '45.5%',
        borderColor: 'black',
        borderWidth: 1,
      },
      modalbtn2: {
        backgroundColor: '#ED6A2C',
        height: 46,
        borderRadius: 24,
        left: 181,
        top: 148,
        position: 'absolute',
        width: '45.5%',

      },
      modalbtnfont1: {
        color: 'black',
        //fontFamily: 'Poppins',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 13,
        alignContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
      },
      modalbtnfont2: {
        color: '#ffffff',
        //fontFamily: 'Poppins',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 13,
        alignContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
      },
});

export default SideScreen;
