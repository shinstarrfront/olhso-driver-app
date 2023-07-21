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
import AlertModalScreen from '../srceens/AlertModalScreen';
import SideScreen from '../srceens/SideScreen';
import TermsOfServiceScreen from '../srceens/TermsOfServiceScreen';

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
          headerBackTitle: '',
          headerBackTitleVisible: false,
          // headerBackTitleVisible: true,
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
          headerStyle: 
          {backgroundColor: '#FFFFFF'},
          // { backgroundColor: 'rgb(163, 191, 244)' },
          // { backgroundColor: 'rgb(233,234,237)' },
          headerLeft: () => ( 
            <TouchableOpacity 
              onPress={() => navigation.navigate('Side')}>
              <Image 
                source={require('../assets/menu.png')} 
                style={{ width: 42, height: 42, marginLeft: 14 }} 
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
              <TouchableOpacity 
                onPress={() => navigation.navigate('AlertModal')}>
                <Image 
                source={require('../assets/alert.png')} 
                style={{ width: 42, height: 42, marginRight: 14 }} 
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
          headerBackTitleVisible: false,
          headerStyle: 
          // { backgroundColor: 'transparent' },
          { backgroundColor: 'rgb(163, 191, 244)' },
          // { backgroundColor: 'rgb(233,234,237)' },
          headerLeft: () => ( 
            <TouchableOpacity 
              onPress={() => navigation.navigate('Side')}>
              <Image 
                source={require('../assets/menu.png')} 
                style={{ width: 42, height: 42, marginLeft: 14 }} 
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
              <TouchableOpacity 
                onPress={() => navigation.navigate('AlertModal')}>
                <Image 
                source={require('../assets/alert.png')} 
                style={{ width: 42, height: 42, marginRight: 14 }} 
              />
            </TouchableOpacity>
          ),
          })}
      />
      <Stack.Screen
        name="AlertModal"
        component={AlertModalScreen}
        options= {({ navigation }) => ({
          title: '',
          headerBackTitle: '',
          headerBackTitleVisible: false, 
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
        <Stack.Screen 
        name="Side" 
        component={SideScreen}
        options={({ navigation }) => ({
        headerShown: true,
        headerTitle: '',
        })}
      />
      <Stack.Screen 
        name="TermsOfService" 
        component={TermsOfServiceScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'Terms Of Service', 
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
