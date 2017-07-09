import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';

//npm packages
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

class Number extends Component {

  render(){
    return(
      <TouchableOpacity onPress={()=> this.props.callback(this.props.number,this.props.color)}>
        <Animated.View style={{justifyContent:'center',alignItems:'center',width:Dimensions.get('window').width/3,height:'100%',}}>
          <View style={{width:'50%',height:'50%',alignItems:'center',justifyContent:'center',borderRadius:4,backgroundColor:this.props.backgroundColor}}>
            <Text>{this.props.number}</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    )
  }
}

export default Number;
