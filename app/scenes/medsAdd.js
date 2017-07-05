import React, {Component} from 'react';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

//navigation
import { NavigationActions } from 'react-navigation';

//npm packages
import Icon from 'react-native-vector-icons/Ionicons';

//components
import FormInput from '../components/formInput';

import {
  View,
  Text,
  Platform,
  TextInput,
  Keyboard,
  TouchableOpacity
} from 'react-native';

class MedsAdd extends Component {

  static navigationOptions = ({ navigation }) => ({
      title: 'Add Meds',
      headerLeft: <TouchableOpacity onPress={()=>{navigation.state.params.goBack()}}><Icon name={'ios-close-circle-outline'} size={38} color={'#c0392b'} style={{marginLeft:10}}/></TouchableOpacity>,
      headerRight: <TouchableOpacity onPress={()=>{navigation.state.params.goBack()}}><Icon name={'ios-checkmark-circle-outline'} size={38} color={'#27ae60'} style={{marginRight:10}}/></TouchableOpacity>,
      headerBackTitle:null,
      tabBarLabel:'Meds',
      gesturesEnabled: false,
      headerTitleStyle:{fontWeight:'bold',fontSize:19,color:'#000000'},
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon name={focused ? 'ios-medkit' : 'ios-medkit-outline'} size={32} color={tintColor} />
      ),
      headerStyle:{backgroundColor:'#ffffff'},
    });

    constructor(props) {
      super(props);
      this.state = {
        text:'',
        amount:'',
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
      <View style={{flex:1}}>
        <View style={{padding:12}}>
          <FormInput label={'Medication Name'} placeholder={''} onChangeText={(text) => this.setState({text:text})} autoFocus={true} value={this.state.text}/>
          <FormInput label={'Amount'} placeholder={''} onChangeText={(text) => this.setState({amount:text})} autoFocus={false} value={this.state.amount}/>
        </View>
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
