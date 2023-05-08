import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const TruckInfoScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.box}>
          <Text style={styles.text}>CS</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>JC</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>JC</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>JC</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.box}>
          <Text style={styles.text}>CS</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>JC</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>JC</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>JC</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.box}>
          <Text style={styles.text}>CS</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>JC</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>JC</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>JC</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.box}>
          <Text style={styles.text}>CS</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>JC</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>JC</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>JC</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  box: {
    width: 80,
    height: 82,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F1F4',
    borderRadius: 9,
    margin: 5,
  },
  text: {
    fontSize: 20,
  },
});

export default TruckInfoScreen;
