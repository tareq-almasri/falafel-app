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
import { ACCESS_SERVER_URL } from "react-native-dotenv";

class Main extends Component {
  state = {};

  componentDidMount() {
    fetch(
      `http://${ACCESS_SERVER_URL}/api/main/?token=${this.props.navigation.getParam("token")}`
    )
      .then(res => res.json())
      .then(data => this.setState(data));
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: 'center',
          backgroundColor: "#000",
          color: "white"
        }}
      >
        <Text style={{ color: "#fff" }}>welcome to hell! {this.state.username},{this.state.tdee},{this.state.udi.calCount}</Text>
        
      </View>
    );
  }
}

export default Main;
