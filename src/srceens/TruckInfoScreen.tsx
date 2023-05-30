//최초에 출근 시 재고 입력하는 화면

import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Animated, Pressable, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import socket from '../utils/socket.io';
import DropDownPicker from 'react-native-dropdown-picker';
import {useForm, Controller} from 'react-hook-form';
import { AsyncStorage } from '@aws-amplify/core';
import { getPossibleTruckList } from '../state/queries';

interface NonmodalProps {
  visible: boolean;
  onClose: () => void;
  slot: string | null;
}

const TruckInfoScreen = () => {
  const [orders, setOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [truckNumber, setTruckNumber] = useState('');
  const [foodInventory, setFoodInventory] = useState('');
  const [truckList, setTruckList] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    getPossibleTruckList()
      .then((trucks) => {
        console.log('운행 가능한 트럭 리스트 - ', trucks.data.driverID);
        setTruckList(trucks.data.driverID); // 트럭 리스트 설정
      })
      .catch((error) => {
        console.log('운행 가능한 트럭 리스트 가져오기 오류 - ', error.response.data, error.response.status);
      });
  }, []);


  //드롭다운1 관련 선언 시작
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [gender, setGender] = useState([
    { label: "T1", value: "T1" },
    { label: "T2", value: "T2" },
    { label: "T3", value: "T3" },
  ]);
  const [companyOpen, setCompanyOpen] = useState(false);
  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);
  const { control } = useForm();
  const [selectedSlot, setSelectedSlot] = useState(null);
  //드롭다운1을 관련 선언 끝

  //드롭다운2 관련 선언 시작
  const [genderOpen2, setGenderOpen2] = useState(false);
  const [genderValue2, setGenderValue2] = useState(null);
  const [gender2, setGender2] = useState([
    { label: "Galbi", value: "Galbi" },
    { label: "Wing", value: "Wing" },
    { label: "Japchae", value: "Japchae" },
    { label: "Tofu", value: "Tofu" },
  ]);
  const [companyOpen2, setCompanyOpen2] = useState(false);
  const onGenderOpen2 = useCallback(() => {
    setCompanyOpen(false);
  }, []);
  const [selectedSlot2, setSelectedSlot2] = useState(null);
  //드롭다운2 관련 선언 끝

  //모달 수량 버튼 관련 선언 시작
  const [count, setCount] = useState(0);

  const handleMinusPress = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handlePlusPress = () => {
    setCount(count + 1);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };
  
 //모달 수량 버튼 관련 선언 끝

  useEffect(() => {
    // import 해온 소켓 이벤트 핸들러 등록
    socket.on('orderList', (data: any) => {
      setOrders(data);
    });
  }, []);


  // 각각의 슬롯을 클릭했을 때 호출되는 함수
  const handleSlotPress = (slot: any) => {
    setSelectedSlot(slot);
    setModalVisible(true);
  };

  // 재고 입력 후 save 버튼을 눌렀을 때 호출되는 함수
  const handleSaveButton = (genderValue2: any) => {
    // 선택된 메뉴와 수량을 상태에 저장
    // selectedMenu에는 DropDownPicker에서 선택된 값을,
    // selectedQuantity에는 quantity 버튼에서 선택된 값을 저장
    setSelectedMenu(genderValue2);
    setSelectedQuantity(count);
  
    // 모달 닫기
    setModalVisible(false);
  };
  

      
      return (
        <View style={styles.container}>
           <View style={styles.boxcolumn}> 
            <View style={styles.box1}> 
                <Text style={styles.TN}>Truck Number</Text>
                <Controller
                  name="gender"
                  defaultValue=""
                  control={control}
              //     render={({ field: { onChange, value } }) => (
              //   <View 
              //     style={styles.dropdownGender}
              //   >
              //      <DropDownPicker
              //       style={styles.dropdown}
              //       open={genderOpen}
              //       value={genderValue}
              //       items={truckList.map((truck) => ({ label: truck, value: truck }))}
              //       setOpen={setGenderOpen}
              //       setValue={setGenderValue}
              //       setItems={setGender}
              //       placeholder="Select Truck"
              //       placeholderStyle={styles.placeholderStyles}
              //       onOpen={onGenderOpen}
              //       onChangeValue={onChange}
              //       dropDownContainerStyle={styles.dropDownContainer}
              //     />
              //   </View>
              // )}
                  render={({ field: { onChange, value } }) => (
                <View style={styles.dropdownGender}>
                  {gender.length > 0 ? (
                    <DropDownPicker
                      style={styles.dropdown}
                      open={genderOpen}
                      value={genderValue} 
                      items={gender}
                      setOpen={setGenderOpen}
                      setValue={setGenderValue}
                      setItems={setGender}
                      placeholder="Select Truck"
                      placeholderStyle={styles.placeholderStyles}
                      onOpen={onGenderOpen}
                      onChangeValue={onChange}
                      dropDownContainerStyle={styles.dropDownContainer}
                    />
                  ) : (
                    <Text>No trucks available</Text> // 또는 다른 처리를 수행할 수 있음
                  )}
                </View>
              )}
            />
            </View>
            <View style={styles.box2}> 
                <Text style={styles.FI}>Food Inventory</Text>
                <TouchableOpacity>
                {/* <Text style={styles.Reset}>Reset</Text> */}
                </TouchableOpacity>
                <View style={styles.box21}> 
               {/*1번째줄*/}
                <View style={styles.row}>
                    <TouchableOpacity style={styles.slotbox} onPress={() => setModalVisible(true)}>
                        <View style={styles.slot}>
                          <TextInput placeholder='CS' style={styles.text} editable={false}></TextInput>
                          <TextInput placeholder='Cube Steak' style={styles.text2} editable={false}></TextInput>
                          <TextInput placeholder='1' style={styles.count} editable={false}>1</TextInput>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.slotbox} onPress={() => setModalVisible(true)}>
                    <View style={styles.slot}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.count}></Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.slotbox} onPress={() => setModalVisible(true)}>
                    <View style={styles.slot}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.count}></Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.slotbox} onPress={() => setModalVisible(true)}>
                    <View style={styles.slot}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.count}></Text>
                    </View>
                    </TouchableOpacity>
                </View>
                {/*2번째줄*/}
                <View style={styles.row}>
                <TouchableOpacity style={styles.slotbox} onPress={() => setModalVisible(true)}>
                    <View style={styles.slot}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.count}></Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.slotbox} onPress={() => setModalVisible(true)}>
                    <View style={styles.slot}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.count}></Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.slotbox} onPress={() => setModalVisible(true)}>
                    <View style={styles.slot}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.count}></Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.slotbox} onPress={() => setModalVisible(true)}>
                    <View style={styles.slot}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.count}></Text>
                    </View>
                </TouchableOpacity>
                </View>
                {/*3번째줄*/}
                <View style={styles.row}>
                <TouchableOpacity style={styles.slotbox} onPress={() => setModalVisible(true)}>
                    <View style={styles.slot}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.count}></Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.slotbox} onPress={() => setModalVisible(true)}>
                    <View style={styles.slot}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.count}></Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.slotbox} onPress={() => setModalVisible(true)}>
                    <View style={styles.slot}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.count}></Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.slotbox} onPress={() => setModalVisible(true)}>
                    <View style={styles.slot}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.count}></Text>
                    </View>
                </TouchableOpacity>
                </View>
                {/*4번째줄*/}
                <View style={styles.row}>
                <TouchableOpacity style={styles.slotbox} onPress={() => setModalVisible(true)}>
                    <View style={styles.slot}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.count}></Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.slotbox} onPress={() => setModalVisible(true)}>
                    <View style={styles.slot}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.count}></Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.slotbox} onPress={() => setModalVisible(true)}>
                    <View style={styles.slot}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.count}></Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.slotbox} onPress={() => setModalVisible(true)}>
                    <View style={styles.slot}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                    <Text style={styles.count}></Text>
                    </View>
                </TouchableOpacity>
                </View>
                </View>
            </View>
            {/*저장버튼*/}
            <View style={styles.box3}> 
                <TouchableOpacity style={styles.savebtn}>
                <Text style={styles.savebtnfont}>Save</Text>
             </TouchableOpacity>
            </View>
            </View>

            {/*모달창 시작*/}
            <Modal 
              style={styles.nonModal} 
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}
            >
              <TouchableOpacity onPress={handleModalClose}>
              <View style={styles.box5}>
                <View style={styles.box4}>
                    <View style={styles.miniboxcolumn}>
                    <View style={styles.box41}>
                    <Text style={styles.nonmodaltitle1}>Item</Text>
                    <Controller
                      name="gender"
                      defaultValue=""
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <View style={styles.dropdownGender2}>
                          <DropDownPicker
                            style={styles.dropdown2}
                            open={genderOpen2}
                            value={genderValue2} 
                            items={gender2}
                            setOpen={setGenderOpen2}
                            setValue={setGenderValue2}
                            setItems={setGender2}
                            placeholder="Select Menu"
                            placeholderStyle={styles.placeholderStyles2}
                            onOpen={onGenderOpen2}
                            onChangeValue={onChange}
                            dropDownContainerStyle={styles.dropDownContainer2}
                          />
                        </View>
                    )}
                    />
                    </View>
                    <View style={styles.box42}>
                      <Text style={styles.nonmodaltitle2}>Quantity</Text>
                      {/*quantity 수량 버튼 시작*/}
                      <View style={styles.numbercontainer}>
                        <TouchableOpacity onPress={handleMinusPress} style={styles.mi} hitSlop={15}>
                        <Text style={styles.minus}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.countnumber}>{count}</Text>
                        <TouchableOpacity onPress={handlePlusPress} style={styles.pl} hitSlop={15}>
                        <Text style={styles.plus}>+</Text>
                        </TouchableOpacity>
                      </View>
                      {/*quantity 수량 버튼 끝*/}
                      {/*재고 저장 버튼*/}
                      <TouchableOpacity style={styles.savebtn2}>
                      <Text style={styles.savebtnfont2}>Save</Text>
                      </TouchableOpacity>
                    </View>
                    </View>
                </View>
              </View>
              </TouchableOpacity>
            </Modal>
            {/*모달창 끝*/}
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
      miniboxcolumn: {
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
        zIndex: 100,
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
        top: 617,
      },
      box4: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: 341,
        top: 503,
        bottom: 0,
        position: 'absolute',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      box5: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
      },
      box41: {
        width: '100%',
        position: 'absolute',
        top: 20,
        zIndex: 101,
      },
      box42: {
        width: '100%',
        position: 'absolute',
        top: 107,
      },
      Reset: {
        color: '#838796',
        fontSize: 14,
        lineHeight: 21,
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: '500',
        position: 'absolute',
        left: 313,
      },
      dropdown: {
        backgroundColor: '#F1F1F4',
        borderColor: '#E5E5E5',
        borderRadius: 23,
        top: 29,
      },
      dropdown2: {
        backgroundColor: '#F1F1F4',
        borderColor: '#E5E5E5',
        borderRadius: 23,
        top: 8,
      },
      numbercontainer: {
        position: 'absolute',
        flexDirection: 'row',
        borderColor: '#838796',
        borderWidth: 2,
        top: 29,
        borderRadius: 21,
        width: '100%',
        height: 42,
      },
      slot: {
        width: '24.09%',
        height: 82,
        backgroundColor: '#F1F1F4',
        borderRadius: 9,
        marginRight: 4.13,
        marginBottom: 4.13,
      },
      slotbox: {
        width: '24.09%',
        height: 82,
        backgroundColor: '#F1F1F4',
        borderRadius: 9,
        marginRight: 4.13,
        marginBottom: 4.13,
      },
      nonmodaltitle1: {
        fontFamily: 'Poppins-bold',
        fontWeight: 'bold',
        fontSize: 14,
        color: '#838796',
      },
      nonmodaltitle2: {
        top: 0,
        fontFamily: 'Poppins-bold',
        fontWeight: 'bold',
        fontSize: 14,
        color: '#838796',
      },
      text: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: '400',
        top: 8,
        left: 8.25,
        position: 'absolute',
        color: '#838796',
      },
      text2: {
        fontSize: 10,
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: '400',
        top: 26,
        left: 8.26,
        position: 'absolute',
        width: 60,
        color: '#838796',
      },
      count: {
        fontSize: 18,
        position: 'absolute',
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: '400',
        top: 56,
        left: 8.26,
        color: '#838796',
      },
      TN: {
        color: '#838796',
        fontSize: 14,
        lineHeight: 21,
        fontFamily: 'Poppins-Regular',
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
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: '700',
        position: 'absolute',
      },
      savebtn: {
        position: 'absolute',
        width: '100%',
        backgroundColor: '#ED6A2C',
        borderRadius: 30,
        textAlign: 'center',
        height: 46,
        top: 10,
      },
      savebtnfont: {
        textAlign: 'center',
        alignContent: 'center',
        color: 'white',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: '600',
        paddingTop: 15,
      },
      savebtn2: {
        position: 'absolute',
        width: '100%',
        backgroundColor: '#ED6A2C',
        borderRadius: 30,
        textAlign: 'center',
        height: 46,
        top: 96,
      },
      savebtnfont2: {
        textAlign: 'center',
        alignContent: 'center',
        color: 'white',
        fontSize: 16,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        paddingTop: 15,
      },
      placeholderStyles: {
        color: "grey",
      },
      placeholderStyles2: {
        backgroundColor: "#F1F1F4",

      },
      dropdownGender: {
        width: "100%",
        borderRadius: 26,
      },
      dropdownGender2: {
      
      },
      dropDownContainer: {
        backgroundColor: "white",
        borderRadius: 26,
        borderColor: "#E5E5E5",
        top: 76,
      },
      dropDownContainer2: {
        backgroundColor: "#F1F1F4",
        borderRadius: 26,
        borderColor: "#E5E5E5",
        top: 50,
      },
      nonModal: {
  
      },
      mi: {
        position: 'absolute',
        alignItems: 'center',
        top: 5,
        left: 30,
      },
      minus: {
        color: "#838796",
        fontSize: 20,        
      },
      pl: {
        position: 'absolute',
        alignItems: 'center',
        top: 5,
        right: 30,
      },
      plus: {
        color: "#838796",
        fontSize: 20,

      },
      countnumber: {
        position: 'absolute',
        alignItems: 'center',
        textAlign: 'center',
        top: 11,
        left: 170,
      }
});

export default TruckInfoScreen;