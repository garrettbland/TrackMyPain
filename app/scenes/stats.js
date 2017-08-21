import React, {Component} from 'react';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

//npm packages
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';

//components
import firebaseApp from '../components/firebaseApp';

//navigation
import { NavigationActions, addNavigationHelpers } from 'react-navigation';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  AsyncStorage,
  Alert,
} from 'react-native';

class Stats extends Component {

  static navigationOptions = ({ navigation }) => ({
      headerRight: <TouchableOpacity onPress={()=>{navigation.state.params.refreshStats()}}><Icon name={'md-refresh'} size={30} color={'#ffffff'} style={{marginRight:10}}/></TouchableOpacity>,
  });

  constructor(props) {
    super(props);
    this.state = {
      animating:true,
      loading:false,
      startToday : moment().startOf('day').valueOf().toString(),
      endToday : moment().endOf('day').valueOf().toString(),
      startYesterday : moment().subtract(1, 'days').startOf('day').valueOf().toString(),
      endYesterday : moment().subtract(1, 'days').endOf('day').valueOf().toString(),
      start7DaysAgo : moment().subtract(7, 'days').startOf('day').valueOf().toString(),
      start30DaysAgo : moment().subtract(30, 'days').startOf('day').valueOf().toString(),
    }
    this.getAverages = this.getAverages.bind(this);
  }


  componentDidMount(){
    this.props.navigation.setParams({ refreshStats: this.getAverages });
    AsyncStorage.getItem("userID").then((value) => {
      if(value == null){
        Alert.alert("Uh oh :(", "Something went wrong when reading your data. Please close the app and try again")
        this.setState({newUserModal:true})
      }else{
        this.setState({userID:value})
      }
    }).done();
    this.getAverages();
  }

  getAverages(){
    this.setState({loading:true})
    this.timeoutHandle = setTimeout(()=>{
        this.calculateAverage(this.state.startToday,this.state.endToday,1,this.state.userID)
        this.calculateAverage(this.state.startYesterday,this.state.endYesterday,2,this.state.userID)
        this.calculateAverage(this.state.start7DaysAgo,this.state.endToday,3,this.state.userID)
        this.calculateAverage(this.state.start30DaysAgo,this.state.endToday,4,this.state.userID)
        this.setState({loading:false})
    }, 750);
  }

  calculateAverage(startTime,endTime,time,userID){
    var ref = firebaseApp.database().ref('users/' + userID +'/rates/');
    var averageRef = ref.orderByKey().startAt(startTime).endAt(endTime);
    averageRef.once('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
        items.push({
          pain: child.val().pain,
        });
      });
      var averageArray = items.map(function(item){
        return item.pain
      })

