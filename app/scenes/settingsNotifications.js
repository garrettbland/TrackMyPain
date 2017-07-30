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

//components
import Button from '../components/button';
import moment from 'moment';

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
  PushNotificationIOS,
  Alert,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

class SettingsNotifications extends Component {

  static navigationOptions = ({ navigation }) => ({
      headerLeft: <TouchableOpacity style={{width:60}} onPress={()=>{navigation.state.params.goBack()}}><Icon name={'md-arrow-back'} size={32} color={'#ffffff'} style={{marginLeft:10}}/></TouchableOpacity>,
  });

    constructor(props) {
      super(props);
      this.state = {
        reminderIntervalModal:false,
        selectTimeModal:false,
      }
      this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
      this.props.navigation.setParams({ goBack: this.goBack });

      //see if notifications are enabled
      AsyncStorage.getItem("notificationsEnabled").then((value) => {
        if(value == null){
          AsyncStorage.setItem("notificationsEnabled", "false")
          this.setState({enabled:false,firstTimeNotifications:true});
        }else{
          this.setState({enabled:JSON.parse(value)});
        }
      }).done();

      //fetch local data for interval to set state
      AsyncStorage.getItem("reminderInterval").then((value) => {
          //if empty, set defaults
          if(value == null){
            AsyncStorage.setItem("reminderInterval", "day")
            this.setState({
              reminderInterval:"day"
            })
          }else{
            this.setState({
              reminderInterval:value
            })
          }
      }).done();

      //fetch local data for time to set state
      AsyncStorage.getItem("selectTime").then((value) => {
          //if empty, set defaults
          if(value == null){
            AsyncStorage.setItem("selectTime", "12:00")
            this.setState({
              selectTime:"12:00"
            })
          }else{
            this.setState({
              selectTime:value
            })
          }
      }).done();

    };

goBack () {
  const backAction = NavigationActions.back({})
  this.props.navigation.dispatch(backAction)
}

    updateEnabled = (value) => {

      if(value == true){
        //sets local notifications

        if(this.state.firstTimeNotifications){
          PushNotificationIOS.requestPermissions();
          this.setState({
            enabled:false,
            firstTimeNotifications:false,
          })
          AsyncStorage.setItem("notificationsEnabled", JSON.stringify(false));
        }else{
          PushNotificationIOS.checkPermissions((permissions)=>{
            if(permissions.alert == false && !this.state.firstTimeNotifications){
              Alert.alert("Warning","You currently have notifications turned off for Track My Pain. Please go to Settings > Track My Pain > Notifications and 'Allow'");
              this.setState({
                enabled:false,
              })
            }
          });

          var time1 = moment().format("YYYY-MM-DD")
          var setFireTime = (time1 +'T'+ this.state.selectTime + ':00.0000-05:00');
          PushNotificationIOS.scheduleLocalNotification({
            fireDate:setFireTime,
            alertBody:'Time to Track your Pain',
            repeatInterval:this.state.reminderInterval,
          });

          AsyncStorage.setItem("notificationsEnabled", JSON.stringify(true));
          this.setState({
            enabled:value,
          });
        }


      }else{
        //cancels all local notificaitons
        PushNotificationIOS.cancelAllLocalNotifications()
        AsyncStorage.setItem("notificationsEnabled", JSON.stringify(true));
        this.setState({
          enabled:false
        })
      }

    }

    updateReminderInterval(time){
      PushNotificationIOS.cancelAllLocalNotifications();
      AsyncStorage.setItem("reminderInterval", time)
      this.setState({
        reminderInterval:time
      });
      var time1 = moment().format("YYYY-MM-DD")
      var setFireTime = (time1 +'T'+ this.state.selectTime + ':00.0000-05:00');
      PushNotificationIOS.scheduleLocalNotification({
        fireDate:setFireTime,
        alertBody:'Time to Track your Pain',
        repeatInterval:time,
      });
    }

