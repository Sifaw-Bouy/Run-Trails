import { Platform } from 'react-native';
import { createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import AddTrailScreen from '../screens/AddTrailScreen';
import SearchTrailScreen from '../screens/SearchTrailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Colors from '../constants/Colors';
import {createAppContainer} from 'react-navigation';


const HomeNavigation = createStackNavigator({
  'Home': HomeScreen,
  'Add Trail':AddTrailScreen,
  'Recent Trails':SearchTrailScreen,
  'Settings':SettingsScreen
},{defaultNavigationOptions:{
  headerStyle:{
    backgroundColor : Platform.OS === 'android' ? Colors.primC : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primC
}});

export default createAppContainer(HomeNavigation);