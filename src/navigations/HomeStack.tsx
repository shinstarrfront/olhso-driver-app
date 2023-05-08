import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../srceens/HomeScreen';
import TruckInfoScreen from '../srceens/TruckInfoScreen';

interface HomeStackParamList {
  Map: any;
  [key: string]: any;
}

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
      name="Truck Info"
      component={TruckInfoScreen}
      options={({ navigation }) => ({
        headerShown: true,
      })}
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

export default HomeStack;