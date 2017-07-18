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
import CheckBox from 'react-native-check-box'
import filter from 'lodash/filter';
import uniqBy from 'lodash/uniqBy';
import remove from 'lodash/remove';

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

class RateMeds extends Component {

  static navigationOptions = ({ navigation }) => ({
        headerLeft: Platform.OS == 'ios' ? <TouchableOpacity style={{marginLeft:10,width:60}} onPress={()=>{navigation.state.params.goBack()}}><Icon name={'md-close'} size={32} color={'#c0392b'}/></TouchableOpacity> : null,
        headerRight: Platform.OS == 'ios' ? <TouchableOpacity style={{marginRight:10,}} onPress={()=>{navigation.state.params.setMeds()}}><Icon name={'md-checkmark'} size={32} color={'#27ae60'}/></TouchableOpacity> : null,
    });

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchText:'',
      dataSource: [],
      isMedsEmpty:false,
      medsArray:[],
    }
    this.goBack = this.goBack.bind(this);
    this.setMeds = this.setMeds.bind(this);
    this.medsRef = firebaseApp.database().ref().child('users/123456789/meds/');
  }

  componentWillMount(){
    this.props.navigation.setParams({ goBack: this.goBack, setMeds: this.setMeds });
    var data = this.makeRemoteRequest();
  }

  setMeds(){
    const backAction = NavigationActions.back({

    })
    this.props.setRateMeds(this.state.medsArray);
    this.props.navigation.dispatch(backAction)
  }

  goBack(){
    const backAction = NavigationActions.back({

    })
    this.props.navigation.dispatch(backAction)
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
      if (items.length == 0) {
        this.setState({isMedsEmpty:true});
        this.props.showMessageMeds(true,'Info','Currently no medications added. Go to the Meds tab to manage your medications','#1abc9c');
      }
      this.setState({
        dataSource: items,
        dataSourceClone: items,
      });
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
    return filter(data, (s) => {
      let med = s.name.toLowerCase();
      return med.search(text) !== -1;
    })

  }

  editMedsArray(name,amount,key){
    var cloneProps = this.state.medsArray;
    if(cloneProps){
      var keyExist = cloneProps.find(function(m){
        return m.key === key;
      })

      if(keyExist == undefined){
        cloneProps.push({name:name,amount:amount,key:key});
      }else{
        remove(cloneProps, {
          key: key
        });
      }

      uniqBy(cloneProps, function (m) {
        return m.key;
      });

      this.setState({medsArray:cloneProps});
    }
  }

  onClick(data,name,amount,key) {
    this.editMedsArray(name,amount,key);
    data.checked = !data.checked;
}

  renderCheckBox(data,name,amount,key) {
      return (
          <CheckBox
              style={{flex: 1, padding: 10}}
              onClick={()=>this.onClick(data,name,amount,key)}
              isChecked={data.checked}
              checkedIcon={'md-checkmark-circle-outline'}
              uncheckedIcon={'md-radio-button-off'}
              checkedIconColor={'#3498db'}
              uncheckedIconColor={'#95a5a6'}
          />);
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
            {this.renderCheckBox(false,item.name,item.amount,item._key)}
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
        {!this.state.isMedsEmpty &&
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
          returnKeyType={'search'}
          containerStyle={{borderTopWidth:0,borderBottomWidth:0,backgroundColor:'transparent'}}
          onChange={this.setSearchText.bind(this)}
        />
      </View>
    );
  }

  render(){
    return(
      <View style={{flex:1}}>
        <ScrollView style={{flex:1}}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({item})=>this._renderItem(item)}
            ItemSeparatorComponent={this._renderSeperator}
            ListEmptyComponent={this._renderEmptyList}
            ListHeaderComponent={this._renderHeader}
            keyExtractor={item => item._key}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(RateMeds);
