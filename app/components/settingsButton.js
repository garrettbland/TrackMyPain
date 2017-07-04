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

//navigation
import { NavigationActions, addNavigationHelpers } from 'react-navigation';


class SettingsButton extends Component {

  render(){
    var navigateAction = NavigationActions.navigate({

      routeName: this.props.route,

      params: {},

      action: NavigationActions.navigate({ routeName: this.props.route})
    });
    return(
      <TouchableOpacity
        onPress={()=>{this.props.navigation.dispatch(navigateAction)}}
        activeOpacity={0.6}
        style={{
          width:'100%',
          paddingLeft:10,
          paddingRight:10,
          backgroundColor:'#ffffff',
          borderTopWidth:Platform.OS == 'ios' ? StyleSheet.hairlineWidth : 1,
          borderBottomWidth:Platform.OS == 'ios' ? StyleSheet.hairlineWidth : 1,
          borderColor:'#bdc3c7',
          marginBottom:2
        }}
      >
        <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',height:47,}}>
          <View>
            <Text style={{color:'#3F3F3F',fontWeight:'bold',fontSize:15}}>{this.props.title}</Text>
          </View>
          <View>
            <Icon name={this.props.icon} size={32} style={{marginTop:3}} color={'#3F3F3F'} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default SettingsButton;
