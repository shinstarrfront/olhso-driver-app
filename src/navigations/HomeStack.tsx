import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../srceens/HomeScreen';


interface HomeStackParamList {
  Map: any;
  [key: string]: any;
}

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator>
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