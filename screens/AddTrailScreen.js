import React, {useState, useEffect}from 'react';
import {View, Text,StyleSheet,Button, PermissionsAndroid, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import MapView, {Polyline, Marker, AnimatedRegion} from 'react-native-maps';
import MapStyle from '../constants/MapStyle';

const LOCATION_TSK= 'location-task'
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
const renderItems = (location) =>{
  return (
    <View key={location["locations"][0]["timestamp"]}>
      <Text>
        LOCATION: {JSON.stringify(location["locations"])}
       </Text>
    </View>
  )
}
const AddTrailScreen = props =>{
  //can use props.navigation.getParam('name of param') to use the passed
  //in paramters from Homescreen

  //Start trail will exutcte geolocation tracking
  //stop trail stops the geolocation and marks the end
  // of trail
  const curCoords= props.navigation.getParam('coord');//TODO fix if null value
  
  //console.log(curCoords.coords["latitude"]);
  const locStatus ={latitude:null,longitude:null};//holds lat and long values
  const [location, setLocation] = useState([]);//send to database
  const [latLong, setLatLong] = useState([])//use to plot in the map
  const [errorMsg, setErrorMsg] = useState(null);
  const [isTrack,setIsTrack] = useState(false);
  useEffect(() => {
      if(!isTrack) return;
      (async () => {
        let servEnable= await Location.hasServicesEnabledAsync();
        console.log(servEnable)
        if(!servEnable){
          getPermisson();
          setIsTrack(false);
        }
        let { status } = await Location.requestBackgroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
      
        await Location.startLocationUpdatesAsync(LOCATION_TSK,{
          accuracy: Location.Accuracy.Highest,
          distanceInterval:5,
          foregroundService: {
            notificationTitle: 'Using your location',
            notificationBody: 'To turn off, go back to the app and end trail.',
          },
        });
        
      })();
  }, [isTrack]);
  TaskManager.defineTask(LOCATION_TSK, ({data, error}) =>{
    if(error){//error occurred
      return;
    }
    if(data){
      //do something with locations captured in the background
      //send to future database prehaps then plot into map
      //console.log(data["locations"][0]["coords"]["latitude"]);
      // let lat = data["locations"][0]["coords"]["latitude"];
      // let long = data["locations"][0]["coords"]["longitude"];

      locStatus.latitude=data["locations"][0]["coords"]["latitude"];
      locStatus.longitude=data["locations"][0]["coords"]["longitude"];
      setLatLong([...latLong,locStatus]);//for ploting
      setLocation([...location,data]);//for database
    }
  });
  
  const stopTracking = () =>{
    setLatLong([]);
    setLocation([]);
    Location.stopLocationUpdatesAsync(LOCATION_TSK,{})//stop getting location
  }
  console.log(JSON.stringify(latLong))
  return(
  <View style={styles.screen}>
    <View style={styles.mapS}>
    <MapView style={styles.map} customMapStyle={MapStyle.mapStyle} 
    initialRegion={{latitude:curCoords.coords["latitude"], longitude:curCoords.coords["longitude"], 
    latitudeDelta:0.005,longitudeDelta:0.005}}>
    <Marker coordinate={{latitude:curCoords.coords["latitude"],
    longitude:curCoords.coords["longitude"]}} 
    pinColor="green"/>
      <Polyline
          coordinates={latLong}
          strokeColor="#00730f" // fallback for when `strokeColors` is not supported by the map-provider
          strokeWidth={4}
        />
    </MapView>
    </View>
    <View style={styles.buttonS}>
    <Button title={isTrack ? 'Stop Trail' : 'Start Trail'}
    onPress={()=> {setIsTrack(!isTrack)}}/>
    </View>
    <View>
      <Button title="End Trail" onPress={stopTracking}/>
    </View>
    <Text>{granted}</Text>
    <ScrollView>
    {location.map((loc)=>{
      return (
        <View key={loc["locations"][0]["timestamp"]}>
          <Text>
            LOCATION: {JSON.stringify(loc)}
           </Text>
        </View>
      )
    })}
    </ScrollView>
  </View>
  )
  };
const styles = StyleSheet.create({
  screen:{
    flex: 1,
    paddingTop:20,
    alignItems: 'center'
  },
  buttonS:{
    padding:10,
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

export default AddTrailScreen;