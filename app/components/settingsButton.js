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
      <TouchableOpacity style={styles.buttonContainer} onPress={()=>{this.props.navigation.dispatch(navigateAction)}} activeOpacity={0.6}>
        <View style={styles.button}>
          <View>
            <Text style={styles.titleText}>{this.props.title}</Text>
          </View>
          <View>
            <Icon name={this.props.icon} size={32} style={{marginTop:3}} color={styles.primaryColor.color} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default SettingsButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width:'100%',
    paddingLeft:10,
    paddingRight:10,
    backgroundColor:'#ffffff',
    borderTopWidth:Platform.OS == 'ios' ? StyleSheet.hairlineWidth : 1,
    borderBottomWidth:Platform.OS == 'ios' ? StyleSheet.hairlineWidth : 1,
    borderColor:'#bdc3c7',
    marginBottom:2,
  },
  button:{
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    height:47,
  },
  titleText:{
    color:'#3F3F3F',
    fontWeight:'bold',
    fontSize:15
  },
  primaryColor:{
    color:'#3F3F3F'
  },
});
