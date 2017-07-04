import React, {Component} from 'react';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

//navigation
import { NavigationActions } from 'react-navigation';

//npm packages
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

import {
  View,
  Text,
  Platform,
  Switch,
  Picker,
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

class SettingsNotifications extends Component {

  static navigationOptions = ({ navigation }) => ({
      title: 'Notifications',
      headerBackTitle:null,
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon name={focused ? 'ios-options' : 'ios-options-outline'} size={32} color={tintColor} />
      ),
      headerLeft: <TouchableOpacity onPress={()=>{navigation.state.params.goBack()}}><Icon name={'ios-arrow-dropleft'} size={38} color={'#ffffff'} style={{marginLeft:8}}/></TouchableOpacity>,
      tabBarLabel:'Settings',
      headerTitleStyle:{fontWeight:'bold',fontSize:19,color:'#ffffff'},
      headerStyle:{backgroundColor:'#3498db',borderBottomWidth:0},
    });

    constructor(props) {
      super(props);
      this.state = {
        noticationsEnabled:false,
        timeInterval:'30',
        offsetX: new Animated.Value(0),
      }
      this.goBack = this.goBack.bind(this)
    }

    componentDidMount() {
      this.props.navigation.setParams({ goBack: this.goBack });
    }

    goBack () {
      const backAction = NavigationActions.back({

      })
      this.props.navigation.dispatch(backAction)

    }

    updateEnabled = (value) => {
      //this.showTimeIntervalPicker(value)
      this.setState({
        noticationsEnabled:value
      })
    }

    updateTimeInterval = (selectedTime) => {
       this.setState({ timeInterval: selectedTime })
    }

    showTimeIntervalPicker(value) {

       Animated.timing(
         this.state.offsetX,
         { toValue: value == false ? -(screenWidth) : 0 }
       ).start();
     }

  render(){
    return(
      <View style={{flex:1}}>
        <ScrollView>
          <View style={{marginTop:12}}>
            <View style={{
              flexDirection:'row',
              backgroundColor:'#ffffff',
              justifyContent:'space-between',
              alignItems:'center',
              paddingLeft:10,
              paddingRight:10,
              marginBottom:15,
              borderTopWidth:Platform.OS == 'ios' ? StyleSheet.hairlineWidth : 1,
              borderBottomWidth:Platform.OS == 'ios' ? StyleSheet.hairlineWidth : 1,
              borderColor:'#bdc3c7',
              height:55
            }}>
              <View>
                <Text style={{fontSize:20,color:'#3F3F3F',fontWeight:'bold'}}>Notifications</Text>
              </View>
              <View>
                <Switch
                  onValueChange={this.updateEnabled}
                  style={{marginBottom: 1}}
                  value={this.state.noticationsEnabled}
                />
              </View>
            </View>
            <View style={{paddingLeft:10,paddingBottom:3}}>
              <Text style={{color:'#3F3F3F',fontSize:16,fontWeight:'bold'}}>Reminder Interval</Text>
              <Text style={{color:'#3F3F3F',fontSize:12}}>Remind me to rate my pain every selected value</Text>
            </View>
            <View style={{
              borderTopWidth:Platform.OS == 'ios' ? StyleSheet.hairlineWidth : 1,
              borderBottomWidth:Platform.OS == 'ios' ? StyleSheet.hairlineWidth : 1,
              borderColor:'#bdc3c7',
              marginBottom:15,
              backgroundColor:'#ffffff',
            }}>
              <Animated.View style={{ transform: [{translateX: this.state.offsetX}], width:'100%',}}>
                  {this.state.noticationsEnabled &&
                    <Animatable.View animation="fadeIn" style={{width:'100%'}}>
                      <Picker selectedValue = {this.state.timeInterval} onValueChange = {this.updateTimeInterval} style={{width:'100%'}}>
                        <Picker.Item label = "10 Minutes" value = "10" />
                        <Picker.Item label = "15 Minutes" value = "15" />
                        <Picker.Item label = "30 Minutes" value = "30" />
                        <Picker.Item label = "1 Hour" value = "60" />
                        <Picker.Item label = "2 Hours" value = "120" />
                        <Picker.Item label = "4 Hours" value = "180" />
                      </Picker>
                    </Animatable.View>
                  }
                  {!this.state.noticationsEnabled &&
                    <Animatable.View animation="fadeIn" style={{width:'100%',height:140,alignItems:'center',justifyContent:'center'}}>
                      <Text style={{color:'#7f8c8d',fontSize:13}}>Disabled</Text>
                    </Animatable.View>
                  }
                </Animated.View>
              </View>
              <View style={{paddingLeft:10,paddingBottom:3}}>
                <Text style={{color:'#3F3F3F',fontSize:16,fontWeight:'bold'}}>Snooze Mode</Text>
                <Text style={{color:'#3F3F3F',fontSize:12}}>Turn notifications off between selected time</Text>
              </View>
              <View style={{
                borderTopWidth:Platform.OS == 'ios' ? StyleSheet.hairlineWidth : 1,
                borderBottomWidth:Platform.OS == 'ios' ? StyleSheet.hairlineWidth : 1,
                borderColor:'#bdc3c7',
                marginBottom:15,
                backgroundColor:'#ffffff',
              }}>
                <Animated.View style={{ transform: [{translateX: this.state.offsetX}], width:'100%',}}>
                    {this.state.noticationsEnabled &&
                      <Animatable.View animation="fadeIn" style={{width:'100%'}}>
                        <Picker selectedValue = {this.state.timeInterval} onValueChange = {this.updateTimeInterval} style={{width:'100%'}}>
                          <Picker.Item label = "10 Minutes" value = "10" />
                          <Picker.Item label = "15 Minutes" value = "15" />
                          <Picker.Item label = "30 Minutes" value = "30" />
                          <Picker.Item label = "1 Hour" value = "60" />
                          <Picker.Item label = "2 Hours" value = "120" />
                          <Picker.Item label = "4 Hours" value = "180" />
                        </Picker>
                      </Animatable.View>
                    }
                    {!this.state.noticationsEnabled &&
                      <Animatable.View animation="fadeIn" style={{width:'100%',height:140,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{color:'#7f8c8d',fontSize:13}}>Disabled</Text>
                      </Animatable.View>
                    }
                  </Animated.View>
              </View>
          </View>
        </ScrollView>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsNotifications);
