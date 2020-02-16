import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      hidden: true,
      errMsg: ""
    };
  }

  async storeToken(user) {
    console.log(user);
    try {
      await AsyncStorage.setItem("userData", user);
      this.getToken();
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  async getToken() {
    try {
      let userData = await AsyncStorage.getItem("userData");
      // let data = JSON.parse(userData);
      console.log(userData);
      if (userData) {
        this.props.navigation.replace("FALAFEL", { token: userData });
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  UNSAFE_componentWillMount(){
    if(this.props.navigation.getParam('username')){
      this.setState({
        username: this.props.navigation.getParam("username"),
        password: this.props.navigation.getParam("password")
      });
    }
  }

  componentDidMount() {
    this.getToken();
  }

  onEyePressed = () => {
    this.setState({ hidden: !this.state.hidden });
  };

  handleDone = () => {
    if (this.state.username && this.state.password) {
      AsyncStorage.removeItem("userData");
      fetch(`https://api.onigiri.now.sh/login`, {
        method: "POST",
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.json())
        .then(data => {
          data.err
            ? this.setState({ errMsg: data.err })
            : this.storeToken(data.token);
        });
    }
  };

  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={style.container}>
          <Text style={{ color: "white", marginBottom: 40, fontSize: 20 }}>
            Welcome to Falafel!
          </Text>
          <Text style={{ color: "#fff" }}>Log into your Falafel Account</Text>

          <Text style={{ color: "red" }}>
            {this.state.errMsg ? this.state.errMsg : ""}
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

          <Button title="Done" onPress={this.handleDone} />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "#5b5b5b" }}>
              you don't have an account? sign up
            </Text>
            <Button
              title="Here!"
              onPress={() => this.props.navigation.navigate("SignUp")}
            />
          </View>
        </View>
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
    flex: 1,
    justifyContent: "center",
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

export default Login;
