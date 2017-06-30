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

  routeName: 'RateDetail',

  params: {rate:6},

  action: NavigationActions.navigate({ routeName: 'RateDetail'})
})

class Rate extends Component {

  static navigationOptions = ({ navigation }) => ({
      headerBackTitle:null,
      tabBarLabel:'Rate',
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon name={focused ? 'ios-disc' : 'ios-disc-outline'} size={32} color={tintColor} />
      ),
      header:false
    });

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>RATE PAIN</Text>
        <Button title='Rate' onPress={()=>this.props.navigation.dispatch(navigateAction)}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Rate);
