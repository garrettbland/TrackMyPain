import React, {Component} from 'react';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

//navigation
import { NavigationActions } from 'react-navigation';

//npm packages
import Icon from 'react-native-vector-icons/Ionicons';
import { SearchBar } from 'react-native-elements'
import ActionSheet from '@yfuks/react-native-action-sheet';
import filter from 'lodash/filter';

//components
import firebaseApp from '../components/firebaseApp';

import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

const newMedRoute = NavigationActions.navigate({
  routeName: 'MedsAdd',
  params: {},
  action: NavigationActions.navigate({ routeName: 'MedsAdd'})
})

class Meds extends Component {

  static navigationOptions = ({ navigation }) => ({
      headerRight: <TouchableOpacity onPress={()=>navigation.dispatch(newMedRoute)}><Icon name={'md-add'} size={32} color={'#ffffff'} style={{marginRight:10}}/></TouchableOpacity>,
    });

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: false,
      searchText:'',
      dataSource: []
    }
    this.medsRef = firebaseApp.database().ref().child('users/123456789/meds/');
  }

  componentDidMount(){
    var data = this.makeRemoteRequest();
  }

  makeRemoteRequest() {
    this.medsRef.on('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
        items.push({
          name: child.val().name,
          amount: child.val().amount,
          _key:child.key,
        });
      });
      this.setState({
        dataSource: items,
        dataSourceClone: items,
        refreshing:false,
      });
    });
  }


  editMeds(medicationName,medicationAmount){
    this.props.editMeds(medicationName,medicationAmount);
    const editMedRoute = NavigationActions.navigate({
      routeName: 'MedsAdd',
      params: {},
      action: NavigationActions.navigate({ routeName: 'MedsAdd'})
    });
    this.props.navigation.dispatch(editMedRoute);
  }

  _onRefresh() {
    this.setState({refreshing: true});
  }

  showOptions(medicationName, medicationAmount){
    var BUTTONSiOS = [
      'Edit',
      'Delete',
      'Cancel'
    ];

    var BUTTONSandroid = [
      'Edit',
      'Delete',
    ];

    var DESTRUCTIVE_INDEX = 1;
    var CANCEL_INDEX = 2;
    var MEDICATION_NAME = medicationName;
    var MEDICATION_AMOUNT = medicationAmount

    ActionSheet.showActionSheetWithOptions({
      options: Platform.OS == 'ios' ? BUTTONSiOS : BUTTONSandroid,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
      tintColor: '#3498db',
      title: MEDICATION_NAME
    },
    (buttonIndex) => {
      if(buttonIndex == 0){
        this.editMeds(MEDICATION_NAME,MEDICATION_AMOUNT);
      }
      console.log('button clicked :', buttonIndex);
    });
  }

  setSearchText(event) {
     let searchText = event.nativeEvent.text;
     let data = this.state.dataSource;
     let dataClone = this.state.dataSourceClone;

     if(searchText !== null){
       let filteredData = this.filterMeds(searchText, dataClone);
       this.setState({
         dataSource: filteredData,
       });
     }else{
       this.setState({
         dataSource:data
       });
     }

  }

  filterMeds(searchText, data){
    let text = searchText.toLowerCase();
    console.log(text);
    return filter(data, (s) => {
      let med = s.name.toLowerCase();
      return med.search(text) !== -1;
    })

  }

  _renderItem(item){
    return (
      <View style={{width:'100%',paddingLeft:10,paddingRight:10,backgroundColor:'#ffffff',}}>
        <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',height:55,}}>
          <View>
            <Text style={{color:'#3F3F3F',fontWeight:'bold',fontSize:15}}>{item.name}</Text>
            <Text style={{color:'#3F3F3F',fontSize:12,}}>{item.amount}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={()=>this.showOptions(item.name,item.amount)}><Icon name={'ios-more'} size={28} style={{marginTop:3,paddingRight:2}} color={'#7f8c8d'} /></TouchableOpacity>
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
      <View style={{alignItems:'center',justifyContent:'center',marginTop:40}}>
        <Text style={{color:'#3F3F3F',fontSize:12,fontWeight:'bold'}}>Nothing to see here</Text>
      </View>
    )
  }

  _renderHeader = () => {
    return (
        <SearchBar
          lightTheme
          onChangeText={()=>{}}
          clearIcon={{name: 'clear'}}
          textInputRef={this.state.searchText}
          placeholder='Search...'
          inputStyle={{color:'#3F3F3F'}}
          returnKeyType={'search'}
          containerStyle={{borderTopWidth:0,borderBottomWidth:0}}
          onChange={this.setSearchText.bind(this)}
        />
    )
  }

  _handleRefresh = () => {
    this.setState({
      refreshing: true,
    }, () => {
      this.makeRemoteRequest();
    })
  }

  render(){
    return(
      <View style={{flex:1}}>
        <View style={{flex:1}}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({item})=>this._renderItem(item)}
            ItemSeparatorComponent={this._renderSeperator}
            ListEmptyComponent={this._renderEmptyList}
            ListHeaderComponent={this._renderHeader}
            keyExtractor={item => item._key}
            refreshing={this.state.refreshing}
            onRefresh={this._handleRefresh}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(Meds);
