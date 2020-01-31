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
  Model
} from "react-native";

class Main extends Component {
  state = {};

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#222",
          color: "white"
        }}
      >
        <View style={{marginBottom: 30}}>
          
          <Button
            title="Sign Up"
            onPress={() => this.props.navigation.navigate("SignUp")}
          />
        </View>

        <View>
          
          <Button
            title="Log In"
            onPress={() => this.props.navigation.navigate("Login")}
          />
        </View>
      </View>
    );
  }
}

export default Main;
