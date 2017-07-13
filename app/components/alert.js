import React, {Component} from 'react';
import {
  Text,
  View,
} from 'react-native';

//npm packages
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';


class Alert extends Component {

  render(){
    return(
      <Animatable.View animation={this.props.animation} style={{width:'100%',height:50,backgroundColor:this.props.backgroundColor,marginBottom:12,borderRadius:4,overflow:'hidden',justifyContent:'center',paddingLeft:8,paddingRight:8}}>
        <View style={{flexDirection:'column'}}>
          <View>
            <Text style={{fontSize:16,fontWeight:'bold',color:'#ffffff'}}>{this.props.title}</Text>
          </View>
          <View>
            <Text style={{fontSize:12,color:'#ffffff'}}>{this.props.message}</Text>
          </View>
        </View>
      </Animatable.View>
    )
  }
}

export default Alert;
