import React, {Component} from 'react';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from './actions';

//navigation
import { StackNavigator, TabNavigator, addNavigationHelpers } from 'react-navigation';

//npm packages
import Icon from 'react-native-vector-icons/FontAwesome';

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
  },
  SettingsNotifications: {
    screen: SettingsNotifications,
  },
  SettingsProfile: {
    screen: SettingsProfile,
  }
},{
  mode:'card',
  headerMode:'float',
})

const AppRateStack = StackNavigator({
  Rate: {
    screen: Rate,
  },
  RateDetail: {
    screen: RateDetail
  },
  RateMeds: {
    screen: RateMeds
  },
},{
  mode:'modal',
  headerMode:'screen',
})

const AppStatsStack = StackNavigator({
  Stats: {
    screen: Stats,
    navigationOptions:{
      title:'Statistics'
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
      title:'Medications'
    }
  },
  MedsAdd: {
    screen: MedsAdd,
    navigationOptions:{
      title:'Add Medications'
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
