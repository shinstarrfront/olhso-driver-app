import * as React from 'react';
import { StyleSheet, Text, View } from "react-native";
import MapView from 'react-native-maps';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';


const HomeScreen = () => {
    return (
        <View style={styles.container}>
             <MapView 
          style={styles.map}
          initialRegion={{
              latitude: 37.50736766932199,
              longitude: -122.26005668254102,
              latitudeDelta: 0.1, //확대 레벨 조정
              longitudeDelta: 0.1, //확대 레밸 조정
            }}
          provider={PROVIDER_GOOGLE}
          > 
          <Marker
            coordinate={{
            latitude: 37.50736766932199,
            longitude: -122.26005668254102,
          }}
            pinColor="#2D63E2"
            title="Hi there"
            description="This my test"
          />
          
      
        </MapView>
        </View>
    );
};

HomeScreen.propTypes = {

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
    },
    map: {
        width: "100%",
        height: "100%"
    }
});

export default HomeScreen;
