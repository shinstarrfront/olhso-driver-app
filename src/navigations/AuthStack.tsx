import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from '../srceens/StartScreen';
import HomeScreen from '../srceens/HomeScreen';

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
</Stack.Navigator>
  );
};

export default AuthStack;