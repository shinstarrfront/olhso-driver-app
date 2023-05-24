import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface DriverStartModalProps {
  visible: boolean;
 
}




const DriverStartModal: React.FC<DriverStartModalProps> = ({ visible }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.text1}>Are you sure you want to go to the next step?</Text>
          <Text style={styles.text2}>Not all inventory items have been entered.</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button1} >
              <Text style={styles.buttonText1}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} >
              <Text style={styles.buttonText1}>Yes</Text>
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
