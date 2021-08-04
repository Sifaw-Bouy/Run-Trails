import React, {useState} from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import HomeNavigation from './navigation/HomeNavigation';

//for better performance
//enableScreens();//use the latest screen navigation for iOS and Andr

const fetchFonts = () =>{
  return Font.loadAsync({
    'open-sans-r': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-b': require('./assets/fonts/OpenSans-Bold.ttf')
  })
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  
  if(!fontLoaded){
    return (<AppLoading startAsync={fetchFonts} 
    onFinish={()=> setFontLoaded(true)}
    onError={(err) => console.log(err)}
    />);
  
  }
  return <HomeNavigation/>;
}
