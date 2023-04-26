//새롭게 생성한 시작파일(entry point)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './navigations/AppStack';
import AuthStack from './navigations/AuthStack';

const App = () => {
  const isAuthenticated = false; 

  return (
    <NavigationContainer key="navigation">
      {/* {isAuthenticated ? <AppStack /> : <AuthStack />} */}
      {isAuthenticated ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
};

export default App;
