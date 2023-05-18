// import { useNavigation } from "@react-navigation/native";
// import { Pressable, PressableProps, StyleSheet } from "react-native";
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import PropTypes from 'prop-types';
// import HomeScreen from "../srceens/HomeScreen";


// interface HeaderLeftButtonProps {
//   canGoBack?: boolean;
//   tintColor?: string;
// }

// const HeaderLeftButton: React.FC<HeaderLeftButtonProps> = ({ canGoBack }) => {
//   const navigation = useNavigation();

//   if (!canGoBack) {
//     return null;
//   }

//   const handlePress = () => {
//     navigation.navigate('HomeScreen');
//   };

//   return (
//     <Pressable onPress={handlePress} hitSlop={10} style={styles.container}>
//       <MaterialCommunityIcons
//         name="chevron-left"
//         size={30}
//         color='black'
//       />
//     </Pressable>
//   );
// };

// HeaderLeftButton.propTypes = {
//   canGoBack: PropTypes.bool,
//   tintColor: PropTypes.string,
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//   },
// });

// export default HeaderLeftButton;
