import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

//npm packages
import Icon from 'react-native-vector-icons/Ionicons';


class FormInput extends Component {

  render(){
    return(
      <View style={{marginBottom:14}}>
        <Text style={{color:'#3F3F3F',fontSize:16,fontWeight:'bold'}}>{this.props.label}</Text>
        <View style={{borderColor: '#bdc3c7', borderBottomWidth: 1,marginTop:5,paddingBottom:3}}>
          <TextInput
            placeholder={this.props.placeholder}
            style={{height: 43, fontSize:30, color:'#3F3F3F'}}
            onChangeText={this.props.onChangeText}
            value={this.props.value}
            autoFocus={this.props.autoFocus}
            maxLength={17}
            clearButtonMode={'always'}
            returnKeyType={'done'}
          />
        </View>
      </View>
    )
  }
}

export default FormInput;
