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
      <Animatable.View animation={this.props.animation} style={{width:'100%',height:50,backgroundColor:this.props.backgroundColor,marginBottom:12,borderRadius:4,overflow:'hidden',justifyContent:'center',paddingLeft:8,paddingRight:8}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{flexDirection:'column'}}>
            <View>
              <Text style={{fontSize:16,fontWeight:'bold',color:'#ffffff'}}>{this.props.title}</Text>
            </View>
            <View>
              <Text style={{fontSize:12,color:'#ffffff'}}>{this.props.message}</Text>
            </View>
          </View>
          <View style={{paddingRight:8}}>
            <TouchableOpacity onPress={()=>this.props.showMessageMeds()}><Icon name={'md-close'} size={28} color={'#ffffff'} style={{marginTop:3}}/></TouchableOpacity>
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
