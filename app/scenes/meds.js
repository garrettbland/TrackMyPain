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

import {
  View,
  Text,
  Platform,
  Button,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';

const navigateAction = NavigationActions.navigate({

  routeName: 'MedsAdd',

  params: {},

  action: NavigationActions.navigate({ routeName: 'MedsAdd'})
})

class Meds extends Component {

  static navigationOptions = ({ navigation }) => ({
      title: 'Meds',
      headerBackTitle:null,
      headerTitleStyle:{fontWeight:'bold',fontSize:19,color:'#ffffff'},
      headerStyle:{backgroundColor:'#3498db',borderBottomWidth:0},
      headerRight: <TouchableOpacity onPress={()=>navigation.dispatch(navigateAction)}><Icon name={'md-add'} size={32} color={'#ffffff'} style={{marginRight:10}}/></TouchableOpacity>,
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon name={focused ? 'ios-medkit' : 'ios-medkit-outline'} size={32} color={tintColor} />
      ),
      tabBarLabel:'Meds',
    });

  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      searchText:'',
    }
  }

  componentDidMount(){
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed} = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=8`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false, refreshing:false });
      });
  }

  _onRefresh() {
    this.setState({refreshing: true});
  }

  _renderItem(item){
    return (
      <View
        style={{
          width:'100%',
          paddingLeft:10,
          paddingRight:10,
          backgroundColor:'#ffffff',
        }}
      >
        <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',height:55,}}>
          <View>
            <Text style={{color:'#3F3F3F',fontWeight:'bold',fontSize:15}}>{item.name.first}</Text>
            <Text style={{color:'#3F3F3F',fontSize:12,}}>10mg</Text>
          </View>
          <View>
            <Icon name={'ios-more'} size={28} style={{marginTop:3,paddingRight:2}} color={'#7f8c8d'} />
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
        <Text style={{color:'#3F3F3F',fontSize:12,}}>No medications added yet</Text>
      </View>
    )
  }

  _renderHeader = () => {
    return (

        <SearchBar
          onChangeText={()=>{}}
          clearIcon={{name: 'clear'}}
          textInputRef={this.state.searchText}
          placeholder='Search...'
          inputStyle={{color:'#ffffff'}}
          returnKeyType={'search'}
          containerStyle={{borderTopWidth:0,borderBottomWidth:0}}
        />

    )
  }

  _handleRefresh = () => {
    this.setState({
      page:1,
      refreshing: true,
      seed:this.state.seed + 1
    }, () => {
      this.makeRemoteRequest();
    })
  }

  render(){
    return(
      <View style={{flex:1}}>
        <View style={{flex:1}}>
          <FlatList
            data={this.state.data}
            renderItem={({item})=>this._renderItem(item)}
            ItemSeparatorComponent={this._renderSeperator}
            ListEmptyComponent={this._renderEmptyList}
            ListHeaderComponent={this._renderHeader}
            keyExtractor={item => item.email}
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
// refreshControl={
//   <RefreshControl
//     refreshing={this.state.refreshing}
//     onRefresh={this._onRefresh.bind(this)}
//   />
// }
