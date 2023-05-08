import {useState} from 'react';
import { 
    View,
    Text, 
    TouchableOpacity, 
    TouchableHighlight, 
    StyleSheet, 
    GestureResponderEvent, 
    Dimensions,
    ViewStyle,
    TextStyle,
    Modal,
    Linking,
} from 'react-native';
import { Auth } from 'aws-amplify'
import styled from 'styled-components';

interface LogInScreenProps {
  navigation: any;
}


const StartScreen: React.FC<LogInScreenProps> = ({ navigation }) => {
return (
    <View style={styles.container}>
      <Text style={styles.title}>OLHSO</Text>
      <TouchableOpacity style={styles.btn1} onPress={() => navigation.navigate('PhoneLogIn')}>
        <Text style={styles.buttonText1}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={styles.btn2} 
      onPress={() => {Linking.openURL('tel:01039598640');}}>
        <Text style={styles.buttonText2}>Get Help</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#ED6A2C'
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    position: 'absolute',
    top: Dimensions.get('window').height / 3.5,
    color: 'white',
  },
  btn1: {
    backgroundColor: '#FFFFFF',
    color: 'black',
    padding: 10,
    margin: 10,
    borderRadius: 30,
    width: 330, 
    position: 'absolute',
    top: Dimensions.get('window').height / 1.5,
    borderWidth: 1,
    borderColor: 'white',
  },
  btn2: {
    backgroundColor:'#ED6A2C',
    padding: 10,
    margin: 10,
    borderRadius: 30,
    width: 330,
    position: 'absolute',
    top: Dimensions.get('window').height / 1.3,
    borderColor: 'white',
    borderWidth: 1,
  },
  buttonText1: {
    color: 'black',
    fontSize: '16',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  buttonText2: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: Dimensions.get('window').width / 1.5,
    height: Dimensions.get('window').height / 4,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    position: 'absolute',
    top: Dimensions.get('window').height / 22,
  },
  modalCloseBtn: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    top: Dimensions.get('window').height / 7,
  },
  modalCloseBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StartScreen;
