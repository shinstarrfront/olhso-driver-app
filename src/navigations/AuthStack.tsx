import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../srceens/SignInScreen' //'../screens/SignInScreen'
import SignUpScreen from '../srceens/SignUpScreen';
import { AuthRoutes } from './routes';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={AuthRoutes.SIGN_IN} component={SignInScreen} />
      <Stack.Screen name={AuthRoutes.SIGN_UP} component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;