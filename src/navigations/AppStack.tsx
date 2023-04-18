// navigations/AppStack.js

import { createStackNavigator } from '@react-navigation/stack';
import { AnyStyledComponent } from 'styled-components';
import HomeScreen from '../srceens/HomeScreen';
import LogInScreen from "../srceens/LogInScreen";
import PhoneLoginScreen from "../srceens/PhoneLoginScreen";

interface AppStackParamList extends Record<string, object | any> {
    Home: any;
    LogIn: any;
    PhoneLogIn: any;
  }
  
const Stack = createStackNavigator<AppStackParamList>();

const AppStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Group>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PhoneLogIn" component={PhoneLoginScreen} />
        <Stack.Screen name="LogIn" component={LogInScreen}
          options={({ navigation }) => ({
            headerShown: false,
            initialParams: {
              navigation,
            },
          })}
        />
      
        </Stack.Group>
      </Stack.Navigator>
    );
  };

export default AppStack;
