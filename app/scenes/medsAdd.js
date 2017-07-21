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
import firebaseApp from '../components/firebaseApp';
import FormInput from '../components/formInput';
import CustomAlert from '../components/alert';

import {
  View,
  Text,
  Platform,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Alert
} from 'react-native';


class MedsAdd extends Component {

  static navigationOptions = ({ navigation }) => ({
      headerLeft: <TouchableOpacity style={{marginLeft:10,width:60}} onPress={()=>{navigation.state.params.goBack()}}><Icon name={'md-close'} size={32} color={'#c0392b'}/></TouchableOpacity>,
      headerRight: <TouchableOpacity style={{marginRight:10}} onPress={()=>{navigation.state.params.addMed()}}><Icon name={'md-checkmark'} size={32} color={'#27ae60'} /></TouchableOpacity>,
    });

    constructor(props) {
      super(props);
      this.state = {
        name:'',
        amount:'',
        errorColorName:'#bdc3c7',
        errorColorAmount:'#bdc3c7',
        editMed:false,
      }
      this.goBack = this.goBack.bind(this);
      this.addMed = this.addMed.bind(this);
    }

    componentDidMount() {
      this.props.navigation.setParams({ goBack: this.goBack, addMed: this.addMed });
      if(this.props.user.medicationName !== null){
        this.setState({
          editMed:true,
          name:this.props.user.medicationName,
          amount:this.props.user.medicationAmount
        })
      }
    }


    goBack(unset){
      Keyboard.dismiss();
      const backAction = NavigationActions.back({

      })
      this.props.navigation.dispatch(backAction)
      if(unset){
        //edit or add meds don't mess with redux

      }else{
        //cancel button is pressed
        this.props.editMeds();
      }
    }

    editMed(){
      if(!this.state.name || !this.state.amount){
        this.setState({errorColorName:'#e74c3c',errorColorAmount:'#e74c3c',showError:true});
      }else{
        var medID = this.props.user.medID;
        this.medsRef = firebaseApp.database().ref('users/123456789/meds/').child(medID);
        var editMedData = {name:this.state.name,amount:this.state.amount}
        this.medsRef.update(editMedData, function(error){
          if(error){
            Alert.alert('Error','Something technical went wrong. Please try again');
          }
        });
        this.props.showMessageMeds(true,'Success', 'Medication ' + this.state.name +' was successfully modified','#2ecc71');
        console.log(this.props);
        this.goBack({unset:true});
      }
    }

    addMed(){
      if(this.props.user.medID){
        this.editMed();
      }else if(!this.state.name || !this.state.amount){
        this.props.showMessageMeds(true,'Error', 'All fields must be completed','#e74c3c');
      }else if(this.state.name && this.state.amount){
        var newMedID = Date.now();
        this.medsRef = firebaseApp.database().ref('users/123456789/meds/').child(newMedID);
        var newMedData = {name:this.state.name,amount:this.state.amount}
        this.medsRef.set(newMedData, function(error){
          if(error){
            Alert.alert('Error','Something technical went wrong. Please try again');
          }
        });
        this.props.showMessageMeds(true,'Success', this.state.name + ' was added successfully','#2ecc71');
        this.goBack({unset:true});
      }
    }

  render(){
    return(
      <View style={{flex:1}}>
          {this.props.user.showMessageMed &&
            <CustomAlert title={this.props.user.alertTitle} message={this.props.user.alertText} backgroundColor={this.props.user.alertColor} animation={'fadeInDown'}/>
          }
        <View style={{padding:12}}>
          <FormInput underlineColor={'#bdc3c7'} label={'Medication Name'} placeholder={''} onChangeText={(text) => this.setState({name:text})} autoFocus={true} value={this.state.name}/>
          <FormInput underlineColor={'#bdc3c7'} label={'Amount'} placeholder={''} onChangeText={(text) => this.setState({amount:text})} autoFocus={false} value={this.state.amount}/>
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
