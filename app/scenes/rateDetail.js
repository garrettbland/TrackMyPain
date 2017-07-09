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
} from 'react-native';

const navigateAction = NavigationActions.navigate({

  routeName: 'RateMeds',

  params: {},

  action: NavigationActions.navigate({ routeName: 'RateMeds'})
})

class RateDetail extends Component {

  static navigationOptions = ({ navigation }) => ({
      headerLeft: Platform.OS == 'ios' ? <Icon name={'md-close'} size={32} color={'#c0392b'} style={{marginLeft:10}} onPress={()=>{navigation.state.params.goBack()}}/> : null,
      headerRight: Platform.OS == 'ios' ? <Icon name={'md-checkmark'} size={32} color={'#27ae60'} style={{marginRight:10}} onPress={()=>{navigation.state.params.goBack()}}/> : null,
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
        <Text>Rate Detail</Text>
        <Text>Pain Level:</Text>
        <Button title='Add Meds' onPress={()=>this.props.navigation.dispatch(navigateAction)}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(RateDetail);
