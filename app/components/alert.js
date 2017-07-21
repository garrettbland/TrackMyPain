import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

//npm packages
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';


class Alert extends Component {

  render(){
    return(
      <Animatable.View animation={this.props.animation} style={{paddingLeft:12,paddingTop:12,paddingRight:12,backgroundColor:this.props.user.alertColor}}>
        <View style={{width:'100%',minHeight:50,marginBottom:12,overflow:'hidden',justifyContent:'center',}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',}}>
            <View style={{flexDirection:'column',width:'75%'}}>
              <View>
                <Text style={{fontSize:16,fontWeight:'bold',color:'#ffffff'}}>{this.props.title}</Text>
              </View>
              <View>
                <Text style={{fontSize:12,color:'#ffffff'}}>{this.props.message}</Text>
              </View>
            </View>
            <View style={{paddingRight:8,justifyContent:'center'}}>
              <TouchableOpacity onPress={()=>this.props.showMessageMeds()}><Icon name={'md-close'} size={28} color={'#ffffff'} style={{marginTop:3}}/></TouchableOpacity>
            </View>
          </View>
        </View>
      </Animatable.View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
