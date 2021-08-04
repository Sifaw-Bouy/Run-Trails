import React from 'react';
import { View,Text,StyleSheet, TouchableOpacity,TouchableNativeFeedback,Platform} from 'react-native';
import { ScreenContainer } from 'react-native-screens';

const HomeGridTiles = props => {
  let Touchcmp = TouchableOpacity;

  if(Platform.OS ==='android' 
  && Platform.Version>=21){
    Touchcmp = TouchableNativeFeedback;
  }
  return(
    <View style={styles.gridS}>
    <Touchcmp style={{flex:1}}
        onPress={props.onSelect}>
      <View style={{...styles.container,...{backgroundColor:props.color}}}>
        <Text style={styles.tileN}>
          {props.title}
        </Text>
      </View>
    </Touchcmp>
    </View>
  );
};


const styles = StyleSheet.create({
  gridS:{
    flex:1,
    margin: 15,
    height:100,
    justifyContent: 'center',
    borderRadius: 10,
    overflow:'hidden'
  },
  container:{
    flex: 1,
    borderRadius:10,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width:0,height:0},
    shadowRadius: 10,
    elevation: 3,
    justifyContent:'center',
    alignItems: 'center'
  },
  tileN:{
    fontFamily: 'open-sans-b',
    color: 'white',
    fontSize: 22
  }
});

export default HomeGridTiles