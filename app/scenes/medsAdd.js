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
      headerLeft: <TouchableOpacity style={{marginLeft:10,width:60}} onPress={()=>{navigation.state.params.goBack()}}><Icon name={'md-close'} size={32} color={'#c0392b'}/></TouchableOpacity>,
      headerRight: <TouchableOpacity style={{marginRight:10}} onPress={()=>{navigation.state.params.goBack()}}><Icon name={'md-checkmark'} size={32} color={'#27ae60'} /></TouchableOpacity>,
    });

    constructor(props) {
      super(props);
      this.state = {
        name:'',
        amount:'',
      }
      this.goBack = this.goBack.bind(this)
    }

    componentDidMount() {
      this.props.navigation.setParams({ goBack: this.goBack });
      if(this.props.user.medicationName !== null){
        this.setState({
          name:this.props.user.medicationName,
          amount:this.props.user.medicationAmount
        })
      }
    }


    goBack () {
      Keyboard.dismiss();
      const backAction = NavigationActions.back({

      })
      this.props.navigation.dispatch(backAction)
      //unset redux meds props
      this.props.editMeds();
    }

  render(){
    return(
      <View style={{flex:1}}>
        <View style={{padding:12}}>
          <FormInput label={'Medication Name'} placeholder={''} onChangeText={(text) => this.setState({name:text})} autoFocus={true} value={this.state.name}/>
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
