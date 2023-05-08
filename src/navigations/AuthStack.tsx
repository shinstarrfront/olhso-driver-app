import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from '../srceens/StartScreen';
import HomeScreen from '../srceens/HomeScreen';
import PhoneLoginScreen from '../srceens/PhoneLoginScreen';
import TruckInfoScreen from '../srceens/TruckInfoScreen';
import TruckInfoEditScreen from '../srceens/TruckInfoEditScreen';
import EditProfileScreen from '../srceens/EditProfileScreen';
import LeavingWorkScreen from '../srceens/LeavingWorkScreen';
import OrdersScreen from '../srceens/OrdersScreen';
import ServiceGuidanceScreen from '../srceens/ServiceGuidanceScreen';


interface AuthStackParamList {
  LogIn: any;
  [key: string]: any;
}

const Stack = createStackNavigator<AuthStackParamList>();

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
          title: '', // hides the screen title in the header
          headerBackTitle: '', // sets the back button label to an empty string
          headerBackTitleVisible: false // hides the back button label on iOS
        }} 
  />
  <Stack.Screen 
    name="Home"
    component={HomeScreen}
    options={({ navigation }) => ({
    headerShown: false,
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
   <Stack.Screen
        name="TruckInfoEdit"
        component={TruckInfoEditScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'Truck info', 
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
          headerBackTitleVisible: false
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
        name="ServiceGuidance"
        component={ServiceGuidanceScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'Service Policy Guidance', 
          headerBackTitle: '', 
          headerBackTitleVisible: false
        })}
        />
        <Stack.Screen
        name="LeavingWork"
        component={LeavingWorkScreen}
        options={({ navigation }) => ({
          headerShown: false,
          title: '', 
          headerBackTitle: '', 
          headerBackTitleVisible: false
        })}
        />
</Stack.Navigator>
  );
};

export default AuthStack;