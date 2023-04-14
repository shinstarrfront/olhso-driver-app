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
    Linking,
    Modal,
} from 'react-native';

interface LogInScreenProps {}


const LogInScreen: React.FC<LogInScreenProps> = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleBtn1Press = (event: GestureResponderEvent) => {
    // handle button 1 press
  };

  const handleBtn2Press = (event: GestureResponderEvent) => {
    // handle button 2 press
    setModalVisible(true);
  };



//   return (
//     <View 
//     style={styles.container}>
//       <Text 
//       style={styles.title}>OLHSO</Text>
//       <TouchableOpacity 
//       style={styles.btn1} 
//       onPress={handleBtn1Press}>
//         <Text 
//         style={styles.buttonText1}>Phone Number LogIn</Text>
//       </TouchableOpacity>
//       <TouchableHighlight 
//       style={styles.btn2} 
//       onPress={handleBtn2Press}>
//         <Text 
//         style={styles.buttonText2}>Connect to Service Center</Text>
//       </TouchableHighlight>
//     </View>
//   );
// };


return (
    <View style={styles.container}>
      <Text style={styles.title}>OLHSO</Text>
      <TouchableOpacity style={styles.btn1} onPress={handleBtn1Press}>
        <Text style={styles.buttonText1}>Phone Number LogIn</Text>
      </TouchableOpacity>
      <TouchableHighlight style={styles.btn2} onPress={handleBtn2Press}>
        <Text style={styles.buttonText2}>Connect to Service Center</Text>
      </TouchableHighlight>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Modal Content</Text>
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    position: 'absolute',
    top: Dimensions.get('window').height / 3.5
  },
  btn1: {
    backgroundColor: 'grey',
    padding: 10,
    margin: 10,
    borderRadius: 30,
    width: 400, 
    position: 'absolute',
    top: Dimensions.get('window').height / 1.5,
    borderColor: 'black',
    borderWidth: 1,
  },
  btn2: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 30,
    width: 400,
    position: 'absolute',
    top: Dimensions.get('window').height / 1.3,
    borderColor: 'black',
    borderWidth: 1,

  },
  buttonText1: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  buttonText2: {
    color: 'black',
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
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalCloseBtn: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalCloseBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LogInScreen;
