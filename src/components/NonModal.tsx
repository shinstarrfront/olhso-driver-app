import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Modal, Button } from "react-native";
import { Dimensions } from 'react-native';

interface NonmodalProps {
    visible: boolean;
    onClose: () => void;
  }
  

const Nonmodal: React.FC<NonmodalProps> = ({ visible, onClose }) => {
    const animation = React.useRef(new Animated.Value(Dimensions.get('window').height / 2.5)).current;

  return (
    <View style={styles.container}>
       <Animated.View style={[styles.nonModal, { height: animation }]}>
         <Text>Item</Text>
         {/* 리스트 컴포넌트 */}
         <Text>Quantity</Text>
         {/* -+, 수량 버튼 컴포넌트 */}
         <Text>Price</Text>
     </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 339,
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 14,
    borderRadius: 10,
  },
  nonModal: {

  },
});

export default Nonmodal;