    updateSelectTime(time){
      PushNotificationIOS.cancelAllLocalNotifications();
      AsyncStorage.setItem("selectTime", time)
      this.setState({
        selectTime:time
      });
      var time1 = moment().format("YYYY-MM-DD")
      var setFireTime = (time1 +'T'+ time + ':00.0000-05:00');
      PushNotificationIOS.scheduleLocalNotification({
        fireDate:setFireTime,
        alertBody:'Time to Track your Pain',
        repeatInterval:this.state.reminderInterval,
      });
    }

    closeAnimation(handle){
        if(handle == 'reminderIntervalModalAnimation'){
          this.setState({reminderIntervalModalAnimation:true});
        }else if (handle == 'selectTimeModalAnimation'){
          this.setState({selectTimeModalAnimation:true})
        }
       this.timeoutHandle = setTimeout(()=>{
            this.setState({
              reminderIntervalModal:false,
              reminderIntervalModalAnimation:null,
              selectTimeModal:false,
              selectTimeModalAnimation:null,
            });
       }, 700);
    }

    renderIntervalModal(){
      return (
        <Animatable.View animation={this.state.reminderIntervalModalAnimation ? 'fadeOut' : 'fadeIn'} duration={500} style={{position:'absolute',zIndex:9,width:'100%',height:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'rgba(51, 51, 51, 0.5)'}}>
          <Animatable.View animation={this.state.reminderIntervalModalAnimation ? 'fadeOutUp' : 'fadeInDown'} style={{width:'80%',height:'50%',backgroundColor:'#ffffff',borderRadius:4,}}>
            <View style={{width:'100%',height:'100%'}}>
              <View style={{width:'100%',marginTop:30}}>
                <Button title={'Done'} backgroundColor={'#3498db'} titleColor={'#ffffff'} onPress={() => this.closeAnimation('reminderIntervalModalAnimation')}/>
              </View>
              <Picker selectedValue = {this.state.reminderInterval} onValueChange = {(value) => this.updateReminderInterval(value)} style={{width:'100%'}}>
                <Picker.Item label = "Once an hour" value = "hour" />
                <Picker.Item label = "Once a day" value = "day" />
              </Picker>
            </View>
          </Animatable.View>
        </Animatable.View>
      )
    }

    renderSelectTimeModal(){
      return (
        <Animatable.View animation={this.state.selectTimeModalAnimation ? 'fadeOut' : 'fadeIn'} duration={500} style={{position:'absolute',zIndex:9,width:'100%',height:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'rgba(51, 51, 51, 0.5)'}}>
          <Animatable.View animation={this.state.selectTimeModalAnimation ? 'fadeOutUp' : 'fadeInDown'} style={{width:'80%',height:'50%',backgroundColor:'#ffffff',borderRadius:4,}}>
            <View style={{width:'100%',height:'100%'}}>
              <View style={{width:'100%',marginTop:30}}>
                <Button title={'Done'} backgroundColor={'#3498db'} titleColor={'#ffffff'} onPress={() => this.closeAnimation('selectTimeModalAnimation')}/>
              </View>
              <Picker selectedValue = {this.state.selectTime} onValueChange = {(value) => this.updateSelectTime(value)} style={{width:'100%'}}>
                <Picker.Item label = "1:00 AM" value = "01:00" />
                <Picker.Item label = "2:00 AM" value = "02:00" />
                <Picker.Item label = "3:00 AM" value = "03:00" />
                <Picker.Item label = "4:00 AM" value = "04:00" />
                <Picker.Item label = "5:00 AM" value = "05:00" />
                <Picker.Item label = "6:00 AM" value = "06:00" />
                <Picker.Item label = "7:00 AM" value = "07:00" />
                <Picker.Item label = "8:00 AM" value = "08:00" />
                <Picker.Item label = "9:00 AM" value = "09:00" />
                <Picker.Item label = "10:00 AM" value = "10:00" />
                <Picker.Item label = "11:00 AM" value = "11:00" />
                <Picker.Item label = "12:00 PM" value = "12:00" />
                <Picker.Item label = "1:00 PM" value = "13:00" />
                <Picker.Item label = "2:00 PM" value = "14:00" />
                <Picker.Item label = "3:00 PM" value = "15:00" />
                <Picker.Item label = "4:00 PM" value = "16:00" />
                <Picker.Item label = "5:00 PM" value = "17:00" />
                <Picker.Item label = "6:00 PM" value = "18:00" />
                <Picker.Item label = "7:00 PM" value = "19:00" />
                <Picker.Item label = "8:00 PM" value = "20:00" />
                <Picker.Item label = "9:00 PM" value = "21:00" />
                <Picker.Item label = "10:00 PM" value = "22:00" />
                <Picker.Item label = "11:00 PM" value = "23:00" />
              </Picker>
            </View>
          </Animatable.View>
        </Animatable.View>
      )
    }


