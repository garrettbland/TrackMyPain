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
  TextInput,
  Keyboard,
} from 'react-native';

class MedsAdd extends Component {

  static navigationOptions = ({ navigation }) => ({
      title: 'Add Meds',
      headerLeft: Platform.OS == 'ios' ? <Icon name={'ios-close-circle-outline'} size={38} color={'#c0392b'} style={{marginLeft:8}} onPress={()=>{navigation.state.params.goBack()}}/> : null,
      headerRight: Platform.OS == 'ios' ? <Icon name={'ios-checkmark-circle-outline'} size={38} color={'#27ae60'} style={{marginRight:8}} onPress={()=>{navigation.state.params.goBack()}}/> : null,
      headerBackTitle:null,
      tabBarLabel:'Meds',
      gesturesEnabled: false,
      headerTitleStyle:{fontWeight:'bold',fontSize:19},
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon name={focused ? 'ios-medkit' : 'ios-medkit-outline'} size={32} color={tintColor} />
      ),
    });

    constructor(props) {
      super(props);
      this.state = {
        text:''
      }
      this.goBack = this.goBack.bind(this)
    }

    componentDidMount() {
      this.props.navigation.setParams({ goBack: this.goBack });
    }

    goBack () {
      Keyboard.dismiss();
      const backAction = NavigationActions.back({

      })
      this.props.navigation.dispatch(backAction)

    }

  render(){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>Add Meds</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          autoFocus={true}
        />
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
