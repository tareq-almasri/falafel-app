import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  Modal
} from "react-native";

class Main extends Component {
  state = {};
   
componentDidMount(){
  
}

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#000",
          color: "white"
        }}
      >
        <Text style={{color: '#fff'}}>welcome to hell!</Text>
      </View>
    );
  }
}

export default Main;
