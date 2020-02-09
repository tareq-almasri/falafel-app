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
  state = {
    username: "",
    password: "",
    tdee: 0,
    goalCal: 0,
    diet: "",
    proteinDL: 0,
    carbsDL: 0,
    fatDL: 0,
    dailyPlan: {
      wakeUp: "",
      breakfast: "",
      lunch: "",
      dinner: "",
      sleep: ""
    },
    sport: [],
    udi: {
      calCount: 0,
      proteinCount: 0,
      fatCount: 0,
      carbsCount: 0,
      waterCount: 0,
      caffCount: 0,
      sugarCount: 0
    }
  };

  componentDidMount() {
    fetch(`http://${ACCESS_SERVER_URL}/api/main/?token=${this.props.navigation.getParam('token')}`).then(res=>res.json()).then(data=>console.log(data.found))
  
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
          color: "white"
        }}
      >
        <Text style={{ color: "#fff" }}>
          welcome to hell! {this.props.navigation.getParam("token")}
        </Text>
        <Button title="click" onPress={this.gimme} />
      </View>
    );
  }
}

export default Main;
