import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import * as TaskManager from 'expo-task-manager'
const LOCATION_TASK = 'location-task';
export default function GetCoords() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.startLocationUpdatesAsync(LOCATION_TASK,{
        accuracy: LocationAccuracy.Highest
      });
      setLocation(location);
    })();
  }, []);
    TaskManager.defineTask(LOCATION_TASK, ({data, error}) =>{
    if(error){//error occurred
      return;
    }
    if(data){
      //do something with locations captured in the background
      //send to future database prehaps then plot into map
      //console.log(data["locations"][0]["coords"]["latitude"]);
      setLocation(data)
      console.log(JSON.stringify(data))
    }
  });
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View>
      <Text>{text}</Text>
    </View>
  );
}

// const GetCoords = props => {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }
//       let loc = await Location.startLocationUpdatesAsync(LOCATION_TASK,{
//         accuracy: LocationAccuracy.Highest,
//         // timeInterval:1000,
//         // distanceInterval:5
//       });
//       console.log("IN APP.js:1 "+loc)
//     })();
//   }, []);
//   TaskManager.defineTask(LOCATION_TASK, ({data, error}) =>{
//     if(error){//error occurred
//       return;
//     }
//     if(data){
//       //do something with locations captured in the background
//       //send to future database prehaps then plot into map
//       //console.log(data["locations"][0]["coords"]["latitude"]);
//       setLocation(data)
//       console.log(JSON.stringify(data))
//     }
//   });

//   let text = 'Waiting..';
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = JSON.stringify(location);
//   }
//   return(<Text>{text}</Text>)
// }
// export default GetCoords;