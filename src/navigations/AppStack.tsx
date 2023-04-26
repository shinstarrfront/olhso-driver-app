// navigations/AppStack.js

import { createStackNavigator } from '@react-navigation/stack';
import { AnyStyledComponent } from 'styled-components';
import HomeScreen from '../srceens/HomeScreen';
import StartScreen from "../srceens/StartScreen";
import PhoneLoginScreen from "../srceens/PhoneLoginScreen";

interface AppStackParamList extends Record<string, object | any> {
    Home: any;
    Start: any;
    PhoneLogIn: any;
  }
  
const Stack = createStackNavigator<AppStackParamList>();

const AppStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Group>
        <Stack.Screen name="Start" component={StartScreen}/>
        <Stack.Screen name="PhoneLogIn" component={PhoneLoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Group>
      </Stack.Navigator>
    );
  };

export default AppStack;
