import React, { useEffect } from 'react';
import {View, Text,StyleSheet,Platform , Button , FlatList, TouchableOpacity,PermissionsAndroid} from 'react-native';
import AppLoading from 'expo-app-loading';
import { HOMENAV } from '../data/test-data';
import Colors from '../constants/Colors';
import HomeGridTiles from '../components/HomeGridTiles';
import * as Location from 'expo-location';
let granted;
const getPermisson = async() =>{
  try{
    if(granted!=="granted"){
      granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title:"Track location",
          message:"Please enable location on the device",
          buttonPositive:"Ok",
          buttonNegative:"Cancel"
        }
      );
    }
    if(granted !== PermissionsAndroid.RESULTS.GRANTED){
      console.log("Permission denied")
    }
  
  } catch(err){console.warn(err)}
}
const HomeScreen = props =>{

  //get user to turn location 
  //get current location coords and pass them into Add trail screen to
  //be used to render mapview
  const locStatus ={coords:null};//holds lat and long values
  const renderGrid = itemdata => {
    //passign the data needed
    return <HomeGridTiles 
    title={itemdata.item.title} 
    color={itemdata.item.color}
    onSelect={
      ()=>{
        switch(itemdata.item.id){
          case 'addT':
            props.navigation.navigate(
              {routeName: 'Add Trail', params:{coord: locStatus.coords}});
              //can pass in params:{ name_param: val_parm} to be used in the next screen
            break;
          case 'recentT':
            props.navigation.navigate(
              {routeName: 'Recent Trails'});
            break;
          case 'sett':
            props.navigation.navigate(
              {routeName: 'Settings'});
            break;
        }
      }
    }/>
  };
  useEffect(()=>{
    (async()=>{
      let servEnable= await Location.hasServicesEnabledAsync();
        console.log(servEnable)
        if(!servEnable){
          getPermisson();
        }else{
          let coords=  await Location.getCurrentPositionAsync({
            accuracy:Location.Accuracy.Highest
          });
          locStatus.coords= coords;
          console.log(JSON.stringify(coords));

        }
    })();
  },[]);
return(
  <FlatList keyExtr = {(item,index) => item.id}
  data ={HOMENAV} 
  renderItem={renderGrid} 
  numColumns={2}/>
)
};

const styles = StyleSheet.create({
  screen:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

});

export default HomeScreen;