import React, {Component} from 'react';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

//navigation
import { NavigationActions } from 'react-navigation';

//npm packages
import Icon from 'react-native-vector-icons/Ionicons';

//components
import SettingsButton from '../components/settingsButton';

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
    });

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <View style={{flex:1}}>
        <ScrollView>
          <View style={{marginTop:12}}>
            <SettingsButton title={'Notifications'} icon={'ios-arrow-dropright'} route={'SettingsNotifications'} navigation={this.props.navigation} />
            <SettingsButton title={'Profile'} icon={'ios-arrow-dropright'} route={'SettingsProfile'} navigation={this.props.navigation} />
          </View>
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(state){
  return {
    user:state.userReducers.user,
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
