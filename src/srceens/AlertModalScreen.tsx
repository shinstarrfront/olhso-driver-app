import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking, TouchableWithoutFeedback,Alert } from 'react-native';

interface AlertModalScreenProps {
    navigation: any;
};

const AlertModalScreen: React.FC<AlertModalScreenProps> = ({ navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View style={styles.modalcontainer}>
        <TouchableOpacity 
          style={styles.modalbtn1}  
          onPress={() => {Linking.openURL('tel:01056325968')}}>
          <Text style={styles.modalfont}>Emergency Call</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.modalbtn2}
          onPress={() => {}}
        >
        <Text 
          style={styles.modalfont}
          //눌렀을 때 Alert이 뜨도록
          onPress={() => {Alert.alert('Pause Delivery 10min')}}
          >
          Pause Delivery 10min</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.modalbtn3}
          onPress={() => {}}
        >
        <Text style={styles.modalfont}
         onPress={() => {Alert.alert('Pause Delivery 20min')}}>
            Pause Delivery 20min
        </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.modalbtn4}
          onPress={() => {Alert.alert('Back To Work')}}
        >
          <Text style={styles.modalfont}>Back To Work</Text>
        </TouchableOpacity>
      </View>
      </TouchableWithoutFeedback>
  );
};


const styles = StyleSheet.create({
  modalcontainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black'
  },
  modalbtn1: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    top: 272,
    width: 332,
    height: 46,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  modalbtn2: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    top: 342,
    width: 332,
    height: 46,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  modalbtn3: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    top: 412,
    width: 332,
    height: 46,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  modalbtn4: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    top: 482,
    width: 332,
    height: 46,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  modalfont: {
    color: '#121317',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AlertModalScreen;
