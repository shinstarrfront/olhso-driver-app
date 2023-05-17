import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import EditProfileScreen from '../srceens/EditProfileScreen';

interface TestStackParamList extends Record<string, object | any> {
    EditProfileScreen: any;
}

const Stack = createStackNavigator<TestStackParamList>();


const TestStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Edit Profile"
        component={EditProfileScreen}
        options={({ navigation }) => ({
          headerShown: true,
        })}
      />
    </Stack.Navigator>
  );
};

export default TestStack;
