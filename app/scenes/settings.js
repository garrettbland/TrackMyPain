import React, {Component} from 'react';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

//navigation
import { NavigationActions } from 'react-navigation';

//npm packages
import Icon from 'react-native-vector-icons/Ionicons';

import {
  View,
  Text,
  Button
} from 'react-native';

const navigateAction = NavigationActions.navigate({

  routeName: 'SettingsNotifications',

  params: {},

  action: NavigationActions.navigate({ routeName: 'SettingsNotifications'})
})

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
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>SETTINGS</Text>
        <Button title='Notifications' onPress={()=>this.props.navigation.dispatch(navigateAction)}/>
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
