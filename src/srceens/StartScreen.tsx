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
import { Image } from 'react-native';

interface LogInScreenProps {
  navigation: any;
}


const StartScreen: React.FC<LogInScreenProps> = ({ navigation }) => {
return (
    <View style={styles.container}>
      <View style={styles.boxcolumn}> 
      <Image source={require('../assets/olhso.png')} style={styles.logo} />
      <View style={styles.box1}>
      <TouchableOpacity style={styles.btn1} onPress={() => navigation.navigate('PhoneLogIn')}>
        <Text style={styles.buttonText1}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={styles.btn2} 
      onPress={() => {Linking.openURL('tel:0103956325968');}}>
        <Text style={styles.buttonText2}>Get Help</Text>
      </TouchableOpacity>
      </View>
      </View>
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
  boxcolumn: {
    width: '91.46%',
    alignSelf: 'center',
    height: '100%',
  },
  logo: {
    top: 299,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  box1: {
    top: 550,
    position: 'absolute',
    width: '100%',
    height: 104,
  },
    btn1: {
      position: 'absolute',
      backgroundColor: '#FFFFFF',
      color: 'black',
      paddingTop: 15,
      paddingBottom: 15,
      borderRadius: 24,
      width: '100%',
      borderWidth: 1,
      borderColor: 'white',
      height: 46,
    },
    btn2: {
      position: 'absolute',
      top: 58,
      backgroundColor: '#ED6A2C',
      color: 'black',
      paddingTop: 15,
      paddingBottom: 15,
      borderRadius: 24,
      width: '100%',
      borderWidth: 1,
      borderColor: 'white',
      height: 46,
    },
    buttonText1: {
      position: 'absolute',
      color: '#121317',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 16,
      fontWeight: '600',
      //fontFamily: 'Poppins-Regular',
      fontStyle: 'normal',
      top: 13,
      left: 144.5,
      textAlign: 'center',
    },
    buttonText2: {
      position: 'absolute',
      color: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 16,
      fontWeight: '600',
      //fontFamily: 'Poppins-Regular',
      fontStyle: 'normal',
      top: 13,
      textAlign: 'center', 
      left: 137,
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



