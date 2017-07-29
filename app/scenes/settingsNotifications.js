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
        reminderIntervalModal:false
      }
      this.goBack = this.goBack.bind(this);
      this.checkSnoozeZone = this.checkSnoozeZone.bind(this);
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
            AsyncStorage.setItem("reminderInterval", "60")
            this.setState({
              reminderInterval:"60"
            })
          }else{
            this.setState({
              reminderInterval:value
            })
          }
      }).done();

      //fetch local data for time start to set state
      AsyncStorage.getItem("snoozeStart").then((value) => {
          //if empty, set defaults

          if(value == null){
            AsyncStorage.setItem("snoozeStart", "2000")
            this.setState({
              snoozeStart:"2000"
            })
          }else{
            this.setState({
              snoozeStart:value
            })
          }
      }).done();

      //fetch local data for time end to set state
      AsyncStorage.getItem("snoozeEnd").then((value) => {
          //if empty, set defaults
          if(value == null){
            AsyncStorage.setItem("snoozeEnd", "0900")
            this.setState({
              snoozeEnd:"0900"
            })
          }else{
            this.setState({
              snoozeEnd:value
            })
          }
      }).done();
    }

    goBack () {
      const backAction = NavigationActions.back({})
      this.props.navigation.dispatch(backAction)
    }

    checkSnoozeZone = () => {
      AsyncStorage.setItem("notificationsEnabled", JSON.stringify(false));
      console.log("I DID SOMETHING ________________________________________");
    }

    updateEnabled = (value) => {

      if(value == true){
        //sets local notifications
        PushNotificationIOS.checkPermissions((permissions)=>{
          if(permissions.alert == false && !this.state.firstTimeNotifications){
            Alert.alert("Warning","You currently have notifications turned off for Track My Pain. Please go to Settings > Track My Pain > Notifications and 'Allow'");
            this.setState({
              enabled:false,
            })
          }
        });
        var time = moment(Date.now()).add(1, 'm').format("YYYY-MM-DDTHH:mm:ss.sssZ");
        PushNotificationIOS.requestPermissions()
        PushNotificationIOS.scheduleLocalNotification({
          fireDate:time,
          alertBody:'Time to Track your Pain',
          repeatInterval:'minute',
        });

      }else{
        //cancels all local notificaitons
        PushNotificationIOS.cancelAllLocalNotifications()
      }

      PushNotificationIOS.addEventListener('localNotification',this.checkSnoozeZone);

      AsyncStorage.setItem("notificationsEnabled", JSON.stringify(value));
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

    updateSnoozeStart(time){
      AsyncStorage.setItem("snoozeStart", time)
      this.setState({
        snoozeStart:time
      });
    }

    updateSnoozeEnd(time){
      AsyncStorage.setItem("snoozeEnd", time)
      this.setState({
        snoozeEnd:time
      });
    }

    closeAnimation(handle){
        if(handle == 'reminderIntervalModalAnimation'){
          this.setState({reminderIntervalModalAnimation:true});
        }else if (handle == 'snoozeStartModalAnimation'){
          this.setState({snoozeStartModalAnimation:true});
        }else if (handle == 'snoozeEndModalAnimation'){
          this.setState({snoozeEndModalAnimation:true});
        }
       this.timeoutHandle = setTimeout(()=>{
            this.setState({
              reminderIntervalModal:false,
              snoozeStartModal:false,
              snoozeEndModal:false,
              reminderIntervalModalAnimation:null,
              snoozeStartModalAnimation:null,
              snoozeEndModalAnimation:null,
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
      )
    }

    renderStartModal(){
      return (
        <Animatable.View animation={this.state.snoozeStartModalAnimation ? 'fadeOut' : 'fadeIn'} duration={500} style={{position:'absolute',zIndex:9,width:'100%',height:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'rgba(51, 51, 51, 0.5)'}}>
          <Animatable.View animation={this.state.snoozeStartModalAnimation ? 'fadeOutUp' : 'fadeInDown'} style={{width:'80%',height:'50%',backgroundColor:'#ffffff',borderRadius:4,}}>
            <View style={{width:'100%',height:'100%'}}>
              <View style={{width:'100%',marginTop:30}}>
                <Button title={'Done'} backgroundColor={'#3498db'} titleColor={'#ffffff'} onPress={() => this.closeAnimation('snoozeStartModalAnimation')}/>
              </View>
              <Picker selectedValue = {this.state.snoozeStart} onValueChange = {(value) => this.updateSnoozeStart(value)} style={{width:'100%'}}>
                <Picker.Item label = "1:00 AM" value = "0100" />
                <Picker.Item label = "2:00 AM" value = "0200" />
                <Picker.Item label = "3:00 AM" value = "0300" />
                <Picker.Item label = "4:00 AM" value = "0400" />
                <Picker.Item label = "5:00 AM" value = "0500" />
                <Picker.Item label = "6:00 AM" value = "0600" />
                <Picker.Item label = "7:00 AM" value = "0700" />
                <Picker.Item label = "8:00 AM" value = "0800" />
                <Picker.Item label = "9:00 AM" value = "0900" />
                <Picker.Item label = "10:00 AM" value = "1000" />
                <Picker.Item label = "11:00 AM" value = "1100" />
                <Picker.Item label = "1:00 PM" value = "1300" />
                <Picker.Item label = "2:00 PM" value = "1400" />
                <Picker.Item label = "3:00 PM" value = "1500" />
                <Picker.Item label = "4:00 PM" value = "1600" />
                <Picker.Item label = "5:00 PM" value = "1700" />
                <Picker.Item label = "6:00 PM" value = "1800" />
                <Picker.Item label = "7:00 PM" value = "1900" />
                <Picker.Item label = "8:00 PM" value = "2000" />
                <Picker.Item label = "9:00 PM" value = "2100" />
                <Picker.Item label = "10:00 PM" value = "2200" />
                <Picker.Item label = "11:00 PM" value = "2300" />
              </Picker>
            </View>
          </Animatable.View>
        </Animatable.View>
      )
    }

    renderEndModal(){
      return (
        <Animatable.View animation={this.state.snoozeEndModalAnimation ? 'fadeOut' : 'fadeIn'} duration={500} style={{position:'absolute',zIndex:9,width:'100%',height:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'rgba(51, 51, 51, 0.5)'}}>
          <Animatable.View animation={this.state.snoozeEndModalAnimation ? 'fadeOutUp' : 'fadeInDown'} style={{width:'80%',height:'50%',backgroundColor:'#ffffff',borderRadius:4,}}>
            <View style={{width:'100%',height:'100%'}}>
              <View style={{width:'100%',marginTop:30}}>
                <Button title={'Done'} backgroundColor={'#3498db'} titleColor={'#ffffff'} onPress={() => this.closeAnimation('snoozeEndModalAnimation')}/>
              </View>
              <Picker selectedValue = {this.state.snoozeEnd} onValueChange = {(value) => this.updateSnoozeEnd(value)} style={{width:'100%'}}>
              <Picker.Item label = "1:00 AM" value = "0100" />
              <Picker.Item label = "2:00 AM" value = "0200" />
              <Picker.Item label = "3:00 AM" value = "0300" />
              <Picker.Item label = "4:00 AM" value = "0400" />
              <Picker.Item label = "5:00 AM" value = "0500" />
              <Picker.Item label = "6:00 AM" value = "0600" />
              <Picker.Item label = "7:00 AM" value = "0700" />
              <Picker.Item label = "8:00 AM" value = "0800" />
              <Picker.Item label = "9:00 AM" value = "0900" />
              <Picker.Item label = "10:00 AM" value = "1000" />
              <Picker.Item label = "11:00 AM" value = "1100" />
              <Picker.Item label = "1:00 PM" value = "1300" />
              <Picker.Item label = "2:00 PM" value = "1400" />
              <Picker.Item label = "3:00 PM" value = "1500" />
              <Picker.Item label = "4:00 PM" value = "1600" />
              <Picker.Item label = "5:00 PM" value = "1700" />
              <Picker.Item label = "6:00 PM" value = "1800" />
              <Picker.Item label = "7:00 PM" value = "1900" />
              <Picker.Item label = "8:00 PM" value = "2000" />
              <Picker.Item label = "9:00 PM" value = "2100" />
              <Picker.Item label = "10:00 PM" value = "2200" />
              <Picker.Item label = "11:00 PM" value = "2300" />
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
      {this.state.snoozeStartModal &&
        this.renderStartModal()
      }
      {this.state.snoozeEndModal &&
        this.renderEndModal()
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
                  onPress={()=>this.setState({snoozeStartModal:true})}
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
                        <Text style={{color:this.state.enabled ? '#3F3F3F': '#bdc3c7',fontSize:15,}}>{moment(this.state.snoozeStart, "hh").format('h:mm A')}</Text>
                      </View>
                    </View>
                    <View>
                      <Icon name={'ios-more'} size={28} style={{marginTop:3}} color={this.state.enabled ? '#7f8c8d': '#bdc3c7'} />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={!this.state.enabled}
                  onPress={()=>this.setState({snoozeEndModal:true})}
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
                        <Text style={{color:this.state.enabled ? '#3F3F3F': '#bdc3c7',fontSize:15,}}>{moment(this.state.snoozeEnd, "hh").format('h:mm A')}</Text>
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
