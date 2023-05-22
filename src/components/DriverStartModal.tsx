import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

interface DriverStartModalProps {
  visible: boolean;
  onApi: () => void;
}

//Done 버튼 클릭시
//드라이버 기본 정보 불러오기
//운행 가능한 트럭 리스트 가져오기
//재고 메뉴 리스트 불러오기

const onApi = () => {};

const DriverStartModal: React.FC<DriverStartModalProps> = ({ visible, onApi }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.text1}>출근 완료</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button1} onPress={onApi}>
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
    backgroundColor: 'blue',
    borderRadius: 4,
    padding: 12,
    marginHorizontal: 4,
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
