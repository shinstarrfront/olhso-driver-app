//중앙 파일로 사용(앱의 내비게이션 구조 정의)
// import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createStackNavigator } from '@react-navigation/stack';
// import AuthStack from './AuthStack';
// import AppStack from './AppStack';
// import HomeStack from './HomeStack';
// import HomeDrawer from './HomeDrawer';

// const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();

// const Navigation = () => {
//   return (
//     <NavigationContainer>
//     <Drawer.Navigator>
//       <Drawer.Screen name="Auth" component={AuthStack} />
//       <Drawer.Screen name="App" component={AppStack} />
//       <Drawer.Screen name="Home" component={HomeStack} />
//       <Drawer.Screen name="Home" component={HomeDrawer} />
//     </Drawer.Navigator>
//   </NavigationContainer>
//   );
// };

// export default Navigation;


import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import HomeStack from './HomeStack';
import * as Font from 'expo-font';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <AuthStack />
      <AppStack />
      <HomeStack />
  </NavigationContainer>
  );
};

export default Navigation;
