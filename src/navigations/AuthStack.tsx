import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogInScreen from '../srceens/LogInScreen';


interface AuthStackParamList {
  LogIn: any;
}

const Stack = createNativeStackNavigator<AuthStackParamList>();

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