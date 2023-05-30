import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import EditProfileScreen from '../srceens/EditProfileScreen';
import OrdersScreen from '../srceens/OrdersScreen';
import TruckInfoEditScreen from '../srceens/TruckInfoEditScreen';
import TruckInfoScreen from '../srceens/TruckInfoScreen';

interface TestStackParamList extends Record<string, object | any> {
    EditProfileScreen: any;
}

const Stack = createStackNavigator<TestStackParamList>();


const TestStack = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="Edit Profile"
        component={EditProfileScreen}
        options={({ navigation }) => ({
          headerShown: true,
        })}
      /> */}
      {/* <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={({ navigation }) => ({
          headerShown: true,
        })}
      /> */}
      {/* <Stack.Screen
        name="TruckInfoEdit"
        component={TruckInfoEditScreen}
        options={({ navigation }) => ({
          headerShown: true,
        })}
      /> */}
      {/* <Stack.Screen
        name="TruckInfo"
        component={TruckInfoScreen}
        options={({ navigation }) => ({
          headerShown: true,
        })}
      /> */}
    </Stack.Navigator>
  );
};

export default TestStack;
