import React from 'react';
import {View, Text,StyleSheet ,Platform ,Button, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import Colors from '../constants/Colors';
import MapStyle from '../constants/MapStyle';
const SearchTrailScreen = props =>{
return(
<View style={styles.screen}>
  <View style={styles.mapS}>
  <MapView style={styles.map} customMapStyle={MapStyle.mapStyle}>

  </MapView>
  </View>
  <Text>Details of trail</Text>
  <ScrollView>
    
  </ScrollView>
  <Text>Select Trail from list to show</Text>
  {/* <Button title="Go Back to Home" onPress={()=>{
    props.navigation.popToTop();//pops to the first/root screen
  }}/> */}
</View>

)
};
// SearchTrailScreen.navigationOptions ={
//   headerStyle:{
//     backgroundColor: 
//     Platform.OS === 'android' ? Colors.primC : ''
//   },
//   headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primC
// }

const styles = StyleSheet.create({
  screen:{
    flex: 1,
    padding:20,
    alignItems: 'center'
  },
  map:{
    width:300,
    height:450,
  },
  mapS:{
    width:300,
    height:450,
    borderRadius:20,
    overflow:'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  }

});

export default SearchTrailScreen;