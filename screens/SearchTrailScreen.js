import React from 'react';
import {View, Text,StyleSheet ,Platform ,Button } from 'react-native';
import Colors from '../constants/Colors'
const SearchTrailScreen = props =>{
return(
 <View style={styles.screen}>
   <Text>Search Screen</Text>
   <Button title="Go Back to Home" onPress={()=>{
     props.navigation.popToTop();//pops to the first/root screen
   }}/>
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
    justifyContent: 'center',
    alignItems: 'center'
  }

});

export default SearchTrailScreen;