import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../srceens/LogInScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;