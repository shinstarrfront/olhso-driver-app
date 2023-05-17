import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Modal, Button, Linking } from "react-native";
import HomeScreen from '../srceens/HomeScreen';
import TruckInfoScreen from '../srceens/TruckInfoScreen';
import { DrawerActions } from '@react-navigation/native';
import 'react-native-reanimated';

interface HomeStackParamList {
  Map: any;
  [key: string]: any;
}

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  const [modalVisible, setModalVisible] = useState(false);

  //모달 생성
  const openModal = () => {
    setModalVisible(true);
  };

  //모달 종료
  const closeModal = () => {
    setModalVisible(false);
  };

  //모달 화면 구성
  const ModalContent = () => {
    return (
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Button title="Emergency Call" onPress={() => {Linking.openURL('tel:01039598640');}} />
            <Button title="Pause Delivery" /> 
            <Text onPress={closeModal}>X</Text>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: '',
            headerStyle: {
              backgroundColor: 'orange', //테스트를 하기 위함
            },
            headerTransparent: true,
            headerRight: () => (
              <TouchableOpacity onPress={openModal}>
                <Text style={styles.buttonText2}>Help</Text>
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Text style={styles.buttonText1}>Menu</Text>
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
      <ModalContent />
    </>
  );
};


const styles = StyleSheet.create({
  buttonText1: {
    color: 'white',
    fontSize:16,
    marginLeft: 16,
  },
  buttonText2: {
    color: 'white',
    marginRight: 16,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 16,
  },
});

export default HomeStack;