      if(averageArray.length){
        var sum = averageArray.reduce(function(a,b) {return a + b});
        var avg = sum / averageArray.length;
        var avgRounded = Math.round( avg * 10) / 10;
        switch (time){
          case 1:
            this.setState({averageToday:avgRounded})
          case 2:
            this.setState({averageYesterday:avgRounded})
          case 3:
            this.setState({averageLast7Days:avgRounded})
          case 4:
            this.setState({averageLast30Days:avgRounded})
          default:

        }
      }else{
        switch (time){
          case 1:
            this.setState({averageToday:'Na'})
          case 2:
            this.setState({averageYesterday:'Na'})
          case 3:
            this.setState({averageLast7Days:'Na'})
          case 4:
            this.setState({averageLast30Days:'Na'})
          default:

        }
      }
    });
  }


  render(){

    var navigateAction = NavigationActions.navigate({
      routeName: this.props.route,
      params: {},
      action: NavigationActions.navigate({ routeName: 'StatsLog', userID: this.state.userID})
    });

    return(
      <View style={{flex:1,}}>
        <ScrollView>

          <Animatable.View animation="fadeInDown" delay={60} style={{width:'100%',height:75,flexDirection:'row',justifyContent:'space-between',marginTop:30}}>
            <View style={{width:'65%',paddingLeft:12,justifyContent:'center'}}>
              <Text style={{fontWeight:'bold',fontSize:22,color:'#34495e',}}>Average Pain for Today</Text>
            </View>
            <View style={{paddingRight:12,justifyContent:'center',width:'35%'}}>
              <View style={{
                width:90,
                height:90,
                alignItems:'center',
                justifyContent:'center',
                borderRadius:45,
                borderColor:this.state.painBackgroundColor ? this.state.painBackgroundColor : '#8e44ad',
                borderWidth:2,
                backgroundColor:this.state.painBackgroundColor ? this.state.painBackgroundColor : '#8e44ad',
                shadowColor: '#000000',
                shadowOffset: {width: 0,height: 1},
                shadowRadius: 3,
                shadowOpacity: 0.7,
              }}>
              {this.state.averageToday !== null &&
                <Text style={{fontWeight:'bold',fontSize:30,color:'#ffffff'}}>{this.state.averageToday}</Text>
              }

            </View>
          </View>
        </Animatable.View>

        <Animatable.View animation="fadeInDown" delay={120} style={{width:'100%',height:75,flexDirection:'row',justifyContent:'space-between',marginTop:50}}>
        <View style={{width:'65%',paddingLeft:12,justifyContent:'center'}}>
          <Text style={{fontWeight:'bold',fontSize:22,color:'#34495e',}}>Average Pain for Yesterday</Text>
        </View>
          <View style={{paddingRight:12,justifyContent:'center',width:'35%'}}>
            <View style={{
              width:90,
              height:90,
              alignItems:'center',
              justifyContent:'center',
              borderRadius:45,
              borderColor:this.state.painBackgroundColor ? this.state.painBackgroundColor : '#e67e22',
              borderWidth:2,
              backgroundColor:this.state.painBackgroundColor ? this.state.painBackgroundColor : '#e67e22',
              shadowColor: '#000000',
              shadowOffset: {width: 0,height: 1},
              shadowRadius: 3,
              shadowOpacity: 0.7,
            }}>
            <Text style={{fontWeight:'bold',fontSize:30,color:'#ffffff'}}>{this.state.averageYesterday}</Text>
          </View>
        </View>
      </Animatable.View>

          <Animatable.View animation="fadeInDown" delay={180} style={{width:'100%',height:75,flexDirection:'row',justifyContent:'space-between',marginTop:50}}>
            <View style={{width:'65%',paddingLeft:12,justifyContent:'center'}}>
              <Text style={{fontWeight:'bold',fontSize:22,color:'#34495e',}}>Average Pain for the Last 7 Days</Text>
            </View>
            <View style={{paddingRight:12,justifyContent:'center',width:'35%'}}>
              <View style={{
                width:90,
                height:90,
                alignItems:'center',
                justifyContent:'center',
                borderRadius:45,
                borderColor:this.state.painBackgroundColor ? this.state.painBackgroundColor : '#1abc9c',
                borderWidth:2,
                backgroundColor:this.state.painBackgroundColor ? this.state.painBackgroundColor : '#1abc9c',
                shadowColor: '#000000',
                shadowOffset: {width: 0,height: 1},
                shadowRadius: 3,
                shadowOpacity: 0.7,
              }}>
              <Text style={{fontWeight:'bold',fontSize:30,color:'#ffffff'}}>{this.state.averageLast7Days}</Text>
            </View>
          </View>
        </Animatable.View>

        <Animatable.View animation="fadeInDown" delay={240} style={{width:'100%',height:75,flexDirection:'row',justifyContent:'space-between',marginTop:50}}>
          <View style={{width:'65%',paddingLeft:12,justifyContent:'center'}}>
            <Text style={{fontWeight:'bold',fontSize:22,color:'#34495e',}}>Average Pain for the Last 30 Days</Text>
          </View>
          <View style={{paddingRight:12,justifyContent:'center',width:'35%'}}>
            <View style={{
              width:90,
              height:90,
              alignItems:'center',
              justifyContent:'center',
              borderRadius:45,
              borderColor:this.state.painBackgroundColor ? this.state.painBackgroundColor : '#3498db',
              borderWidth:2,
              backgroundColor:this.state.painBackgroundColor ? this.state.painBackgroundColor : '#3498db',
              shadowColor: '#000000',
              shadowOffset: {width: 0,height: 1},
              shadowRadius: 3,
              shadowOpacity: 0.7,
            }}>
            <Text style={{fontWeight:'bold',fontSize:30,color:'#ffffff'}}>{this.state.averageLast30Days}</Text>
          </View>
        </View>
      </Animatable.View>

      <Animatable.View animation="fadeInDown" delay={300}>
        <TouchableOpacity onPress={()=>this.props.navigation.dispatch(navigateAction)}>
          <View style={{width:'100%',height:75,backgroundColor:'white',flexDirection:'row',justifyContent:'space-between',marginTop:50,marginBottom:30}}>
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
              <Icon name={'md-list'} size={32} color={'#ffffff'}/>
            </View>
          </View>
          <View style={{width:'50%',justifyContent:'center'}}>
            <Text style={{fontWeight:'bold',fontSize:22,color:'#34495e',}}>View Log</Text>
          </View>
          <View style={{width:'15%',paddingRight:12,justifyContent:'center'}}>
            <Icon name={'ios-arrow-forward'} size={40} style={{marginTop:4}} color={'#34495e'}/>
          </View>
        </View>
        </TouchableOpacity>
      </Animatable.View>

      </ScrollView>
      <StatusBar networkActivityIndicatorVisible={this.state.loading} barStyle="light-content"/>
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
