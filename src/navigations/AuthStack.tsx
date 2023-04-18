import { createStackNavigator } from '@react-navigation/stack';
import LogInScreen from '../srceens/LogInScreen';


interface AuthStackParamList {
  LogIn: any;
  [key: string]: any;
}

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
      name="LogIn"
      component={LogInScreen}
      options={({ navigation }) => ({
        headerShown: false,
      })}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;