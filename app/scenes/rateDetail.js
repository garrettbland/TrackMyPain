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
      title: 'Rate',
      headerBackTitle:null,
      headerLeft: Platform.OS == 'ios' ? <Icon name={'ios-arrow-dropdown'} size={30} color={'rgb(14,122,254)'} style={{marginLeft:8}} onPress={()=>{navigation.state.params.goBack()}}/> : null,
      headerRight: Platform.OS == 'ios' ? <Icon name={'ios-checkmark-circle-outline'} size={30} color={'#27ae60'} style={{marginRight:8}} onPress={()=>{navigation.state.params.goBack()}}/> : null,
      tabBarLabel:'Rate',
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon name={focused ? 'ios-disc' : 'ios-disc-outline'} size={32} color={tintColor} />
      ),
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
    const { params } = this.props.navigation.state;
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
