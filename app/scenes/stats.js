import React, {Component} from 'react';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

//npm packages
import Icon from 'react-native-vector-icons/Ionicons';

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

class Stats extends Component {

  static navigationOptions = ({ navigation }) => ({
      headerRight: <TouchableOpacity style={{marginRight:10}} onPress={()=>{navigation.state.params.addMed()}}><Icon name={'md-calendar'} size={32} color={'#ffffff'}/></TouchableOpacity>,
    });

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>STATS</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
