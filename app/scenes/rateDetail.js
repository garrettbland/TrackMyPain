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
import FormInput from '../components/formInput';
import Button from '../components/button';

import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Keyboard,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

const navigateAction = NavigationActions.navigate({

  routeName: 'RateMeds',

  params: {},

  action: NavigationActions.navigate({ routeName: 'RateMeds'})
})

class RateDetail extends Component {

  static navigationOptions = ({ navigation }) => ({
      headerLeft: Platform.OS == 'ios' ? <TouchableOpacity onPress={()=>{navigation.state.params.goBack()}} style={{marginLeft:10,width:60}}><Icon name={'md-close'} size={32} color={'#c0392b'}/></TouchableOpacity> : null,
      headerRight: Platform.OS == 'ios' ? <TouchableOpacity style={{marginRight:10,}} onPress={()=>{navigation.state.params.goBack()}}><Icon name={'md-checkmark'} size={32} color={'#27ae60'}/></TouchableOpacity> : null,
    });


  constructor(props) {
    super(props);
    this.state = {
      notes:'',
      pain:this.props.user.pain,
      painBackgroundColor:this.props.user.painBackgroundColor,
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

  _renderItem(item){
    return (
      <View style={{width:'100%',paddingLeft:10,paddingRight:10,backgroundColor:'#ffffff',}}>
        <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',height:55,}}>
          <View>
            <Text style={{color:'#3F3F3F',fontWeight:'bold',fontSize:15}}>{item.name}</Text>
            <Text style={{color:'#3F3F3F',fontSize:12,}}>{item.amount}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={()=>this.showOptions(item.name,item.amount,item._key)}><Icon name={'md-close'} size={28} style={{marginTop:3,paddingRight:2}} color={'#c0392b'} /></TouchableOpacity>
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
      <View style={{width:'100%',paddingLeft:12,paddingRight:10,backgroundColor:'#ffffff',}}>
        <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',height:55,}}>
          <View>
            <Text style={{color:'#95a5a6',fontSize:15}}>No Medications Added</Text>
          </View>
          <View>

          </View>
        </View>
      </View>
    )
  }

  _renderHeader = () => {
    return (
      <View style={{
        height:Platform.OS == 'ios' ? StyleSheet.hairlineWidth : 1,
        width:'100%',
        backgroundColor:'#bdc3c7',
      }}/>
    );
  }

  _renderFooter = () => {
    return (
      <View style={{
        height:Platform.OS == 'ios' ? StyleSheet.hairlineWidth : 1,
        width:'100%',
        backgroundColor:'#bdc3c7',
      }}/>
    );
  }

  render(){
    return(
      <View style={{flex:1,backgroundColor:'#f1f1f1'}}>
        <ScrollView>
          <View style={{padding:12,alignItems:'center',}}>
            <View style={{width:90,height:90,alignItems:'center',justifyContent:'center',borderRadius:45,borderColor:this.state.painBackgroundColor,borderWidth:2,backgroundColor:this.state.painBackgroundColor}}>
              <Text style={{fontWeight:'bold',fontSize:30,color:'#ffffff'}}>{this.state.pain}</Text>
            </View>
          </View>
          <View style={{width:'100%',marginTop:12,padding:12}}>
            <FormInput underlineColor={'#bdc3c7'} label={'Notes'} fontSize={20} placeholder={'Custom Note'} onChangeText={(text) => this.setState({notes:text})} autoFocus={false} value={this.state.notes} maxLength={200}/>
          </View>
          <View style={{paddingLeft:12,marginBottom:3}}>
            <Text style={{color:'#3F3F3F',fontSize:16,fontWeight:'bold'}}>Medications</Text>
          </View>
          {!this.props.user.medsArray &&
            <View style={{width:'100%',paddingLeft:12,paddingRight:12}}>
              <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',height:40,}}>
                <View>
                  <Text style={{color:'#95a5a6',fontSize:15}}>No Medications Added</Text>
                </View>
                <View>

                </View>
              </View>
            </View>
          }
          {this.props.user.medsArray &&
            <FlatList
              data={this.props.user.medsArray}
              renderItem={({item})=>this._renderItem(item)}
              ItemSeparatorComponent={this._renderSeperator}
              ListEmptyComponent={this._renderEmptyList}
              ListHeaderComponent={this._renderHeader}
              ListFooterComponent={this._renderFooter}
              keyExtractor={item => item.key}
            />
          }
          <View style={{width:'100%',marginTop:12,marginBottom:12,padding:12}}>
            <Button title={'Add Medications'} backgroundColor={'#3498db'} titleColor={'#ffffff'} onPress={()=>this.props.navigation.dispatch(navigateAction)}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(RateDetail);
