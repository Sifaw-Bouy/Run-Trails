import React, { useEffect } from 'react';
import {View, Text,StyleSheet,Platform , Button , FlatList, TouchableOpacity,PermissionsAndroid} from 'react-native';
import AppLoading from 'expo-app-loading';
import { HOMENAV } from '../data/test-data';
import Colors from '../constants/Colors';
import HomeGridTiles from '../components/HomeGridTiles';

const HomeScreen = props =>{
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
              {routeName: 'Add Trail'});
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