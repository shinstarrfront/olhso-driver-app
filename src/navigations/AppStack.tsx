// navigations/AppStack.js

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../srceens/HomeScreen';
import LoginScreen from '../srceens/LogInScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
