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
      headerRight: <TouchableOpacity onPress={()=>navigation.dispatch(navigateAction)}><Icon name={'ios-add-circle-outline'} size={38} color={'#ffffff'} style={{marginRight:10}}/></TouchableOpacity>,
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
    }
  }

  componentDidMount(){
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed} = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
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
        <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',height:47,}}>
          <View>
            <Text style={{color:'#3F3F3F',fontWeight:'bold',fontSize:15}}>{item.name.first}</Text>
          </View>
          <View>
            <Text style={{color:'#3F3F3F',fontSize:12,}}>10mg</Text>
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
      <View style={{alignItems:'center',justifyContent:'center'}}>
        <Text>Your medications will be shown here when added</Text>
      </View>
    )
  }

  _renderHeader = () => {
    return (
      <View style={{paddingTop:12,borderBottomWidth:Platform.OS == 'ios' ? StyleSheet.hairlineWidth : 1,borderColor:'#bdc3c7',}}>
      </View>
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
        <View>
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