  render(){
    return(
      <View style={{flex:1,zIndex:1}}>
      {this.state.reminderIntervalModal &&
        this.renderIntervalModal()
      }
      {this.state.selectTimeModal &&
        this.renderSelectTimeModal()
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
                      <Text style={{color:this.state.enabled ? '#3F3F3F': '#bdc3c7',fontSize:15,}}>{'Once a '+this.state.reminderInterval}</Text>
                    </View>
                  </View>
                  <View>
                    <Icon name={'ios-more'} size={28} style={{marginTop:3}} color={this.state.enabled ? '#7f8c8d': '#bdc3c7'} />
                  </View>
                </View>
              </TouchableOpacity>

              <View style={{paddingLeft:10,paddingBottom:3,marginTop:25}}>
                <Text style={{color:'#3F3F3F',fontSize:15,fontWeight:'bold'}}>Notification Schedule</Text>
                <Text style={{color:'#3F3F3F',fontSize:12}}>Select time to start or schedule notifications</Text>
              </View>
                <TouchableOpacity
                  disabled={!this.state.enabled}
                  onPress={()=>this.setState({selectTimeModal:true})}
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
                        <Text style={{color:this.state.enabled ? '#3F3F3F': '#bdc3c7',fontSize:15,}}>{moment(this.state.selectTime, "hh").format('h:mm A')}</Text>
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




// <View style={{paddingLeft:10,paddingBottom:3,marginTop:25}}>
//   <Text style={{color:'#3F3F3F',fontSize:15,fontWeight:'bold'}}>Snooze Mode</Text>
//   <Text style={{color:'#3F3F3F',fontSize:12}}>Automatically turn notifications off between selected times</Text>
// </View>
//   <TouchableOpacity
//     disabled={!this.state.enabled}
//     onPress={()=>this.setState({snoozeStartModal:true})}
//     activeOpacity={0.6}
//     style={{
//       width:'100%',
//       paddingLeft:10,
//       paddingRight:10,
//       backgroundColor:'#ffffff',
//       borderTopWidth:Platform.OS == 'ios' ? StyleSheet.hairlineWidth : 1,
//       borderBottomWidth:Platform.OS == 'ios' ? StyleSheet.hairlineWidth : 1,
//       borderColor:'#bdc3c7',
//     }}
//   >
//     <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',height:47,}}>
//       <View style={{flexDirection:'row'}}>
//         <Text style={{fontSize:15,color:this.state.enabled ? '#3F3F3F': '#bdc3c7',fontWeight:'bold',width:60}}>Start</Text>
//         <View style={{justifyContent:'center',}}>
//           <Text style={{color:this.state.enabled ? '#3F3F3F': '#bdc3c7',fontSize:15,}}>{moment(this.state.snoozeStart, "hh").format('h:mm A')}</Text>
//         </View>
//       </View>
//       <View>
//         <Icon name={'ios-more'} size={28} style={{marginTop:3}} color={this.state.enabled ? '#7f8c8d': '#bdc3c7'} />
//       </View>
//     </View>
//   </TouchableOpacity>
//   <TouchableOpacity
//     disabled={!this.state.enabled}
//     onPress={()=>this.setState({snoozeEndModal:true})}
//     activeOpacity={0.6}
//     style={{
//       width:'100%',
//       paddingLeft:10,
//       paddingRight:10,
//       backgroundColor:'#ffffff',
//       borderBottomWidth:Platform.OS == 'ios' ? StyleSheet.hairlineWidth : 1,
//       borderColor:'#bdc3c7',
//     }}
//   >
//     <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',height:47,}}>
//       <View style={{flexDirection:'row'}}>
//         <Text style={{fontSize:15,color:this.state.enabled ? '#3F3F3F': '#bdc3c7',fontWeight:'bold',width:60}}>End</Text>
//         <View style={{justifyContent:'center',}}>
//           <Text style={{color:this.state.enabled ? '#3F3F3F': '#bdc3c7',fontSize:15,}}>{moment(this.state.snoozeEnd, "hh").format('h:mm A')}</Text>
//         </View>
//       </View>
//       <View>
//         <Icon name={'ios-more'} size={28} style={{marginTop:3}} color={this.state.enabled ? '#7f8c8d': '#bdc3c7'} />
//       </View>
//     </View>
//   </TouchableOpacity>

//
// renderEndModal(){
//   return (
//     <Animatable.View animation={this.state.snoozeEndModalAnimation ? 'fadeOut' : 'fadeIn'} duration={500} style={{position:'absolute',zIndex:9,width:'100%',height:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'rgba(51, 51, 51, 0.5)'}}>
//       <Animatable.View animation={this.state.snoozeEndModalAnimation ? 'fadeOutUp' : 'fadeInDown'} style={{width:'80%',height:'50%',backgroundColor:'#ffffff',borderRadius:4,}}>
//         <View style={{width:'100%',height:'100%'}}>
//           <View style={{width:'100%',marginTop:30}}>
//             <Button title={'Done'} backgroundColor={'#3498db'} titleColor={'#ffffff'} onPress={() => this.closeAnimation('snoozeEndModalAnimation')}/>
//           </View>
//           <Picker selectedValue = {this.state.snoozeEnd} onValueChange = {(value) => this.updateSnoozeEnd(value)} style={{width:'100%'}}>
//           <Picker.Item label = "1:00 AM" value = "0100" />
//           <Picker.Item label = "2:00 AM" value = "0200" />
//           <Picker.Item label = "3:00 AM" value = "0300" />
//           <Picker.Item label = "4:00 AM" value = "0400" />
//           <Picker.Item label = "5:00 AM" value = "0500" />
//           <Picker.Item label = "6:00 AM" value = "0600" />
//           <Picker.Item label = "7:00 AM" value = "0700" />
//           <Picker.Item label = "8:00 AM" value = "0800" />
//           <Picker.Item label = "9:00 AM" value = "0900" />
//           <Picker.Item label = "10:00 AM" value = "1000" />
//           <Picker.Item label = "11:00 AM" value = "1100" />
//           <Picker.Item label = "1:00 PM" value = "1300" />
//           <Picker.Item label = "2:00 PM" value = "1400" />
//           <Picker.Item label = "3:00 PM" value = "1500" />
//           <Picker.Item label = "4:00 PM" value = "1600" />
//           <Picker.Item label = "5:00 PM" value = "1700" />
//           <Picker.Item label = "6:00 PM" value = "1800" />
//           <Picker.Item label = "7:00 PM" value = "1900" />
//           <Picker.Item label = "8:00 PM" value = "2000" />
//           <Picker.Item label = "9:00 PM" value = "2100" />
//           <Picker.Item label = "10:00 PM" value = "2200" />
//           <Picker.Item label = "11:00 PM" value = "2300" />
//           </Picker>
//         </View>
//       </Animatable.View>
//     </Animatable.View>
//   )
// }
