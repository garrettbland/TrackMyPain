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
  Platform
} from 'react-native';

class RateMeds extends Component {

  static navigationOptions = ({ navigation }) => ({
      title: 'Choose Meds',
      headerRight: Platform.OS == 'ios' ? <Icon name={'ios-close-circle-outline'} size={30} color={'#c0392b'} style={{marginRight:8}} onPress={()=>{navigation.state.params.goBack()}}/> : null,
      headerLeft:null,
      tabBarLabel:'Rate',
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon name={focused ? 'ios-disc' : 'ios-disc-outline'} size={32} color={tintColor} />
      ),
      headerBackTitle:null,
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
        <Text>Medication list</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(RateMeds);
