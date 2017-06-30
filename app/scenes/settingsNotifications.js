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
  Platform,
} from 'react-native';

class SettingsNotifications extends Component {

  static navigationOptions = ({ navigation }) => ({
      title: 'Notifications',
      headerBackTitle:null,
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon name={focused ? 'ios-options' : 'ios-options-outline'} size={32} color={tintColor} />
      ),
      headerLeft: Platform.OS == 'ios' ? <Icon name={'ios-arrow-dropleft'} size={30} color={'rgb(14,122,254)'} style={{marginLeft:8}} onPress={()=>{navigation.state.params.goBack()}}/> : null,
      tabBarLabel:'Settings',
    });

    constructor(props) {
      super(props);
      this.state = {

      }
      this.goBack = this.goBack.bind(this)
    }

    componentDidMount() {
      this.props.navigation.setParams({ goBack: this.goBack });
    }

    goBack () {
      const backAction = NavigationActions.back({

      })
      this.props.navigation.dispatch(backAction)

    }

  render(){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>NOTIFICATIONS</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsNotifications);
