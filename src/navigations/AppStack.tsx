import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import HomeScreen from '../srceens/HomeScreen';
import StartScreen from '../srceens/StartScreen';
import PhoneLoginScreen from '../srceens/PhoneLoginScreen';

interface AppStackParamList extends Record<string, object | any> {
  Home: any;
  Start: any;
  PhoneLogIn: any;
}

const Stack = createStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
};

export default AppStack;
