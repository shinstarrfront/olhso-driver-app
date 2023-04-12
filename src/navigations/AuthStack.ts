import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
        <Stack.Screen />
        </Stack.Navigator>
    )
};

export default AuthStack;
