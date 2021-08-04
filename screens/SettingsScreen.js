import React from 'react';
import {View, Text,StyleSheet,Platform  } from 'react-native';
import Colors from '../constants/Colors'
import LocationTrack from '../screens/locationTrack';

const SettingsScreen = props =>{
return(
 <LocationTrack/>
)
};
// SettingsScreen.navigationOptions ={
//   headerStyle:{
//     backgroundColor: 
//     Platform.OS === 'android' ? Colors.primC : ''
//   },
//   headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primC
// }
const styles = StyleSheet.create({
  screen:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

});

export default SettingsScreen;