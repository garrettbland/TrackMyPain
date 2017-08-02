import React, {Component} from 'react';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

//npm packages
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

//navigation
import { NavigationActions, addNavigationHelpers } from 'react-navigation';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';

class Stats extends Component {

  static navigationOptions = ({ navigation }) => ({
      headerRight: <TouchableOpacity style={{marginRight:10}} onPress={()=>console.log("test")}><Icon name={'md-share'} size={32} color={'#ffffff'}/></TouchableOpacity>,
    });

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render(){

    var navigateAction = NavigationActions.navigate({

      routeName: this.props.route,

      params: {},

      action: NavigationActions.navigate({ routeName: 'StatsLog'})
    });

    return(
      <View style={{flex:1,}}>
        <ScrollView>

          <Animatable.View animation="fadeInDown" delay={60} style={{width:'100%',height:75,flexDirection:'row',justifyContent:'space-between',marginTop:30}}>
            <View style={{width:'65%',paddingLeft:12,justifyContent:'center'}}>
              <Text style={{fontWeight:'bold',fontSize:22,color:'#34495e',}}>Average Pain for Today</Text>
            </View>
            <View style={{paddingRight:12,justifyContent:'center',width:'35%'}}>
              <View style={{
                width:90,
                height:90,
                alignItems:'center',
                justifyContent:'center',
                borderRadius:45,
                borderColor:this.state.painBackgroundColor ? this.state.painBackgroundColor : '#8e44ad',
                borderWidth:2,
                backgroundColor:this.state.painBackgroundColor ? this.state.painBackgroundColor : '#8e44ad',
                shadowColor: '#000000',
                shadowOffset: {width: 0,height: 1},
                shadowRadius: 3,
                shadowOpacity: 0.7,
              }}>
              <Text style={{fontWeight:'bold',fontSize:30,color:'#ffffff'}}>{this.state.pain ? this.state.pain : 0}</Text>
            </View>
          </View>
        </Animatable.View>

        <Animatable.View animation="fadeInDown" delay={120} style={{width:'100%',height:75,flexDirection:'row',justifyContent:'space-between',marginTop:50}}>
        <View style={{width:'65%',paddingLeft:12,justifyContent:'center'}}>
          <Text style={{fontWeight:'bold',fontSize:22,color:'#34495e',}}>Average Pain for Yesterday</Text>
        </View>
          <View style={{paddingRight:12,justifyContent:'center',width:'35%'}}>
            <View style={{
              width:90,
              height:90,
              alignItems:'center',
              justifyContent:'center',
              borderRadius:45,
              borderColor:this.state.painBackgroundColor ? this.state.painBackgroundColor : '#e67e22',
              borderWidth:2,
              backgroundColor:this.state.painBackgroundColor ? this.state.painBackgroundColor : '#e67e22',
              shadowColor: '#000000',
              shadowOffset: {width: 0,height: 1},
              shadowRadius: 3,
              shadowOpacity: 0.7,
            }}>
            <Text style={{fontWeight:'bold',fontSize:30,color:'#ffffff'}}>{this.state.pain ? this.state.pain : 0}</Text>
          </View>
        </View>
      </Animatable.View>

          <Animatable.View animation="fadeInDown" delay={180} style={{width:'100%',height:75,flexDirection:'row',justifyContent:'space-between',marginTop:50}}>
            <View style={{width:'65%',paddingLeft:12,justifyContent:'center'}}>
              <Text style={{fontWeight:'bold',fontSize:22,color:'#34495e',}}>Average Pain for the Last 7 Days</Text>
            </View>
            <View style={{paddingRight:12,justifyContent:'center',width:'35%'}}>
              <View style={{
                width:90,
                height:90,
                alignItems:'center',
                justifyContent:'center',
                borderRadius:45,
                borderColor:this.state.painBackgroundColor ? this.state.painBackgroundColor : '#1abc9c',
                borderWidth:2,
                backgroundColor:this.state.painBackgroundColor ? this.state.painBackgroundColor : '#1abc9c',
                shadowColor: '#000000',
                shadowOffset: {width: 0,height: 1},
                shadowRadius: 3,
                shadowOpacity: 0.7,
              }}>
              <Text style={{fontWeight:'bold',fontSize:30,color:'#ffffff'}}>{this.state.pain ? this.state.pain : 0}</Text>
            </View>
          </View>
        </Animatable.View>

        <Animatable.View animation="fadeInDown" delay={240} style={{width:'100%',height:75,flexDirection:'row',justifyContent:'space-between',marginTop:50}}>
          <View style={{width:'65%',paddingLeft:12,justifyContent:'center'}}>
            <Text style={{fontWeight:'bold',fontSize:22,color:'#34495e',}}>Average Pain for the Last 30 Days</Text>
          </View>
          <View style={{paddingRight:12,justifyContent:'center',width:'35%'}}>
            <View style={{
              width:90,
              height:90,
              alignItems:'center',
              justifyContent:'center',
              borderRadius:45,
              borderColor:this.state.painBackgroundColor ? this.state.painBackgroundColor : '#3498db',
              borderWidth:2,
              backgroundColor:this.state.painBackgroundColor ? this.state.painBackgroundColor : '#3498db',
              shadowColor: '#000000',
              shadowOffset: {width: 0,height: 1},
              shadowRadius: 3,
              shadowOpacity: 0.7,
            }}>
            <Text style={{fontWeight:'bold',fontSize:30,color:'#ffffff'}}>{this.state.pain ? this.state.pain : 0}</Text>
          </View>
        </View>
      </Animatable.View>

      <Animatable.View animation="fadeInDown" delay={300}>
        <TouchableOpacity onPress={()=>this.props.navigation.dispatch(navigateAction)}>
          <View style={{width:'100%',height:75,backgroundColor:'white',flexDirection:'row',justifyContent:'space-between',marginTop:50,marginBottom:30}}>
            <View style={{paddingLeft:12,justifyContent:'center',width:'35%'}}>
              <View style={{
                width:90,
                height:90,
                alignItems:'center',
                justifyContent:'center',
                borderRadius:45,
                borderColor:this.state.painBackgroundColor ? this.state.painBackgroundColor : '#27ae60',
                borderWidth:2,
                backgroundColor:this.state.painBackgroundColor ? this.state.painBackgroundColor : '#27ae60',
                shadowColor: '#000000',
                shadowOffset: {width: 0,height: 1},
                shadowRadius: 3,
                shadowOpacity: 0.7,
              }}>
              <Icon name={'md-list'} size={32} color={'#ffffff'}/>
            </View>
          </View>
          <View style={{width:'50%',justifyContent:'center'}}>
            <Text style={{fontWeight:'bold',fontSize:22,color:'#34495e',}}>View Log</Text>
          </View>
          <View style={{width:'15%',paddingRight:12,justifyContent:'center'}}>
            <Icon name={'ios-arrow-forward'} size={40} style={{marginTop:4}} color={'#34495e'}/>
          </View>
        </View>
        </TouchableOpacity>
      </Animatable.View>

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

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
