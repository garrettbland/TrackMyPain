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

class RateMeds extends Component {


  static navigationOptions = ({ navigation }) => ({
        headerLeft: Platform.OS == 'ios' ? <TouchableOpacity style={{marginLeft:10,width:60}} onPress={()=>{navigation.state.params.goBack()}}><Icon name={'md-close'} size={32} color={'#c0392b'}/></TouchableOpacity> : null,
        headerRight: Platform.OS == 'ios' ? <TouchableOpacity style={{marginRight:10,}} onPress={()=>{navigation.state.params.goBack()}}><Icon name={'md-checkmark'} size={32} color={'#27ae60'}/></TouchableOpacity> : null,
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
        <Button title="CHANGE PROPS" onPress={()=>this.props.addMeds({test:true})}/>
        {this.props.user.test &&
          <Text>Oh hey redux works</Text>
        }
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
