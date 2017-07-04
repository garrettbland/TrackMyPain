import React, {Component} from 'react';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

//navigation
import { NavigationActions } from 'react-navigation';

//npm packages
import Icon from 'react-native-vector-icons/Ionicons';

import {
  View,
  Text,
  Platform,
  TextInput,
  Keyboard,
  TouchableOpacity
} from 'react-native';

class MedsAdd extends Component {

  static navigationOptions = ({ navigation }) => ({
      title: 'Add Meds',
      headerLeft: <TouchableOpacity onPress={()=>{navigation.state.params.goBack()}}><Icon name={'ios-close-circle-outline'} size={38} color={'#c0392b'} style={{marginLeft:8}}/></TouchableOpacity>,
      headerRight: <TouchableOpacity onPress={()=>{navigation.state.params.goBack()}}><Icon name={'ios-checkmark-circle-outline'} size={38} color={'#27ae60'} style={{marginRight:8}}/></TouchableOpacity>,
      headerBackTitle:null,
      tabBarLabel:'Meds',
      gesturesEnabled: false,
      headerTitleStyle:{fontWeight:'bold',fontSize:19},
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon name={focused ? 'ios-medkit' : 'ios-medkit-outline'} size={32} color={tintColor} />
      ),
    });

    constructor(props) {
      super(props);
      this.state = {
        text:'',
        amount:'',
      }
      this.goBack = this.goBack.bind(this)
    }

    componentDidMount() {
      this.props.navigation.setParams({ goBack: this.goBack });
    }

    goBack () {
      Keyboard.dismiss();
      const backAction = NavigationActions.back({

      })
      this.props.navigation.dispatch(backAction)

    }

  render(){
    return(
      <View style={{flex:1}}>
        <View style={{padding:12}}>
          <View style={{marginBottom:14}}>
            <Text style={{color:'#3F3F3F',fontSize:16,fontWeight:'bold'}}>Medication Name</Text>
            <View style={{borderColor: '#bdc3c7', borderBottomWidth: 1,marginTop:5,paddingBottom:3}}>
              <TextInput
                placeholder={''}
                style={{height: 43, fontSize:30}}
                onChangeText={(text) => this.setState({text:text})}
                value={this.state.text}
                autoFocus={true}
                maxLength = {17}
                clearButtonMode={'always'}
                returnKeyType={'done'}
              />
            </View>
          </View>
          <View style={{marginBottom:7}}>
            <Text style={{color:'#3F3F3F',fontSize:16,fontWeight:'bold'}}>Amount</Text>
            <View style={{borderColor: '#bdc3c7', borderBottomWidth: 1,marginTop:5,paddingBottom:3}}>
              <TextInput
                placeholder={''}
                style={{height: 43, fontSize:30}}
                onChangeText={(text) => this.setState({amount:text})}
                value={this.state.amount}
                maxLength = {17}
                clearButtonMode={'always'}
                returnKeyType={'done'}
              />
            </View>
          </View>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedsAdd);
