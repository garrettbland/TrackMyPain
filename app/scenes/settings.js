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

  static navigationOptions = ({ navigation }) => ({
      title: 'Settings',
      headerBackTitle:null,
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon name={focused ? 'ios-options' : 'ios-options-outline'} size={32} color={tintColor} />
      ),
      tabBarLabel:'Settings',
      headerTitleStyle:{fontWeight:'bold',fontSize:19,color:'#ffffff'},
      headerStyle:{backgroundColor:'#3498db',borderBottomWidth:0},
    });

  render(){
    return(
      <View style={{flex:1}}>
        <ScrollView>
          <View style={{marginTop:12}}>
            <SettingsButton title={'Notifications'} icon={'ios-arrow-forward'} route={'SettingsNotifications'} navigation={this.props.navigation} />
            <SettingsButton title={'Profile'} icon={'ios-arrow-forward'} route={'SettingsProfile'} navigation={this.props.navigation} />
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
