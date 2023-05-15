import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../types';
import 'react-native-reanimated';

interface HomeDrawerProps {
  navigation: DrawerNavigationProp<RootDrawerParamList, 'User'>;
}

const HomeDrawer: React.FC<HomeDrawerProps> = ({ navigation }) => {
  return (
    <View>
      <Button
        title=""
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
    </View>
  );
};

export default HomeDrawer;
