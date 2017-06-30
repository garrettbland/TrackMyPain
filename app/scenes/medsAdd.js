import React, {Component} from 'react';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

import {
  View,
  Text,
} from 'react-native';

class MedsAdd extends Component {

  static navigationOptions = ({ navigation }) => ({
      title: 'Add Meds',
      headerBackTitle:null,
    });

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <View style={{backgroundColor:'blue'}}>
        <Text>Add Meds</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedsAdd);
