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
const AuthStack = () => {
  return (
    <Stack.Navigator
    initialRouteName="Start"
    screenOptions={{
        headerBackTitleVisible: true,
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
          headerStyle: {
            backgroundColor: 'transparent', 
          },
          })}
  />
    <Stack.Screen
        name="Home2"
        component={HomeScreen2}
        options={({ navigation }) => ({
          headerShown: true,
          title: '',
          headerStyle: {
            backgroundColor: '#ffff',
          },
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
          name="EditProfile"
          component={EditProfileScreen}
          options={({ navigation }) => ({
            headerShown: true,
            title: 'Edit Profile', 
            headerBackTitle: '', 
            headerBackTitleVisible: false,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <MaterialCommunityIcons 
                  name="arrow-left" 
                  size={24} 
                  color="black" 
                />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
  );
};

export default AuthStack;