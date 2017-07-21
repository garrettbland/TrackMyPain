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


class Modal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal:true
    }
  }

  hideAlert(){
    this.timeoutHandle = setTimeout(()=>{
         this.props.showRateModal();
    }, 1500);
  }

  closeAnimation(){
     this.timeoutHandle = setTimeout(()=>{
          this.setState({showModal:false});
          this.hideAlert();
     }, 2500);
  }

  render(){
    return(
      <Animatable.View animation={this.state.showModal ? 'fadeIn' : 'fadeOut'} duration={800} style={{position:'absolute',zIndex:9,width:'100%',height:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'rgba(51, 51, 51, 0.5)'}}>
        <Animatable.View animation={this.state.showModal ? 'bounceIn' : 'bounceOut'} onAnimationEnd={this.closeAnimation()} View style={{width:'80%',height:'33%',backgroundColor:'#ffffff',borderRadius:4,overflow:'hidden',}}>
          <View style={{alignItems:'center',justifyContent:'center',width:'100%',height:'100%'}}>
            <Icon name={this.props.icon} size={60} color={this.props.iconColor} />
            <Text style={{fontSize:24,fontWeight:'bold',textAlign:'center'}}>{this.props.title}</Text>
            <Text style={{fontSize:14,textAlign:'center'}}>{this.props.body}</Text>
          </View>
        </Animatable.View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
