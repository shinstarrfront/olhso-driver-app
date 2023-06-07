//최초에 출근 시 재고 입력하는 화면

import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Animated, Pressable, Alert,  } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import socket from '../utils/socket.io';
import DropDownPicker from 'react-native-dropdown-picker';
import {useForm, Controller} from 'react-hook-form';
import { AsyncStorage } from '@aws-amplify/core';
import { getPossibleTruckList } from '../state/queries';
import { updateDriverStatusStart } from '../state/mutations';
import { updateDriverInventory } from '../state/mutations';
import { updateDriverStatusChange } from '../state/mutations';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList,DrawerItem, DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';


interface TruckInfoScreenProps {
  v: any;
  n: any;
  key : any;
  visible: boolean;
  onClose: () => void;
  slot: string | null;
  navigation: any;
}

const TruckInfoScreen: React.FC<TruckInfoScreenProps> = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [truckNumber, setTruckNumber] = useState('');
  const [foodInventory, setFoodInventory] = useState('');
  const [truckList, setTruckList] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [truckPlateNum, setTruckPlateNum] = useState('');
 

  useEffect(() => {
    getPossibleTruckList()
      .then((trucks) => {
        console.log('운행 가능한 트럭 리스트 ~ ', trucks.data);
        setTruckList(trucks.data); // 트럭 리스트 설정
        // truckPlateNum 상태 설정
        if (trucks.data.length > 0) {
          setTruckPlateNum(trucks.data[0].truckPlateNum);
        }
      })
      .catch((error) => {
        console.log('운행 가능한 트럭 리스트 가져오기 오류 - ', error.response.data, error.response.status);
      });
  }, []);
  


  //드롭다운1 관련 선언 시작
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [gender, setGender] = useState([
    { label: "1234", value: "1234" },
    { label: "2345", value: "2345" },
    { label: "3456", value: "3456" },
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
  const [gender1, setGender1] = useState([
    { label: "Galbi", value: "Galbi" },
    { label: "Wing", value: "Wing" },
    { label: "Japchae", value: "Japchae" },
    { label: "Tofu", value: "Tofu" },
  ]);

  const onGenderOpen1 = useCallback(() => {
    setCompanyOpen(false);
  }, []);



  //드롭다운2 관련 선언 끝

  // slot 클릭시 모달 열고 닫기 시작
  const handleModalOpen = (slot: any) => {
    setSelectedSlot(slot);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  //최종 save 버튼 눌렀을때 확인 모달 열기 
  const openModal = () => {
    setModalVisible2(true);
  };


  const closeModal = () => {
    setModalVisible2(false)
  };




  //모달 수량 버튼 관련 선언 시작
  const [count, setCount] = useState(1);

  const handleMinusPress = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handlePlusPress = () => {
    setCount(count + 1);
    //5 이상은 + 불가능
    if (count >= 4) {
      setCount(4);
    }
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


  // Save 버튼 클릭시 호출되는 함수
  const handleSave = (menu:any, quantity:any) => {
    setSelectedMenu(menu); // 선택한 메뉴 저장
    setSelectedQuantity(quantity); // 선택한 수량 저장
    setModalVisible(false); // 모달 닫기
    console.log('선택한 메뉴 - ', menu);
    console.log('선택한 수량 - ', quantity);
    console.log('모달에 있는 sava 버튼 클릭 여부')
  };


  // 최종적으로 재고 등록 후 Save 버튼 클릭시 호출되는 함수
 const handleFinallySave = () => {

  const newArr = slotstate.map(item => {
    let menuID;
    if(item.menuID === 'Galbi'){
      menuID = 'M1'
    } else if(item.menuID === 'Wing'){
      menuID = 'M2'
    } else if(item.menuID === 'Japchae'){
      menuID = 'M3'
    } else if(item.menuID === 'Tofu'){
      menuID = 'M4'
    }
    return { ...item, menuID: menuID ?? item.menuID };
  });

  AsyncStorage.setItem(genderValue)
  AsyncStorage.setItem('slotstate',JSON.stringify(newArr))

  //재고 입력
  updateDriverInventory();
  //드라이버 상태 변경
  updateDriverStatusChange();
  //모달 닫기
  setModalVisible2(false);
  //소켓 접속

  //홈화면으로 이동
  navigation.navigate('Home');
 }
 


const Arr = [{slotNum:'1-1',menuID:'',remainedMenuCount:0},{slotNum:'1-2',menuID:'',remainedMenuCount:0},{slotNum:'1-3',menuID:'',remainedMenuCount:0},{slotNum:'1-4',menuID:'',remainedMenuCount:0},{slotNum:'2-1',menuID:'',remainedMenuCount:0},{slotNum:'2-2',menuID:'',remainedMenuCount:0},{slotNum:'2-3',menuID:'',remainedMenuCount:0},{slotNum:'2-4',menuID:'',remainedMenuCount:0},{slotNum:'3-1',menuID:'',remainedMenuCount:0},{slotNum:'3-2',menuID:'',remainedMenuCount:0},{slotNum:'3-3',menuID:'',remainedMenuCount:0},{slotNum:'3-4',menuID:'',remainedMenuCount:0},{slotNum:'4-1',menuID:'',remainedMenuCount:0},{slotNum:'4-2',menuID:'',remainedMenuCount:0},{slotNum:'4-3',menuID:'',remainedMenuCount:0},{slotNum:'4-4',menuID:'',remainedMenuCount:0}]
const [slotstate,setSlotstate] = useState(Arr);
const [slotNum,setSlotNum] = useState();


const handleTruckInfoSave = async () => {
   
    const newArr = slotstate.map(slot => 
      slot.slotNum === slotNum ? { ...slot, menuID: genderValue2 ?? '',remainedMenuCount: count ?? '' } : slot
    );
    setSlotstate(newArr);
    setCount(1) //초기화
    setGenderValue2(null) // 초기화  
    setModalVisible(false);
  };

  const handlePress = (slotNum:any)=> {
    setModalVisible(true)
    setSlotNum(slotNum)
  }
      return (
        <View style={styles.container}>
           <View style={styles.boxcolumn}> 
            <View style={styles.box1}> 
                <Text style={styles.TN}>Truck Number</Text>
                <Controller
                  name="gender"
                  defaultValue=""
                  control={control}
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
                    <Text>No trucks available</Text> // 또는 다른 처리
                  )}
                </View>
              )}
            />
            </View>
            <View style={styles.box2}> 
                <Text style={styles.FI}>Food Inventory</Text>
                <TouchableOpacity>
                  {/* 초기화 버튼 주석처리 */}
                {/* <Text style={styles.Reset}>Reset</Text> */}
                </TouchableOpacity>
                <View style={styles.row}> 
        

              {/*재고 입력 박스 16개*/}
              {slotstate.map((v:any,i:any)=> 
              <TouchableOpacity style={styles.slot} onPress={() => handlePress(`${v.slotNum}`)}>
                          <View >
                          <Text style={styles.text}>{v.menuID}</Text>
                          <Text style={styles.count}>{v.remainedMenuCount || ''}</Text>
                          </View>
                          </TouchableOpacity>
                          )}
                </View>
            </View>
            {/*최종 저장 버튼*/}
            <View style={styles.box3}> 
                <TouchableOpacity 
                style={styles.savebtn} 
                onPress={openModal}
                >
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
                            items={gender1}
                            setOpen={setGenderOpen2}
                            setValue={setGenderValue2}
                            setItems={setGender1}
                            placeholder="Select Menu"
                            placeholderStyle={styles.placeholderStyles2}
                            onOpen={onGenderOpen1}
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
                      <TouchableOpacity 
                        style={styles.savebtn2} 
                        onPress={handleTruckInfoSave}
                      >
                      <Text style={styles.savebtnfont2}>Save</Text>
                      </TouchableOpacity>
                    </View>
                    </View>
                </View>
              </View>
              </TouchableOpacity>
            </Modal>
            {/*모달창 끝*/}
          {/*최종 save 버튼 클릭시 나오는 모달 시작*/}
          <Modal visible={modalVisible2} animationType="slide">
              <View style={styles.modalContainer1}>
                  <View style={styles.modalContainer2}>
                    <Text style={styles.modalText1}>Are you sure you want to go to the next step?</Text>
                    <Text style={styles.modalText2}>Not all inventory items have been entered.</Text>
                    {/*Cancel 클릭시*/}
                    <TouchableOpacity style={styles.modalbtn1} 
                     onPress={closeModal}
                    >
                    <Text style={styles.modalbtnfont1}>Cancel</Text>
                    </TouchableOpacity>
                    {/*Yes 클릭시*/}
                    <TouchableOpacity style={styles.modalbtn2} 
                    onPress={handleFinallySave}
                    >
                    <Text style={styles.modalbtnfont2}>Yes</Text>
                    </TouchableOpacity>
                  </View>
                  </View>
                </Modal>
          {/*최종 save 버튼 클릭시 나오는 모달 끝*/}
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
        // backgroundColor: 'red',
        flexWrap: 'wrap',
        top: 25,
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
        //fontFamily: 'Poppins-Regular',
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
        width: '23.84%',
        //넓이 피그마랑 달라서 수정 필요
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
        //fontFamily: 'Poppins-bold',
        fontWeight: 'bold',
        fontSize: 14,
        color: '#838796',
      },
      nonmodaltitle2: {
        top: 0,
        //fontFamily: 'Poppins-bold',
        fontWeight: 'bold',
        fontSize: 14,
        color: '#838796',
      },
      text: {
        fontSize: 14,
        //fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: '400',
        top: 8,
        left: 8.25,
        position: 'absolute',
        color: '#838796',
        width: 60,
      },
      text2: {
        fontSize: 10,
        //fontFamily: 'Poppins-Regular',
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
        //fontFamily: 'Poppins-Regular',
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
        //fontFamily: 'Poppins-Regular',
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
        //fontFamily: 'Poppins',
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

export default TruckInfoScreen;


