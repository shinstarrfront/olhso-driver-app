import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../srceens/HomeScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}