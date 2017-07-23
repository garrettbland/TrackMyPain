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
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

class SettingsNotifications extends Component {

  static navigationOptions = ({ navigation }) => ({
      headerLeft: <TouchableOpacity style={{width:60}} onPress={()=>{navigation.state.params.goBack()}}><Icon name={'md-arrow-back'} size={32} color={'#ffffff'} style={{marginLeft:10}}/></TouchableOpacity>,
  });

    constructor(props) {
      super(props);
      this.state = {
        reminderIntervalModal:false
      }
      this.goBack = this.goBack.bind(this)
    }

    componentDidMount() {
      this.props.navigation.setParams({ goBack: this.goBack });

      //fetch local data to set state for labels
      AsyncStorage.getItem("reminderInterval").then((value) => {
          //if empty, set defaults
          if(value == null){
            AsyncStorage.setItem("reminderInterval", "30")
            this.setState({
              reminderInterval:30
            })
          }else{
            this.setState({
              reminderInterval:value
            })
          }
      }).done();
      this.setState({
        enabled:false,
        snoozeStart:'8:00 PM',
        snoozeEnd:'9:00 AM',
      })
    }

    goBack () {
      const backAction = NavigationActions.back({})
      this.props.navigation.dispatch(backAction)
    }

    updateEnabled = (value) => {
      this.setState({
        enabled:value,
      });
    }

    updateReminderInterval(time){
      AsyncStorage.setItem("reminderInterval", time)
      this.setState({
        reminderInterval:time
      });
    }


  render(){
    return(
      <View style={{flex:1,zIndex:1}}>
      {this.state.reminderIntervalModal &&
        <Animatable.View animation={this.state.reminderIntervalModal ? 'fadeIn' : 'fadeOut'} duration={500} style={{position:'absolute',zIndex:9,width:'100%',height:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'rgba(51, 51, 51, 0.5)'}}>
          <Animatable.View animation={this.state.reminderIntervalModal ? 'fadeInDown' : 'fadeOutUp'} style={{width:'80%',height:'33%',backgroundColor:'#ffffff',borderRadius:4,overflow:'hidden',}}>
            <View style={{alignItems:'center',justifyContent:'center',width:'100%',height:'100%'}}>
              <Picker selectedValue = {this.state.reminderInterval} onValueChange = {(value) => this.updateReminderInterval(value)} style={{width:'100%'}}>
                <Picker.Item label = "10 Minutes" value = "10" />
                <Picker.Item label = "15 Minutes" value = "15" />
                <Picker.Item label = "30 Minutes" value = "30" />
                <Picker.Item label = "1 Hour" value = "60" />
                <Picker.Item label = "2 Hours" value = "120" />
                <Picker.Item label = "4 Hours" value = "180" />
              </Picker>
            </View>
          </Animatable.View>
        </Animatable.View>
      }
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
              borderTopWidth:StyleSheet.hairlineWidth,
              borderBottomWidth:StyleSheet.hairlineWidth,
              borderColor:'#bdc3c7',
              height:48
            }}>
              <View>
                <Text style={{fontSize:15,color:'#3F3F3F',fontWeight:'bold'}}>Notifications</Text>
              </View>
              <View>
                <Switch
                  onValueChange={this.updateEnabled}
                  style={{marginBottom: 1}}
                  value={this.state.enabled}
                />
              </View>
            </View>

            <View style={{paddingLeft:10,paddingBottom:3}}>
              <Text style={{color:'#3F3F3F',fontSize:15,fontWeight:'bold'}}>Reminder Interval</Text>
              <Text style={{color:'#3F3F3F',fontSize:12}}>Remind me to rate my pain every...</Text>
            </View>
              <TouchableOpacity
                disabled={!this.state.enabled}
                onPress={()=> this.setState({reminderIntervalModal:true})}
                activeOpacity={0.6}
                style={{
                  width:'100%',
                  paddingLeft:10,
                  paddingRight:10,
                  backgroundColor:'#ffffff',
                  borderTopWidth:StyleSheet.hairlineWidth,
                  borderBottomWidth:StyleSheet.hairlineWidth,
                  borderColor:'#bdc3c7',
                }}
              >
                <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',height:47,}}>
                  <View style={{flexDirection:'row'}}>
                    <Icon name={'ios-alarm-outline'} size={28} style={{marginTop:3,paddingRight:8}} color={this.state.enabled ? '#7f8c8d': '#bdc3c7'} />
                    <View style={{justifyContent:'center',}}>
                      <Text style={{color:this.state.enabled ? '#3F3F3F': '#bdc3c7',fontSize:15,}}>{'Every '+this.state.reminderInterval+' minutes'}</Text>
                    </View>
                  </View>
                  <View>
                    <Icon name={'ios-more'} size={28} style={{marginTop:3}} color={this.state.enabled ? '#7f8c8d': '#bdc3c7'} />
                  </View>
                </View>
              </TouchableOpacity>


              <View style={{paddingLeft:10,paddingBottom:3,marginTop:25}}>
                <Text style={{color:'#3F3F3F',fontSize:15,fontWeight:'bold'}}>Snooze Mode</Text>
                <Text style={{color:'#3F3F3F',fontSize:12}}>Automatically turn notifications off between selected times</Text>
              </View>
                <TouchableOpacity
                  disabled={!this.state.enabled}
                  onPress={()=>console.log("TEST")}
                  activeOpacity={0.6}
                  style={{
                    width:'100%',
                    paddingLeft:10,
                    paddingRight:10,
                    backgroundColor:'#ffffff',
                    borderTopWidth:Platform.OS == 'ios' ? StyleSheet.hairlineWidth : 1,
                    borderBottomWidth:Platform.OS == 'ios' ? StyleSheet.hairlineWidth : 1,
                    borderColor:'#bdc3c7',
                  }}
                >
                  <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',height:47,}}>
                    <View style={{flexDirection:'row'}}>
                      <Text style={{fontSize:15,color:this.state.enabled ? '#3F3F3F': '#bdc3c7',fontWeight:'bold',width:60}}>Start</Text>
                      <View style={{justifyContent:'center',}}>
                        <Text style={{color:this.state.enabled ? '#3F3F3F': '#bdc3c7',fontSize:15,}}>{this.state.snoozeStart}</Text>
                      </View>
                    </View>
                    <View>
                      <Icon name={'ios-more'} size={28} style={{marginTop:3}} color={this.state.enabled ? '#7f8c8d': '#bdc3c7'} />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={!this.state.enabled}
                  onPress={()=>console.log("TEST")}
                  activeOpacity={0.6}
                  style={{
                    width:'100%',
                    paddingLeft:10,
                    paddingRight:10,
                    backgroundColor:'#ffffff',
                    borderBottomWidth:Platform.OS == 'ios' ? StyleSheet.hairlineWidth : 1,
                    borderColor:'#bdc3c7',
                  }}
                >
                  <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',height:47,}}>
                    <View style={{flexDirection:'row'}}>
                      <Text style={{fontSize:15,color:this.state.enabled ? '#3F3F3F': '#bdc3c7',fontWeight:'bold',width:60}}>End</Text>
                      <View style={{justifyContent:'center',}}>
                        <Text style={{color:this.state.enabled ? '#3F3F3F': '#bdc3c7',fontSize:15,}}>{this.state.snoozeEnd}</Text>
                      </View>
                    </View>
                    <View>
                      <Icon name={'ios-more'} size={28} style={{marginTop:3}} color={this.state.enabled ? '#7f8c8d': '#bdc3c7'} />
                    </View>
                  </View>
                </TouchableOpacity>


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
