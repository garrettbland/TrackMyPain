import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';

//npm packages
import Icon from 'react-native-vector-icons/Ionicons';
import TouchableBounce from 'react-native-touchable-bounce';

class Number extends Component {

  constructor(props){
    super(props);

    this.handlePressIn = this.handlePressIn.bind(this);
    this.handlePressOut = this.handlePressOut.bind(this);
  }

  componentWillMount(){
    this.animatedValue = new Animated.Value(1);
  }

  handlePressIn(){
    Animated.spring(this.animatedValue, {
      toValue: .80
    }).start()
  }

  handlePressOut(){
    Animated.spring(this.animatedValue,{
      toValue: 1,
      friction: 3,
      tension: 40
    }).start()
  }

  render(){
    return(
      <TouchableWithoutFeedback
      onPressIn={this.handlePressIn}
      onPressOut={this.handlePressOut}
      onPress={()=>this.props.callback(this.props.number,this.props.color)}
      >
        <Animated.View style={{justifyContent:'center',alignItems:'center',width:Dimensions.get('window').width/3,height:'100%',transform: [{scale: this.animatedValue}]}}>
          <View style={{width:76,height:76,alignItems:'center',justifyContent:'center',borderRadius:38,borderColor:this.props.color,borderWidth:2,backgroundColor:this.props.backgroundColor}}>
            <Text style={{fontWeight:'bold',fontSize:20,color:this.props.fontColor}}>{this.props.number}</Text>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}

export default Number;
