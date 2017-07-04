import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';

//npm packages
import Icon from 'react-native-vector-icons/Ionicons';

class SettingsInfoListItem extends Component {

  render(){
    return(
      <View
        style={{
          flexDirection:'row',
          backgroundColor:'#ffffff',
          justifyContent:'space-between',
          alignItems:'center',
          paddingLeft:10,
          paddingRight:10,
          marginBottom:2,
          borderTopWidth:Platform.OS == 'ios' ? StyleSheet.hairlineWidth : 1,
          borderBottomWidth:Platform.OS == 'ios' ? StyleSheet.hairlineWidth : 1,
          borderColor:'#bdc3c7',
          height:48
        }}
      >
        <View>
          <Text style={{fontSize:16,color:'#3F3F3F',fontWeight:'bold'}}>{this.props.header}</Text>
        </View>
        <View>
          <Text style={{color:'#3F3F3F',fontSize:12,}}>{this.props.subHeader}</Text>
        </View>
      </View>
    )
  }
}

export default SettingsInfoListItem;
