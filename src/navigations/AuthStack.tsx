import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from '../srceens/StartScreen';
import HomeScreen from '../srceens/HomeScreen';
import PhoneLoginScreen from '../srceens/PhoneLoginScreen';

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
    name="Home"
    component={HomeScreen}
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
</Stack.Navigator>
  );
};

export default AuthStack;