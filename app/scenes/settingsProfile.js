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

class SettingsProfile extends Component {

  static navigationOptions = ({ navigation }) => ({
      title: 'Profile',
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


  render(){
    return(
      <View style={{flex:1,marginTop:1}}>
        <ScrollView>
        <View style={{
          marginTop:11,
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
        }}>
          <View>
            <Text style={{fontSize:16,color:'#3F3F3F',fontWeight:'bold'}}>Username</Text>
          </View>
          <View>
            <Text style={{color:'#3F3F3F',fontSize:12,}}>gmorganbland@gmail.com</Text>
          </View>
        </View>

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
          height:48
        }}>
          <View>
            <Text style={{fontSize:16,color:'#3F3F3F',fontWeight:'bold'}}>Membership</Text>
          </View>
          <View>
            <Text style={{color:'#3F3F3F',fontSize:12,}}>Premium</Text>
          </View>
        </View>

        <TouchableOpacity style={{alignItems:'center'}} activeOpacity={0.6}>
          <View style={{backgroundColor:'#2980b9',width:'80%',height:55,borderRadius:4,overflow:'hidden',justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:16,color:'#ffffff'}}>Sign Out</Text>
          </View>
        </TouchableOpacity>

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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsProfile);
