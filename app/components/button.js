import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';

//npm packages
import Icon from 'react-native-vector-icons/Ionicons';


class Button extends Component {

  render(){
    return(
      <View style={{alignItems:'center'}}>
        <TouchableOpacity
        onPress={this.props.onPress}
        activeOpacity={0.6}
        style={{
          backgroundColor:this.props.backgroundColor,
          width:'80%',
          height:55,
          borderRadius:4,
          overflow:'hidden',
          justifyContent:'center',
          alignItems:'center'
        }}>
          <Text style={{fontSize:16,color:this.props.titleColor,fontWeight:'bold'}}>{this.props.title}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Button;
