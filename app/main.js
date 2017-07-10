import React, {Component} from 'react';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from './actions';

//navigation
import { StackNavigator, TabNavigator, addNavigationHelpers } from 'react-navigation';

//npm packages
import Icon from 'react-native-vector-icons/Ionicons';

//Tab Scenes
import Rate from './scenes/rate';
import Stats from './scenes/stats';
import Meds from './scenes/meds';
import Settings from './scenes/settings';

//Stack scenes
import RateDetail from './scenes/rateDetail';
import RateMeds from './scenes/rateMeds';
import MedsAdd from './scenes/medsAdd';
import SettingsNotifications from './scenes/settingsNotifications';
import SettingsProfile from './scenes/settingsProfile';

class App extends Component {
  render(){
    return (
      <AppTab/>
    )
  }
}


const AppSettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings',
      headerBackTitle:null,
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon name={focused ? 'ios-options' : 'ios-options-outline'} size={32} color={focused ? '#3498db' : tintColor} />
      ),
      tabBarLabel:'Settings',
      headerTitleStyle:{fontWeight:'bold',fontSize:19,color:'#ffffff'},
      headerStyle:{backgroundColor:'#3498db',borderBottomWidth:0},
    }
  },
  SettingsNotifications: {
    screen: SettingsNotifications,
    navigationOptions:{
      title: 'Notifications',
      headerBackTitle:null,
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon name={focused ? 'ios-options' : 'ios-options-outline'} size={32} color={focused ? '#3498db' : tintColor} />
      ),
      tabBarLabel:'Settings',
      headerTitleStyle:{fontWeight:'bold',fontSize:19,color:'#ffffff'},
      headerStyle:{backgroundColor:'#3498db',borderBottomWidth:0},
    }
  },
  SettingsProfile: {
    screen: SettingsProfile,
    navigationOptions:{
      title: 'Profile',
      headerBackTitle:null,
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon name={focused ? 'ios-options' : 'ios-options-outline'} size={32} color={focused ? '#3498db' : tintColor} />
      ),
      tabBarLabel:'Settings',
      headerTitleStyle:{fontWeight:'bold',fontSize:19,color:'#ffffff'},
      headerStyle:{backgroundColor:'#3498db',borderBottomWidth:0},
    }
  }
},{
  mode:'card',
  headerMode:'float',
})

const AppRateStack = StackNavigator({
  Rate: {
    screen: Rate,
    navigationOptions:{
      headerBackTitle:null,
      tabBarLabel:'Rate',
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon name={focused ? 'ios-disc' : 'ios-disc-outline'} size={32} color={focused ? '#3498db' : tintColor} />
      ),
      header:false
    }
  },
  RateDetail: {
    screen: RateDetail,
    navigationOptions:{
      title: 'Rate',
      headerBackTitle:null,
      headerTitleStyle:{fontWeight:'bold',fontSize:19},
      tabBarLabel:'Rate',
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon name={focused ? 'ios-disc' : 'ios-disc-outline'} size={32} color={focused ? '#3498db' : tintColor} />
      ),
      headerStyle:{backgroundColor:'#ffffff'},
    }
  },
  RateMeds: {
    screen: RateMeds,
    navigationOptions:{
      title: 'Choose Meds',
      tabBarLabel:'Rate',
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon name={focused ? 'ios-disc' : 'ios-disc-outline'} size={32} color={focused ? '#3498db' : tintColor} />
      ),
      headerBackTitle:null,
      headerTitleStyle:{fontWeight:'bold',fontSize:19},
      headerStyle:{backgroundColor:'#ffffff'},
    }
  },
},{
  mode:'modal',
  headerMode:'screen',
})

const AppStatsStack = StackNavigator({
  Stats: {
    screen: Stats,
    navigationOptions:{
      title: 'Statistics',
      headerBackTitle:null,
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon name={focused ? 'ios-stats' : 'ios-stats-outline'} size={32} color={focused ? '#3498db' : tintColor} />
      ),
      tabBarLabel:'Stats',
      headerTitleStyle:{fontWeight:'bold',fontSize:19,color:'#ffffff'},
      headerStyle:{backgroundColor:'#3498db',borderBottomWidth:0}
    }
  },
},{
  mode:'card',
  headerMode:'float',
})

const AppMedsStack = StackNavigator({
  Meds: {
    screen: Meds,
    navigationOptions:{
      title:'Medications',
      headerBackTitle:null,
      headerTitleStyle:{fontWeight:'bold',fontSize:19,color:'#ffffff'},
      headerStyle:{backgroundColor:'#3498db',borderBottomWidth:0},
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon name={focused ? 'ios-medkit' : 'ios-medkit-outline'} size={32} color={focused ? '#3498db' : tintColor} />
      ),
      tabBarLabel:'Meds',
    }
  },
  MedsAdd: {
    screen: MedsAdd,
    navigationOptions:{
      title:'Medication',
      headerBackTitle:null,
      tabBarLabel:'Meds',
      gesturesEnabled: false,
      headerTitleStyle:{fontWeight:'bold',fontSize:19,color:'#000000'},
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon name={focused ? 'ios-medkit' : 'ios-medkit-outline'} size={32} color={focused ? '#3498db' : tintColor} />
      ),
      headerStyle:{backgroundColor:'#ffffff'},
    }
  }
},{
  mode:'modal',
  headerMode:'screen',
})

const AppTab = TabNavigator({
  RateStack: { screen: AppRateStack },
  StatsStack: { screen: AppStatsStack },
  MedsStack: { screen: AppMedsStack },
  SettingsStack: { screen: AppSettingsStack },
},{
  initialRouteName:'RateStack',
  tabBarOptions: {
    tabStyle: {

    },
    style:{
      backgroundColor:'#F1F1F1',
      borderTopWidth:0,
    }
  },
});


function mapStateToProps(state){
  return {
    user:state.userReducers.user,
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
