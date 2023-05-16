// // //새롭게 생성한 시작파일(entry point)
// // import React from 'react';
// // import { DrawerActions, NavigationContainer } from '@react-navigation/native';
// // import { createDrawerNavigator } from '@react-navigation/drawer';
// // import AppStack from './navigations/AppStack';
// // import AuthStack from './navigations/AuthStack';
// // import HomeStack from './navigations/HomeStack';
// // import HomeDrawer from './navigations/HomeDrawer';

// // const App = () => {
// //   const isAuthenticated = false; 

// //   const Drawer = createDrawerNavigator();

// //   return (
// //     <NavigationContainer key="navigation">
// //       <Drawer.Navigator>
// //         <Drawer.Screen name="Home" component={HomeDrawer} />
// //       </Drawer.Navigator>
// //       {/* {isAuthenticated ? <AppStack /> : <AuthStack />} */}
// //       {/* <AuthStack /> */}
// //       <HomeStack />
// //     </NavigationContainer>
// //   );
// // };

// // export default App;

// import React from 'react';
// import { DrawerActions, NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator,DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
// import AppStack from './navigations/AppStack';
// import AuthStack from './navigations/AuthStack';
// import HomeDrawer from './navigations/HomeDrawer';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './srceens/HomeScreen';
// import HomeStack from './navigations/HomeStack';


// const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

// const App = () => {
//   const isAuthenticated = false; 
//   const CustomDrawerContent = (props:any) => {
//     return (
//       <DrawerContentScrollView {...props}>
//         <DrawerItemList {...props} />
//         <DrawerItem label="End Shift" onPress={() => alert('End Shift')} />
//       </DrawerContentScrollView>
//     );
//   }

//   return (
//     <NavigationContainer key="navigation">
//       <Drawer.Navigator
//       drawerContent={props=><CustomDrawerContent {...props}/>}
//       >
//         <Drawer.Screen name="Home" component={HomeDrawer} />
//       </Drawer.Navigator>
//       {/* {isAuthenticated ? <AppStack /> : <AuthStack />} */}
//       {/* <AuthStack /> */}
//       <HomeStack />
//     </NavigationContainer>
//   );
// };

// export default App;


import { registerRootComponent } from 'expo';
import React from 'react';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator,DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import AppStack from './navigations/AppStack';
import AuthStack from './navigations/AuthStack';
import HomeDrawer from './navigations/HomeDrawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './srceens/HomeScreen';
import HomeStack from './navigations/HomeStack';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const isAuthenticated = false; 
  // const CustomDrawerContent = (props:any) => {
  //   return (
  //     <DrawerContentScrollView {...props}>
  //       <DrawerItemList {...props} />
  //       <DrawerItem label="End Shift" onPress={() => alert('End Shift')} />
  //     </DrawerContentScrollView>
  //   );
  // }

  return (
      <NavigationContainer key="navigation">
        {/* <Drawer.Navigator>
          <Drawer.Screen name="Home" component={HomeDrawer} />
        </Drawer.Navigator> */}
        <HomeStack />
    </NavigationContainer>
  );
};

export default registerRootComponent(App);



