import React, { Component } from "react";
import {
  StyleSheet,
  Input,
  TextInputProps,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity
} from "react-native";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default class Signup extends Component {
  state = {
    username: "",
    password: "",
    hidden: true,
    errMsg: ""
  };

  onEyePressed = () => {
    this.setState({ hidden: !this.state.hidden });
  };

  handleNext = () => {
    if (this.state.username && this.state.password.length > 5) {
      fetch(
        `http://falafel-server-cutjyy2ry.now.sh/api/signup/?username=${this.state.username}&password=${this.state.password}`
      )
        .then(response => response.json())
        .then(data => {
          data.error
            ? this.setState({ errMsg: data.error })
            : this.props.navigation.navigate("Info", {
                username: this.state.username,
                password: this.state.password
              });
        });
    }
  };


  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#000"
        }}
      >
        <View style={style.container}>
          <Text style={{ color: "white", marginBottom: 40, fontSize: 20 }}>
            Account Setup
          </Text>

          <TextInput
            placeholderTextColor="#5b5b5b"
            textContentType="name"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="choose a username"
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
            style={style.input}
          />

          <Text style={{ color: "#5b5b5b" }}>
            {this.state.errMsg
              ? this.state.errMsg
              : "* you will need it to login later"}
          </Text>
          <View style={style.password}>
            <TextInput
              style={{ width: "80%" }}
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#5b5b5b"
              placeholder="choose a password"
              underlineColorAndroid="transparent"
              secureTextEntry={this.state.hidden}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />

            <TouchableOpacity onPress={this.onEyePressed}>
              {this.state.hidden ? (
                <FontAwesome5 name={"eye-slash"} size={15} />
              ) : (
                <FontAwesome5 name={"eye"} size={15} />
              )}
            </TouchableOpacity>
          </View>

          <Text style={{ color: "#5b5b5b" }}>
            * you will need it to login later
          </Text>
          <Text style={{ color: "#5b5b5b" }}> min 6 characters</Text>
        </View>
        <Button title="Next" onPress={this.handleNext} />
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  input: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 10,
    margin: 10,
    width: "80%"
  },
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#000"
  },
  password: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    margin: 10,
    width: "80%"
  }
});
