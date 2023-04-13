// navigations/AppStack.js

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../srceens/HomeScreen';
import LogInScreen from "../srceens/LogInScreen"

interface AppStackParamList extends Record<string, object | any> {
    Home: any;
    LogIn: any;
  }
  
const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="LogIn"
          component={LogInScreen}
          options={({ navigation }) => ({
            headerShown: true,
            initialParams: {
              navigation,
            },
          })}
        />
      </Stack.Navigator>
    );
  };

export default AppStack;
