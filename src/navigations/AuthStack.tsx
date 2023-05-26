import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from '../srceens/StartScreen';
import HomeScreen from '../srceens/HomeScreen';
import ChangePasswordScreen from '../srceens/ChangePasswordScreen';
import PhoneLoginScreen from '../srceens/PhoneLoginScreen';
import TruckInfoScreen from '../srceens/TruckInfoScreen';

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
        headerBackTitleVisible: false,
        headerTitle: ''
    }}
>
  <Stack.Screen 
    name="Start" 
    component={StartScreen}
    options={({ navigation }) => ({
    headerShown: false,
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
          headerShown: false,
          // title: '',
          // headerStyle: {
          //   backgroundColor: 'transparent', // sets the background color of the header
          // },
          })}
  />
  <Stack.Screen
        name="TruckInfo"
        component={TruckInfoScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'Truck info', 
          headerBackTitle: '', 
          headerBackTitleVisible: true
        })}
        />
    </Stack.Navigator>
  );
};

export default AuthStack;