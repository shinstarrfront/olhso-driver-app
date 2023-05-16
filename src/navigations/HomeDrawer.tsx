import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { DrawerNavigationProp, createDrawerNavigator,DrawerContentScrollView,DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../types';
import 'react-native-reanimated';
import EditProfileScreen from '../srceens/EditProfileScreen';
import OrdersScreen from '../srceens/OrdersScreen';
import TruckInfoEditScreen from '../srceens/TruckInfoEditScreen';

interface HomeDrawerProps {
  navigation: DrawerNavigationProp<RootDrawerParamList, 'User'>;
}

const Drawer = createDrawerNavigator();

const HomeDrawer: React.FC<HomeDrawerProps> = ({ navigation }) => {
  return (
    <Drawer.Navigator>
       <Drawer.Screen name="edit profile" component={EditProfileScreen} />
       <Drawer.Screen name="delidvery history" component={OrdersScreen} />
       <Drawer.Screen name="Modify & confirm the inventory" component={TruckInfoEditScreen} />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;
