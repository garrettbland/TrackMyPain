import React, {Component} from 'react';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

//navigation
import { NavigationActions } from 'react-navigation';

//npm packages
import Icon from 'react-native-vector-icons/Ionicons';

//components
import SettingsInfoListItem from '../components/settingsInfoListItem';
import Button from '../components/button';

import {
  View,
  Text,
  Platform,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

class SettingsProfile extends Component {

  static navigationOptions = ({ navigation }) => ({
      headerLeft: <TouchableOpacity onPress={()=>{navigation.state.params.goBack()}}><Icon name={'md-arrow-round-back'} size={32} color={'#ffffff'} style={{marginLeft:10,width:60}}/></TouchableOpacity>,
  });

    constructor(props) {
      super(props);
      this.state = {

      }
      this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
      this.props.navigation.setParams({ goBack: this.goBack });
    }

    goBack () {
      const backAction = NavigationActions.back({

      })
      this.props.navigation.dispatch(backAction)

    }

    handleLogOut(){
      console.log("Log out");
    }

  render(){
    return(
      <View style={{flex:1}}>
        <ScrollView>
        <View style={{paddingLeft:10,paddingRight:10,paddingBottom:3,marginTop:14}}>
          <Text style={{color:'#3F3F3F',fontSize:12}}>Your ID and Secret Key are used to recover your data if you lose or switch devices. Write this down for safe keeping.</Text>
        </View>
          <View style={{marginTop:4}}>
            <SettingsInfoListItem header={'ID'} subHeader={'9918128'}/>
            <SettingsInfoListItem header={'Secret Key'} subHeader={'a4ndn49fn4*$n3n^&DB'}/>
          </View>

          <View style={{marginTop:15}}>
            <Button title={'Reset All Data'} backgroundColor={'#e74c3c'} titleColor={'#ffffff'} onPress={() => this.handleLogOut()}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsProfile);
