import React, {Component} from 'react';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

//navigation
import { NavigationActions } from 'react-navigation';

//npm packages
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

//components
import Button from '../components/button';
import Number from '../components/number';
import Modal from '../components/modal';
import NewUserModal from '../components/newUserModal';

import {
  View,
  Text,
  Dimensions,
  Alert,
  AsyncStorage,
} from 'react-native';

class Rate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pain:0,
      pain1:'#ffffff',
      pain2:'#ffffff',
      pain3:'#ffffff',
      pain4:'#ffffff',
      pain5:'#ffffff',
      pain6:'#ffffff',
      pain7:'#ffffff',
      pain8:'#ffffff',
      pain9:'#ffffff',
      pain10:'#ffffff',
    }

  }

  componentWillMount(){
    //see if notifications are enabled
    AsyncStorage.getItem("test").then((value) => {
      if(value == null){
        this.setState({newUserModal:true})
      }else{

      }
    }).done();
  }

  rateDetailRoute(){
    const navigateAction = NavigationActions.navigate({
      action: NavigationActions.navigate({ routeName: 'RateDetail'})
    });
    this.props.navigation.dispatch(navigateAction);
    var dColor = '#ffffff';
    this.setState({pain:0,pain1:dColor,pain2:dColor,pain3:dColor,pain4:dColor,pain5:dColor,pain6:dColor,pain7:dColor,pain8:dColor,pain9:dColor,pain10:dColor})
  }

  setPainLevel(pain,color){
    var dColor = '#ffffff';
    this.props.setPain(pain,color);
    switch(pain){
      case 1:
        this.setState({pain1:color,pain2:dColor,pain3:dColor,pain4:dColor,pain5:dColor,pain6:dColor,pain7:dColor,pain8:dColor,pain9:dColor,pain10:dColor})
        break
      case 2:
        this.setState({pain1:dColor,pain2:color,pain3:dColor,pain4:dColor,pain5:dColor,pain6:dColor,pain7:dColor,pain8:dColor,pain9:dColor,pain10:dColor})
        break
      case 3:
        this.setState({pain1:dColor,pain2:dColor,pain3:color,pain4:dColor,pain5:dColor,pain6:dColor,pain7:dColor,pain8:dColor,pain9:dColor,pain10:dColor})
        break
      case 4:
        this.setState({pain1:dColor,pain2:dColor,pain3:dColor,pain4:color,pain5:dColor,pain6:dColor,pain7:dColor,pain8:dColor,pain9:dColor,pain10:dColor})
        break
      case 5:
        this.setState({pain1:dColor,pain2:dColor,pain3:dColor,pain4:dColor,pain5:color,pain6:dColor,pain7:dColor,pain8:dColor,pain9:dColor,pain10:dColor})
        break
      case 6:
        this.setState({pain1:dColor,pain2:dColor,pain3:dColor,pain4:dColor,pain5:dColor,pain6:color,pain7:dColor,pain8:dColor,pain9:dColor,pain10:dColor})
        break
      case 7:
        this.setState({pain1:dColor,pain2:dColor,pain3:dColor,pain4:dColor,pain5:dColor,pain6:dColor,pain7:color,pain8:dColor,pain9:dColor,pain10:dColor})
        break
      case 8:
        this.setState({pain1:dColor,pain2:dColor,pain3:dColor,pain4:dColor,pain5:dColor,pain6:dColor,pain7:dColor,pain8:color,pain9:dColor,pain10:dColor})
        break
      case 9:
        this.setState({pain1:dColor,pain2:dColor,pain3:dColor,pain4:dColor,pain5:dColor,pain6:dColor,pain7:dColor,pain8:dColor,pain9:color,pain10:dColor})
        break
      case 10:
        this.setState({pain1:dColor,pain2:dColor,pain3:dColor,pain4:dColor,pain5:dColor,pain6:dColor,pain7:dColor,pain8:dColor,pain9:dColor,pain10:color})
        break
      default:
        this.setState({pain1:dColor,pain2:dColor,pain3:dColor,pain4:dColor,pain5:dColor,pain6:dColor,pain7:dColor,pain8:dColor,pain9:dColor,pain10:dColor})
      }

    this.setState({
      pain:pain,
    })

  }

  render(){
    return(
      <View style={{flex:1,backgroundColor:'#F1F1F1',zIndex:1,}}>
        <View style={{height:20,backgroundColor:'#3498db',position:'absolute',zIndex:9,width:'100%'}}></View>
      {this.props.user.showModal &&
        <Modal icon={'md-checkmark-circle'} iconColor={'#2ecc71'} title={'Success'} body={'Your rate was saved successfully'} />
      }
      {this.state.newUserModal &&
        <NewUserModal icon={'md-checkmark-circle'} iconColor={'#2ecc71'} title={'Hello!'} body={'Welcome new user'} />
      }
        <View style={{marginTop:25,zIndex:1,}}>
          <View style={{height:'20%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Number number={1} backgroundColor={this.state.pain1} fontColor={this.state.pain1 !== '#ffffff' ? '#ffffff' : '#2c3e50'} color={'#019875'} callback={(pain,color) => this.setPainLevel(pain,color)}/>
            <Number number={2} backgroundColor={this.state.pain2} fontColor={this.state.pain2 !== '#ffffff' ? '#ffffff' : '#2c3e50'} color={'#00C853'} callback={(pain,color) => this.setPainLevel(pain,color)}/>
            <Number number={3} backgroundColor={this.state.pain3} fontColor={this.state.pain3 !== '#ffffff' ? '#ffffff' : '#2c3e50'} color={'#64DD17'} callback={(pain,color) => this.setPainLevel(pain,color)}/>
          </View>
          <View style={{height:'20%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Number number={4} backgroundColor={this.state.pain4} fontColor={this.state.pain4 !== '#ffffff' ? '#ffffff' : '#2c3e50'} color={'#AEEA00'} callback={(pain,color) => this.setPainLevel(pain,color)}/>
            <Number number={5} backgroundColor={this.state.pain5} fontColor={this.state.pain5 !== '#ffffff' ? '#ffffff' : '#2c3e50'} color={'#FFD600'} callback={(pain,color) => this.setPainLevel(pain,color)}/>
            <Number number={6} backgroundColor={this.state.pain6} fontColor={this.state.pain6 !== '#ffffff' ? '#ffffff' : '#2c3e50'} color={'#FFAB00'} callback={(pain,color) => this.setPainLevel(pain,color)}/>
          </View>
          <View style={{height:'20%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Number number={7} backgroundColor={this.state.pain7} fontColor={this.state.pain7 !== '#ffffff' ? '#ffffff' : '#2c3e50'} color={'#FF6D00'} callback={(pain,color) => this.setPainLevel(pain,color)}/>
            <Number number={8} backgroundColor={this.state.pain8} fontColor={this.state.pain8 !== '#ffffff' ? '#ffffff' : '#2c3e50'} color={'#E65100'} callback={(pain,color) => this.setPainLevel(pain,color)}/>
            <Number number={9} backgroundColor={this.state.pain9} fontColor={this.state.pain9 !== '#ffffff' ? '#ffffff' : '#2c3e50'} color={'#DD2C00'} callback={(pain,color) => this.setPainLevel(pain,color)}/>
          </View>
          <View style={{height:'20%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <View>
            </View>
            <Number number={10} backgroundColor={this.state.pain10} fontColor={this.state.pain10 !== '#ffffff' ? '#ffffff' : '#2c3e50'} color={'#b71c1c'} callback={(pain,color) => this.setPainLevel(pain,color)}/>
            <View>
            </View>
          </View>
          <View style={{height:'20%',justifyContent:'center'}}>
            <Button title={'Rate'} backgroundColor={'#3498db'} titleColor={'#ffffff'} onPress={() => this.rateDetailRoute()}/>
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Rate);
