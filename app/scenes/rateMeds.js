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
  Button
} from 'react-native';

class RateMeds extends Component {


  static navigationOptions = ({ navigation }) => {
      return {
        title: 'Choose Meds',
        headerLeft: Platform.OS == 'ios' ? <Icon name={'ios-close-circle-outline'} size={38} color={'#c0392b'} style={{marginLeft:8}} onPress={()=>{navigation.state.params.goBack()}}/> : null,
        headerRight: Platform.OS == 'ios' ? <Icon name={'ios-checkmark-circle-outline'} size={38} color={'#27ae60'} style={{marginRight:8}} onPress={()=>{navigation.state.params.goBack()}}/> : null,
        tabBarLabel:'Rate',
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name={focused ? 'ios-disc' : 'ios-disc-outline'} size={32} color={tintColor} />
        ),
        headerBackTitle:null,
        headerTitleStyle:{fontWeight:'bold',fontSize:19},
      };
    };

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
