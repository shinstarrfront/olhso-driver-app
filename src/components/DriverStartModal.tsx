import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { getPossibleTruckList, getMenuInfo } from '../state/queries';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DriverStartModalProps {
  visible: boolean;
  onDoneApi: () => void;
}

//Done 버튼 클릭시
//운행 가능한 트럭 리스트 가져오기
//재고 메뉴 리스트 불러오기

const onDoneApi = async (navigation:any) => {
    try {
      const truckList = await getPossibleTruckList();
      const menuInfo = await getMenuInfo();
  
      // truckList와 menuInfo에서 받아온 정보 저장
      await AsyncStorage.setItem('truckList', JSON.stringify(truckList));
      await AsyncStorage.setItem('menuInfo', JSON.stringify(menuInfo));

      console.log('Truck List:', truckList);
      console.log('Menu Info:', menuInfo);
  
      // 동작을 완료한 후 트럭 재고 화면으로 이동
      navigation.navigate('TruckInfo');

    } catch (error) {
      console.error('Error:', error);
    }
  };


const DriverStartModal: React.FC<DriverStartModalProps> = ({ visible }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.text1}>출근 완료</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button1}  >
              <Text style={styles.buttonText1}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '91.46%',
    height: 210,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  text1: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  text2: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button1: {
    flex: 1,
    backgroundColor: '#ED6A2C',
    borderRadius: 24,
    padding: 12,
    marginHorizontal: 4,
    width: '80%',
    heigth: 46
  },
  button2: {
    flex: 1,
    backgroundColor: 'blue',
    borderRadius: 4,
    padding: 12,
    marginHorizontal: 4,
  },
  buttonText1: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText2: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DriverStartModal;
