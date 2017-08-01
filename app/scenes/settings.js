import React, {Component} from 'react';

//navigation
import { NavigationActions } from 'react-navigation';

//npm packages
import Icon from 'react-native-vector-icons/Ionicons';

//components
import SettingsButton from '../components/settingsButton';

//config
import Config from '../config';

import {
  View,
  Text,
  Button,
  ScrollView,
} from 'react-native';

class Settings extends Component {



  render(){
    return(
      <View style={{flex:1}}>
        <ScrollView>
          <View style={{marginTop:12}}>
            <SettingsButton title={'Notifications'} top={true} bottom={false} icon={'ios-arrow-forward'} iconLeft={'md-notifications'} route={'SettingsNotifications'} navigation={this.props.navigation} />
            <SettingsButton title={'Profile'} top={true} bottom={false} icon={'ios-arrow-forward'} iconLeft={'md-person'} route={'SettingsProfile'} navigation={this.props.navigation} />
            <SettingsButton title={'Theme'} top={true} bottom={true} icon={'ios-arrow-forward'} iconLeft={'md-color-palette'} route={'SettingsProfile'} navigation={this.props.navigation} />
          </View>
          <View style={{alignItems:'center',marginTop:12}}>
            <Text style={{color:'#3F3F3F',fontSize:12}}>Version {Config.VERSION}</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default Settings
