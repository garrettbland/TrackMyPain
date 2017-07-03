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
  ScrollView
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

class SettingsNotifications extends Component {

  static navigationOptions = ({ navigation }) => ({
      title: 'Notifications',
      headerBackTitle:null,
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon name={focused ? 'ios-options' : 'ios-options-outline'} size={32} color={tintColor} />
      ),
      headerLeft: Platform.OS == 'ios' ? <Icon name={'ios-arrow-dropleft'} size={30} color={'rgb(14,122,254)'} style={{marginLeft:8}} onPress={()=>{navigation.state.params.goBack()}}/> : null,
      tabBarLabel:'Settings',
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
      <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff'}}>
        <Text>NOTIFICATIONS</Text>
        <Switch
          onValueChange={this.updateEnabled}
          style={{marginBottom: 1}}
          value={this.state.noticationsEnabled}
        />
        <Animated.View style={{ transform: [{translateX: this.state.offsetX}], width:'100%' }}>
        <Text>Reminder Interval: {this.state.timeInterval}</Text>
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
              <Animatable.View animation="fadeIn" style={{width:'100%'}}>
                <Picker selectedValue = {this.state.timeInterval} onValueChange = {this.updateTimeInterval} style={{width:'100%'}}>
                  <Picker.Item label = "DISABLED" value = "DISABLED" />
                </Picker>
              </Animatable.View>
            }

        <Text>SLEEP MODE</Text>
        </Animated.View>
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
