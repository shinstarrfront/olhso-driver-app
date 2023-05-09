//새롭게 생성한 시작파일(entry point)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './navigations/AppStack';
import AuthStack from './navigations/AuthStack';
import HomeStack from './navigations/HomeStack';

const App = () => {
  const isAuthenticated = false; 

  return (
    <NavigationContainer key="navigation">
      {/* {isAuthenticated ? <AppStack /> : <AuthStack />} */}
      {/* <AuthStack /> */}
        <HomeStack />
    </NavigationContainer>
  );
};

export default App;
