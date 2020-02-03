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
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

class Login extends Component {
  state = {
    username: "",
    password: "",
    hidden: true,
    errMsg: ""
  };

  async storeToken(user) {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(user));
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  async getToken() {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      console.log(data);
      if (data) {
        this.props.navigation.navigate("FALAFEL", { user: data.username });
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  componentDidMount() {
    if (
      this.props.navigation.getParam("username") &&
      this.props.navigation.getParam("password")
    ) {
      this.setState({
        username: this.props.navigation.getParam("username"),
        password: this.props.navigation.getParam("password")
      });
    }
    this.getToken();
  }

  onEyePressed = () => {
    this.setState({ hidden: !this.state.hidden });
  };

  handleDone = () => {
    if (this.state.username && this.state.password) {
      fetch(
        `http://falafel-server-fmuo35b4u.now.sh/api/login/?username=${this.state.username}&password=${this.state.password}`
      )
        .then(res => res.json())
        .then(data => {
          this.storeToken(data.token);
          this.setState({ errMsg: data.err });
        });

      if (!this.state.errMsg) {
        this.getToken();
      }

    }
  };

  render() {
    return (
      
        <View style={style.container}>
          <Text style={{ color: "white", marginBottom: 40, fontSize: 20 }}>
            Welcome to Falafel!
          </Text>
          <Text style={{color: '#fff'}}>Log into your Falafel Account</Text>

          <Text
            style={{ color: "red" }}
          >
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

          {/* <Text style={{ color: "#5b5b5b" }}>
            * you will need it to login later
          </Text>
          <Text style={{ color: "#5b5b5b" }}> min 6 characters</Text> */}
          <Button title="Done" onPress={this.handleDone} />
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Text style={{ color: "#5b5b5b" }}>
              you don't have an account? sign up
            </Text>
            <Button
              title="Here!"
              onPress={() => this.props.navigation.navigate("SignUp")}
            />
          </View>
        </View>
      
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
