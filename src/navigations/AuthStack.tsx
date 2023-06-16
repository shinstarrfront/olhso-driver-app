import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from '../srceens/StartScreen';
import HomeScreen from '../srceens/HomeScreen';
import ChangePasswordScreen from '../srceens/ChangePasswordScreen';
import PhoneLoginScreen from '../srceens/PhoneLoginScreen';
import TruckInfoScreen from '../srceens/TruckInfoScreen';
import HomeScreen2 from '../srceens/HomeScreen2';
import EditProfileScreen from '../srceens/EditProfileScreen';
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AlertModalScreen from '../srceens/AlertModalScreen';
import SideScreen from '../srceens/SideScreen';
import OrdersScreen from '../srceens/OrdersScreen';
import TermsOfServiceScreen from '../srceens/TermsOfServiceScreen';
import TruckInfoEditScreen from '../srceens/TruckInfoEditScreen';
import { getDriverInfo } from '../state/queries';

interface AuthStackParamList {
  LogIn: PhoneLoginScreenProps;
  PhoneLogIn: PhoneLoginScreenProps;
  [key: string]: any;
}

interface PhoneLoginScreenProps {
  navigation: any; 
}

const Stack = createStackNavigator<AuthStackParamList>();

//로그인 전
//해당 파일에 설정한 것이 적용된다
const AuthStack = () => {
  return (
    <Stack.Navigator
    initialRouteName="Start"
    screenOptions={{
        headerBackTitleVisible: false,
        // headerTitle: ''
    }}
>
  <Stack.Screen 
    name="Start" 
    component={StartScreen}
    options={({ navigation }) => ({
    headerShown: false,
    headerTitle: '',
    })}
    />
  
   
  <Stack.Screen 
    name="PhoneLogIn"
    component={PhoneLoginScreen}
    options={{ 
          headerTitle: 'Sign in', 
          headerBackTitle: '', 
          headerBackTitleVisible: false,
          headerTintColor: 'black', 
        }} 
  />
   <Stack.Screen 
    name="ChangePassword"
    component={ChangePasswordScreen}
    options={{ 
      headerTitle: 'Change the password', 
      headerBackTitle: '', 
      headerBackTitleVisible: false,
      headerTintColor: 'black', 
    }} 
  />
  <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: '',
          headerBackTitleVisible: false,
          headerStyle: 
          { backgroundColor: 'rgb(163, 191, 244)' },
          // { backgroundColor: 'rgb(233,234,237)' },
          headerLeft: () => ( 
            <TouchableOpacity 
            onPress={async () => {
              await getDriverInfo(); 
              navigation.navigate('Side');
            }}
            >
              <Image 
                source={require('../assets/menu.png')} 
                style={{ width: 42, height: 42, marginLeft: 14 }} 
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
              <TouchableOpacity 
                onPress={() => navigation.navigate('AlertModal')}>
                <Image 
                source={require('../assets/alert.png')} 
                style={{ width: 42, height: 42, marginRight: 14 }} 
              />
            </TouchableOpacity>
          ),
          })}
      />
    <Stack.Screen
        name="Home2"
        component={HomeScreen2}
        options={({ navigation }) => ({
          headerShown: true,
          title: '',
          headerBackTitleVisible: false,
          headerStyle: 
          // { backgroundColor: 'transparent' },
          { backgroundColor: 'rgb(163, 191, 244)' },
          // { backgroundColor: 'rgb(233,234,237)' },
          headerLeft: () => ( 
            <TouchableOpacity 
              onPress={() => navigation.navigate('Side')}>
              <Image 
                source={require('../assets/menu.png')} 
                style={{ width: 42, height: 42, marginLeft: 14 }} 
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
              <TouchableOpacity 
                onPress={() => navigation.navigate('AlertModal')}>
                <Image 
                source={require('../assets/alert.png')} 
                style={{ width: 42, height: 42, marginRight: 14 }} 
              />
            </TouchableOpacity>
          ),
          })}
      />
      <Stack.Screen
        name="TruckInfo"
        component={TruckInfoScreen}
        options= {({ navigation }) => ({
          title: 'Truck Info',
          headerBackTitle: '',
          headerBackTitleVisible: true 
        })}
        />
        <Stack.Screen
        name="TruckInfoEdit"
        component={TruckInfoEditScreen}
        options= {{ 
          title: 'Truck Info',
          headerBackTitle: '',
          headerBackTitleVisible: true }}
        />
      <Stack.Screen
        name="AlertModal"
        component={AlertModalScreen}
        options= {({ navigation }) => ({
          headerShown: false,
          headerTitle: '',
        })}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={({ navigation }) => ({
            headerShown: true,
            title: 'Edit Profile', 
            headerBackTitle: '', 
            headerBackTitleVisible: false,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Side")}>
                <MaterialCommunityIcons 
                  name="arrow-left" 
                  size={24} 
                  color="black" 
                />
              </TouchableOpacity>
            ),
          })}
        />
      <Stack.Screen 
        name="Side" 
        component={SideScreen}
        options={({ navigation }) => ({
        headerShown: true,
        headerTitle: '',
        })}
      />
      <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'Orders', 
          headerBackTitle: '', 
          headerBackTitleVisible: false
        })}
        />
      <Stack.Screen 
        name="TermsOfService" 
        component={TermsOfServiceScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'Terms Of Service', 
          headerBackTitle: '', 
          headerBackTitleVisible: false
        })}
      />
      </Stack.Navigator>
  );
};

export default AuthStack;