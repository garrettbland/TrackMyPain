import React, {Component} from 'react';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

//npm packages
import Icon from 'react-native-vector-icons/Ionicons';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';

class Stats extends Component {

  static navigationOptions = ({ navigation }) => ({
      headerRight: <TouchableOpacity style={{marginRight:10}} onPress={()=>{navigation.state.params.addMed()}}><Icon name={'md-calendar'} size={32} color={'#ffffff'}/></TouchableOpacity>,
    });

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <View style={{flex:1,}}>
        <ScrollView>
          <View style={{width:'100%',height:75,backgroundColor:'white',flexDirection:'row',justifyContent:'space-between',marginTop:30}}>
            <View style={{width:'70%',paddingLeft:12,justifyContent:'center'}}>
              <Text style={{fontWeight:'bold',fontSize:22,color:'#34495e',}}>Average Pain for the Last 7 Days</Text>
            </View>
            <View style={{paddingRight:12,justifyContent:'center',width:'30%'}}>
              <View style={{
                width:90,
                height:90,
                alignItems:'center',
                justifyContent:'center',
                borderRadius:45,
                borderColor:this.state.painBackgroundColor ? this.state.painBackgroundColor : '#9b59b6',
                borderWidth:2,
                backgroundColor:this.state.painBackgroundColor ? this.state.painBackgroundColor : '#9b59b6',
                shadowColor: '#000000',
                shadowOffset: {width: 0,height: 1},
                shadowRadius: 3,
                shadowOpacity: 0.7,
              }}>
              <Text style={{fontWeight:'bold',fontSize:30,color:'#ffffff'}}>{this.state.pain ? this.state.pain : 0}</Text>
            </View>
          </View>
        </View>
        <View style={{width:'100%',height:75,backgroundColor:'white',flexDirection:'row',justifyContent:'space-between',marginTop:45}}>
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
            <Text style={{fontWeight:'bold',fontSize:30,color:'#ffffff'}}>{this.state.pain ? this.state.pain : 0}</Text>
          </View>
        </View>
        <View style={{width:'65%',paddingRight:12,justifyContent:'center'}}>
          <Text style={{fontWeight:'bold',fontSize:22,color:'#34495e',}}>Average Pain for the Last 14 Days</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
