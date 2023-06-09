import React from 'react';
import { StyleSheet, View, Text, Button, Modal, TouchableWithoutFeedback } from 'react-native';

interface AlertModalScreenProps {
    navigation: any;
};

const AlertModalScreen: React.FC<AlertModalScreenProps> = ({ navigation }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={true}
      onRequestClose={() => {
        navigation.goBack();
      }}
    >
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalcontainer}>
        <Button title="Emergency Call" onPress={() => {}} />
        <Button title="Pause Delivery 10min" onPress={() => {}} />
        <Button title="Pause Delivery 20min" onPress={() => {}} />
        <Button title="Back To Work" onPress={() => {}} />
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalcontainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white'
  },
});

export default AlertModalScreen;
