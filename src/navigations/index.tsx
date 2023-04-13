//중앙 파일로 사용
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';


const Navigation = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};

export default Navigation;