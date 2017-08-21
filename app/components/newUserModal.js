import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

//npm packages
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

//components
import Button from '../components/button';


class Modal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal:true
    }
  }

  closeAnimation(){
      this.setState({showModal:false});
  }

  render(){
    return(
      <Animatable.View animation={this.state.reminderIntervalModalAnimation ? 'fadeOut' : 'fadeIn'} duration={500} style={{position:'absolute',zIndex:9,width:'100%',height:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'rgba(51, 51, 51, 0.5)'}}>
        <Animatable.View animation={this.state.reminderIntervalModalAnimation ? 'fadeOutUp' : 'fadeInDown'} style={{width:'80%',height:'50%',backgroundColor:'#ffffff',borderRadius:4,}}>
          <View style={{width:'100%',height:'100%'}}>
            <View style={{width:'100%',padding:20,}}>
            <View style={{justifyContent:'center',alignItems:'center'}}>
              <View style={{flexDirection:'column',}}>
                <Animatable.View animation="fadeInUp" delay={60} style={{flexDirection:'row',marginBottom:8}}>
                  <View style={{width:50}}>
                    <Icon name={'md-heart'} size={36} color={'#3498db'} />
                  </View>
                  <View style={{justifyContent:'center'}}>
                    <Text style={{fontSize:20,fontWeight:'700'}}>Rate your pain</Text>
                  </View>
                </Animatable.View>
                <Animatable.View animation="fadeInUp" delay={120} style={{flexDirection:'row',marginBottom:8}}>
                  <View style={{width:50}}>
                    <Icon name={'md-stats'} size={36} color={'#3498db'} />
                  </View>
                  <View style={{justifyContent:'center'}}>
                    <Text style={{fontSize:20,fontWeight:'700'}}>Track your pain</Text>
                  </View>
                </Animatable.View>
                <Animatable.View animation="fadeInUp" delay={180} style={{flexDirection:'row',marginBottom:8}}>
                  <View style={{width:50}}>
                    <Icon name={'md-medkit'} size={36} color={'#3498db'} />
                  </View>
                  <View style={{justifyContent:'center'}}>
                    <Text style={{fontSize:20,fontWeight:'700'}}>Add Medications</Text>
                  </View>
                </Animatable.View>
                <Animatable.View animation="fadeInUp" delay={240} style={{flexDirection:'row',marginBottom:8}}>
                  <View style={{width:50}}>
                    <Icon name={'ios-switch'} size={36} color={'#3498db'} />
                  </View>
                  <View style={{justifyContent:'center'}}>
                    <Text style={{fontSize:20,fontWeight:'700'}}>Set Reminders</Text>
                  </View>
                </Animatable.View>
              </View>
              <Animatable.View animation="fadeInUp" delay={300} style={{width:'100%',marginTop:20}}>
                <Button title={'Get Started'} backgroundColor={'#2ecc71'} titleColor={'#ffffff'} onPress={() => this.props.callback(false)}/>
              </Animatable.View>
              </View>
            </View>
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
