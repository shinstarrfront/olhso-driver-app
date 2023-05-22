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
      onPress={() => {Linking.openURL('tel:01039598640');}}>
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
      fontFamily: 'Poppins-Regular',
      fontStyle: 'normal',
      top: 15,
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
      fontFamily: 'Poppins-Regular',
      fontStyle: 'normal',
      top: 15,
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



// import { 
//     View,
//     Text, 
//     TouchableOpacity, 
//     TouchableHighlight, 
//     StyleSheet, 
//     GestureResponderEvent, 
//     Dimensions,
//     ViewStyle,
//     TextStyle,
//     Modal,
//     Linking,
// } from 'react-native';
// import { Auth } from 'aws-amplify'
// import { SvgXml } from 'react-native-svg';
// import * as FileSystem from 'expo-file-system';
// import logoSvg from '../assets/logo.svg';


// interface LogInScreenProps {
//   navigation: any;
// }

// const StartScreen: React.FC<LogInScreenProps> = ({ navigation }) => {
//   const [logoXml, setLogoXml] = useState<string | null>(null);

//   useEffect(() => {
//     const loadLogo = async () => {
//       try {
//         const fileUri = FileSystem.documentDirectory + 'logo.svg';
//         await FileSystem.downloadAsync(logoSvg, fileUri);
//         const fileContents = await FileSystem.readAsStringAsync(fileUri);
//         setLogoXml(fileContents);
//       } catch (error) {
//         console.error('Error loading logo:', error);
//       }
//     };

//     loadLogo();
//   }, []);
  
//   return (
//     <View style={styles.container}>
//       <View style={styles.boxcolumn}>
//         {logoXml && <SvgXml xml={logoXml} />}
//         <Text style={styles.title}>OLHSO</Text>
//         <TouchableOpacity style={styles.btn1} onPress={() => navigation.navigate('PhoneLogIn')}>
//           <Text style={styles.buttonText1}>Sign in</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.btn2}
//           onPress={() => {
//             Linking.openURL('tel:01039598640');
//           }}
//         >
//           <Text style={styles.buttonText2}>Get Help</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor:'#ED6A2C'
//   },
//   boxcolumn: {
//     width: '91.46%',
//     alignSelf: 'center',
//     height: '100%',

// },
//   title: {
//     fontSize: 50,
//     fontWeight: 'bold',
//     position: 'absolute',
//     top: Dimensions.get('window').height / 3.5,
//     color: 'white',
//   },
//   btn1: {
//     top: 562,
//     backgroundColor: '#FFFFFF',
//     color: 'black',
//     paddingTop: 15,
//     paddingBottom: 15,
//     borderRadius: 24,
//     width: '100%',
//     position: 'absolute',
//     borderWidth: 1,
//     borderColor: 'white',
//     height: 46,
//   },
//   btn2: {
//     top: 562,
//     backgroundColor: '#FFFFFF',
//     color: 'black',
//     paddingTop: 15,
//     paddingBottom: 15,
//     borderRadius: 24,
//     width: '100%',
//     position: 'absolute',
//     borderWidth: 1,
//     borderColor: 'white',
//     height: 46,
//   },
//   buttonText1: {
//     color: '#121317',
//     alignItems: 'center',
//     textAlign: 'center',
//     fontSize: 16,
//     lineHeight: 100,
//     fontWeight: '600',
//     fontFamily: 'Poppins-Regular',
//     fontStyle: 'normal',
//     top: 15,
//   },
//   buttonText2: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     textAlign: 'center',
//     marginTop: 10,
//     marginBottom: 10,
//     fontWeight: 'bold'
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//     width: Dimensions.get('window').width / 1.5,
//     height: Dimensions.get('window').height / 4,
//   },
//   modalText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     position: 'absolute',
//     top: Dimensions.get('window').height / 22,
//   },
//   modalCloseBtn: {
//     backgroundColor: 'red',
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 10,
//     top: Dimensions.get('window').height / 7,
//   },
//   modalCloseBtnText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default StartScreen;