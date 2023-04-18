//중앙 파일로 사용
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

const Navigation = () => {
  return (
    <NavigationContainer>
      <AuthStack />
      <HomeStack />
    </NavigationContainer>
  );
};

export default Navigation;