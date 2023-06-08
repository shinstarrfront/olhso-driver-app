import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import StartScreen from '../srceens/StartScreen';
import HomeScreen from '../srceens/HomeScreen';
import HomeScreen2 from '../srceens/HomeScreen2';
import PhoneLoginScreen from '../srceens/PhoneLoginScreen';
import TruckInfoScreen from '../srceens/TruckInfoScreen';
import TruckInfoEditScreen from '../srceens/TruckInfoEditScreen';
import EditProfileScreen from '../srceens/EditProfileScreen';
import LeavingWorkScreen from '../srceens/LeavingWorkScreen';
import OrdersScreen from '../srceens/OrdersScreen';
import ServiceGuidanceScreen from '../srceens/ServiceGuidanceScreen';
import ChangePasswordScreen from '../srceens/ChangePasswordScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';



interface AppStackParamList extends Record<string, object | any> {
  Home: any;
  Start: any;
  PhoneLogIn: any;
}

const Stack = createStackNavigator<AppStackParamList>();

//로그인 후
const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Start"
        component={StartScreen}
        options={({ navigation }) => ({
          headerShown: false,
          // headerBackTitle: '',
          // headerBackTitleVisible: false,
          headerBackTitleVisible: true,
          })}
      />
      <Stack.Screen 
        name="ChangePassword"
        component={ChangePasswordScreen}
        options= {{ 
          title: 'Change the password',
          headerBackTitle: '',
          headerBackTitleVisible: true }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: '',
          headerBackTitleVisible: false,
          headerLeft: () => ( 
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <MaterialCommunityIcons 
                name="microsoft-xbox-controller-menu" 
                size={24} 
                color="black" 
              />
            </TouchableOpacity>
          ),
          })}
      />
      <Stack.Screen
        name="Home2"
        component={HomeScreen2}
        options={({ navigation }) => ({
          headerShown: true,
          title: '',
          headerLeft: () => ( 
            <MaterialCommunityIcons 
            name="microsoft-xbox-controller-menu" 
            size={24} 
            color="black" />
          ),
          headerStyle: {
            backgroundColor: 'transparent', 
          },
          })}
      />
      <Stack.Screen
        name="TruckInfo"
        component={TruckInfoScreen}  
        options= {({ navigation }) => ({
          title: 'Truck Info',
          headerBackTitle: '',
          headerBackTitleVisible: true 
        })}
        />
        <Stack.Screen
        name="TruckInfoEdit"
        component={TruckInfoEditScreen}
        options= {{ 
          title: 'Truck Info',
          headerBackTitle: '',
          headerBackTitleVisible: true }}
        />
        {/* <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'Edit Profile', 
          headerBackTitle: '', 
          headerBackTitleVisible: false
        })}
        /> */}
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={({ navigation }) => ({
            headerShown: true,
            title: 'Edit Profile', 
            headerBackTitle: '', 
            headerBackTitleVisible: false,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <MaterialCommunityIcons 
                  name="arrow-left" 
                  size={24} 
                  color="black" 
                />
              </TouchableOpacity>
            ),
          })}
        />
         <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'Orders', 
          headerBackTitle: '', 
          headerBackTitleVisible: false
        })}
        />
        <Stack.Screen
        name="ServiceGuidance"
        component={ServiceGuidanceScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'Service Policy Guidance', 
          headerBackTitle: '', 
          headerBackTitleVisible: false
        })}
        />
        <Stack.Screen
        name="LeavingWork"
        component={LeavingWorkScreen}
        options={({ navigation }) => ({
          headerShown: false,
          title: '', 
          headerBackTitle: '', 
          headerBackTitleVisible: false
        })}
        />
    </Stack.Navigator>
  );
};

export default AppStack;


const styles = StyleSheet.create({

});
