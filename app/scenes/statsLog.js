import React, {Component} from 'react';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

//npm packages
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { SearchBar } from 'react-native-elements'
import ActionSheet from '@yfuks/react-native-action-sheet';
import filter from 'lodash/filter';

//navigation
import { NavigationActions, addNavigationHelpers } from 'react-navigation';

//components
import firebaseApp from '../components/firebaseApp';
import CustomAlert from '../components/alert';

import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

class StatsLog extends Component {

  static navigationOptions = ({ navigation }) => ({
      headerLeft: <TouchableOpacity onPress={()=>{navigation.state.params.goBack()}}><Icon name={'md-arrow-round-back'} size={32} color={'#ffffff'} style={{marginLeft:10,width:60}}/></TouchableOpacity>,
  });

    constructor(props) {
      super(props);
      this.state = {
        data: [],
        searchText:'',
        dataSource: [],
        isRatesEmpty:false,
      }
      this.goBack = this.goBack.bind(this);
      this.ratesRef = firebaseApp.database().ref().child('users/' + 123456789 +'/rates/');
    }

    goBack () {
      const backAction = NavigationActions.back({})
      this.props.navigation.dispatch(backAction)
    }

    componentDidMount() {
      this.props.navigation.setParams({ goBack: this.goBack });
      var data = this.makeRemoteRequest();
    }

    makeRemoteRequest() {
      this.ratesRef.on('value', (snap) => {
        var items = [];
        snap.forEach((child) => {
          items.push({
            meds: child.val().meds,
            note: child.val().note,
            pain: child.val().pain,
            timestamp: child.val().timestamp,
            _key:child.key,
          });
        });
        if (items.length == 0) {
          this.setState({isRatesEmpty:true});
          this.props.showMessageMeds(true,'Info','Currently no rates. Tap the heart icon in the bottom left to start tracking your pain','#1abc9c');
        }
        this.setState({
          dataSource: items,
          dataSourceClone: items,
        });
      });
    }

    deleteRate(rateID){
      this.medsRefDelete = firebaseApp.database().ref('users/' + 123456789 +'/rates/').child(rateID);
      this.medsRefDelete.remove();
      this.props.showMessageMeds(true,'Success','Rate was successfully removed','#f39c12');
    }

    showOptions(rateID){
      var BUTTONSiOS = [
        'Delete',
        'Cancel'
      ];

      var BUTTONSandroid = [
        'Edit',
        'Delete',
      ];

      var DESTRUCTIVE_INDEX = 1;
      var CANCEL_INDEX = 2;
      var RATE_KEY = rateID;

      ActionSheet.showActionSheetWithOptions({
        options: Platform.OS == 'ios' ? BUTTONSiOS : BUTTONSandroid,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        tintColor: '#3498db',
        title: RATE_KEY
      },
      (buttonIndex) => {
        if (buttonIndex == 0){
          Alert.alert(
            'Confirm',
            'Are you sure you want to delete this rating?',
            [
              {text: 'Confirm Delete', onPress: () => this.deleteRate(RATE_KEY)},
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
          )
        }
      });
    }

    setSearchText(event) {
       let searchText = event.nativeEvent.text;
       let data = this.state.dataSource;
       let dataClone = this.state.dataSourceClone;

       if(searchText !== null){
         let filteredData = this.filterRates(searchText, dataClone);
         this.setState({
           dataSource: filteredData,
         });
       }else{
         this.setState({
           dataSource:data
         });
       }

    }

    filterRates(searchText, data){
      let text = searchText.toLowerCase();
      console.log(text);
      return filter(data, (s) => {
        if(s.note){
          var med = s.note.toLowerCase();
        }else{
          var med = ''
        }
        return med.search(text) !== -1;
      })

    }

    _renderItem(item){
      return (
        <View style={{width:'100%',paddingLeft:10,paddingRight:10,backgroundColor:'#ffffff',}}>
          <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',height:55,}}>
            <View>
              <Text style={{color:'#3F3F3F',fontWeight:'bold',fontSize:15}}>{item.pain}</Text>
              <Text style={{color:'#3F3F3F',fontSize:12,}}>{item.note}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={()=>this.showOptions(item._key)}><Icon name={'ios-more'} size={28} style={{marginTop:3,paddingRight:2}} color={'#7f8c8d'} /></TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }

    _renderSeperator = () => {
      return (
        <View style={{
          height:Platform.OS == 'ios' ? StyleSheet.hairlineWidth : 1,
          width:'100%',
          backgroundColor:'#bdc3c7',
        }}/>
      )
    }

    _renderEmptyList = () => {
      return (
        <View style={{alignItems:'center',justifyContent:'center',marginTop:40,paddingLeft:20,paddingRight:20}}>
          {!this.state.isRatesEmpty &&
            <ActivityIndicator
              animating={this.state.animating}
              size="small"
              color='#3F3F3F'
            />
          }
        </View>
      )
    }

    _renderHeader = () => {
      return (
        <View>
          <SearchBar
            lightTheme
            onChangeText={()=>{}}
            clearIcon={{name: 'clear'}}
            textInputRef={this.state.searchText}
            placeholder='Search...'
            inputStyle={{color:'#3F3F3F'}}
            returnKeyType={'done'}
            containerStyle={{borderTopWidth:0,borderBottomWidth:0,backgroundColor:'transparent'}}
            onChange={this.setSearchText.bind(this)}
          />
        </View>
      );
    }

  render(){
    return(
      <View style={{flex:1}}>
        {this.props.user.showMessageMed &&
            <CustomAlert title={this.props.user.alertTitle} message={this.props.user.alertText} backgroundColor={this.props.user.alertColor} animation={'fadeInDown'}/>
        }
          <FlatList
            data={this.state.dataSource}
            renderItem={({item})=>this._renderItem(item)}
            ItemSeparatorComponent={this._renderSeperator}
            ListEmptyComponent={this._renderEmptyList}
            ListHeaderComponent={this._renderHeader}
            keyExtractor={item => item._key}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(StatsLog);
