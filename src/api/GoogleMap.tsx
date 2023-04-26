//API 호출용 파일(Google Map API와 통합하기 위한 파일)
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import { View, StyleSheet } from 'react-native';

const GoogleMap = () => {
 
    return(
    <View style={styles.screen}>
          <MapView 
          style={styles.map}
          initialRegion={{
              latitude: 37.00000,
              longitude: 126.00000,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          provider={PROVIDER_GOOGLE}
          > 
          <Marker
            coordinate={{
            latitude: 37.00000,
            longitude: 126.00000,
          }}
            pinColor="#2D63E2"
            title="하이"
            description="테스트"
          />
          
      
        </MapView>
    </View>
    )
    
  }
  

  const styles = StyleSheet.create({
      screen:{
        flex:1
      },
        map:{
        width: "100%",
        height : "100%"
      }
  })


  export default GoogleMap