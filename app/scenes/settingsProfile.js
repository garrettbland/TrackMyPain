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
import ActionSheet from '@yfuks/react-native-action-sheet';
import firebaseApp from '../components/firebaseApp';

import {
  View,
  Text,
  Platform,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
  AsyncStorage,
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

    componentWillMount(){
      AsyncStorage.getItem("userID").then((value) => {
        if(value == null){
          Alert.alert("Uh oh :(", "Something went wrong when reading your data. Please close the app and try again")
        }else{
          this.setState({userID:value})
        }
      }).done();
    }

    componentDidMount() {
      this.props.navigation.setParams({ goBack: this.goBack });
    }

    goBack () {
      const backAction = NavigationActions.back({

      })
      this.props.navigation.dispatch(backAction)

    }

    resetData(){
      this.medsRefDelete = firebaseApp.database().ref('users/').child(this.state.userID)
      this.medsRefDelete.remove();
      Alert.alert("Success","User data was successfully reset")
    }

    showOptions(){
      Alert.alert(
        'Confirm',
        'Are you sure you want to reset all user data? This cannot be reversed.',
        [
          {text: 'Confirm Reset', onPress: () => this.resetData(this.state.userID)},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ],
      )
    }

  render(){
    return(
      <View style={{flex:1}}>
        <ScrollView>
        <View style={{paddingLeft:10,paddingRight:10,paddingBottom:3,marginTop:14}}>
          <Text style={{color:'#3F3F3F',fontSize:12}}>Tab the button below to reset all your stats, rates, and meds. Does not modify any notification settings.</Text>
        </View>

          <View style={{marginTop:15}}>
            <Button title={'Reset All Data'} backgroundColor={'#e74c3c'} titleColor={'#ffffff'} onPress={() => this.showOptions()}/>
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
