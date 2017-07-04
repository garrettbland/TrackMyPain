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
  Button,
  TouchableOpacity,
} from 'react-native';

const navigateAction = NavigationActions.navigate({

  routeName: 'MedsAdd',

  params: {},

  action: NavigationActions.navigate({ routeName: 'MedsAdd'})
})

class Meds extends Component {

  static navigationOptions = ({ navigation }) => ({
      title: 'Meds',
      headerBackTitle:null,
      headerTitleStyle:{fontWeight:'bold',fontSize:19,color:'#ffffff'},
      headerStyle:{backgroundColor:'#3498db',borderBottomWidth:0},
      headerRight: <TouchableOpacity onPress={()=>navigation.dispatch(navigateAction)}><Icon name={'ios-add-circle-outline'} size={38} color={'#ffffff'} style={{marginRight:8}}/></TouchableOpacity>,
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon name={focused ? 'ios-medkit' : 'ios-medkit-outline'} size={32} color={tintColor} />
      ),
      tabBarLabel:'Meds',
    });

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>MEDS</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Meds);
