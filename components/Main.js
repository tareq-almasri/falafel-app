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
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import { ACCESS_SERVER_URL } from "react-native-dotenv";
import Speedometer from "react-native-speedometer-chart";
import * as Progress from "react-native-progress";

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
    sport: [["", "", ""]],
    udi: {
      date: "",
      calCount: 0,
      proteinCount: 0,
      fatCount: 0,
      carbsCount: 0,
      waterCount: 0,
      caffCount: 0,
      sugarCount: 0
    }
  };

  askPermission = async () => {
    await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
  };
  reminder = async () => {
    await this.askPermission();
    let time = Date().substring(16, 21);
    if (Object.values(this.state.dailyPlan).indexOf(time) == 0) {
      Notifications.presentLocalNotificationAsync({
        title: "Reminder: Wake Up Time",
        body: "rise and shine! time to start a new and healthy day :)",
        ios: { sound: true }
      });
    } else if (Object.values(this.state.dailyPlan).indexOf(time) == 1) {
      Notifications.presentLocalNotificationAsync({
        title: "Reminder: Breakfast Time",
        body: "it's time for a healthy breakfast!",
        ios: { sound: true }
      });
    } else if (Object.values(this.state.dailyPlan).indexOf(time) == 2) {
      Notifications.presentLocalNotificationAsync({
        title: "Reminder: Lunch Time",
        body: "it's time for a healthy lunch!",
        ios: { sound: true }
      });
    } else if (Object.values(this.state.dailyPlan).indexOf(time) == 3) {
      Notifications.presentLocalNotificationAsync({
        title: "Reminder: Dinner Time",
        body: "it's time for a healthy dinner!",
        ios: { sound: true }
      });
    } else if (Object.values(this.state.dailyPlan).indexOf(time) == 4) {
      Notifications.presentLocalNotificationAsync({
        title: "Reminder: Sleep Time",
        body: "it's time to get some rest, see you in the morning!",
        ios: { sound: true }
      });
    } else if (this.state.sport.some(x => x[1] == time)) {
      Notifications.presentLocalNotificationAsync({
        title: "Reminder: Workout Time",
        body: "it's your workout time! have fun and make the best out of it",
        ios: { sound: true }
      });
    } else if (this.state.sport.some(x => x[2] == time)) {
      Notifications.presentLocalNotificationAsync({
        title: "Reminder: Workout Time's Up",
        body: "you've finished your scheduled workout, Great Job!",
        ios: { sound: true }
      });
    }
  };

  // handleAddFood = () => {};

  resetUdi = () => {
    // if (this.state.udi.date !== Date().substring(0, 15)) {
      fetch(
        `http://${ACCESS_SERVER_URL}/api/reset/?username=${this.props.navigation.getParam("token")}`
      )
        .then(res => res.json())
        .then(data => {
          console.log(data);
        });
        this.setState({
          udi: {
            date: Date().substring(0, 15),
            calCount: 0,
            proteinCount: 0,
            fatCount: 0,
            carbsCount: 0,
            waterCount: 0,
            caffCount: 0,
            sugarCount: 0
          }
        });
    // }
  };

  UNSAFE_componentWillMount() {
    fetch(
      `http://${ACCESS_SERVER_URL}/api/home/?username=${this.props.navigation.getParam("token")}`
    )
      .then(res => res.json())
      .then(data => {
        console.log(data.found);
      });
    // this.resetUdi();
  //  this.reminder();
  }

  render() {
    return (
      <ScrollView>
        <View style={style.container}>
          <Text style={{ color: "#fff" }}>
            Hello {this.props.navigation.getParam("token")},
          </Text>
          <Button
            title="Log out"
            onPress={() => this.props.navigation.navigate("Login")}
          />
          {/* <View style={style.borderStyleTop}>
            <View style={style.caloriesContainer}> */}
          <View style={style.remainingCaloriesContainer}>
            <Speedometer
              value={this.state.udi.calCount}
              totalValue={
                this.state.goalCal > this.state.tdee
                  ? this.state.goalCal
                  : this.state.tdee
              }
              size={200}
              showText
              textStyle={{
                color: "white",
                borderColor: "white",
                borderWidth: 1,
                borderRadius: 5,
                padding: 3,
                width: 50,
                textAlign: "center"
              }}
              text={"" + this.state.udi.calCount}
              internalColor="#0d7cff"
              outerColor="#5b5b5b"
              innerColor="black"
              innerCircleStyle={{ height: 95, width: 189 }}
              outerCircleStyle={{ size: 250 }}
            />
          </View>
          {/* </View>
          </View> */}

          {/* <View style={style.borderStyleButtom}>
            <View style={style.remainingCaloriesContainer}> */}
          <View
            style={{ flexDirection: "row", alignItems: "center", margin: 15 }}
          >
            <Text style={{ color: "white", marginRight: 5, width: 55 }}>
              Carbs
            </Text>
            <TextInput
              style={{
                backgroundColor: "black",
                color: "white",
                width: 35,
                borderWidth: 1,
                borderColor: "white",
                textAlign: "center",
                borderRadius: 5,
                padding: 3,
                marginRight: 5
              }}
              value={''+this.state.udi.carbsCount}
            />
            <Text style={{ color: "white", marginRight: 5 }}>g</Text>
            <View>
              <Progress.Bar
                progress={0.3}
                width={200}
                borderColor="black"
                unfilledColor="#5b5b5b"
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              margin: 5,
              alignItems: "center",
              margin: 15
            }}
          >
            <Text style={{ color: "white", marginRight: 5, width: 55 }}>
              Protein
            </Text>
            <TextInput
              style={{
                backgroundColor: "black",
                color: "white",
                width: 35,
                borderWidth: 1,
                borderColor: "white",
                width: 35,
                textAlign: "center",
                borderRadius: 5,
                padding: 3,
                marginRight: 5
              }}
              value={''+this.state.udi.proteinCount}
            />
            <Text style={{ color: "white", marginRight: 5 }}>g</Text>
            <View>
              <Progress.Bar
                progress={0.3}
                width={200}
                borderColor="black"
                unfilledColor="#5b5b5b"
              />
            </View>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", margin: 15 }}
          >
            <Text style={{ color: "white", marginRight: 5, width: 55 }}>
              Fat
            </Text>
            <TextInput
              style={{
                backgroundColor: "black",
                color: "white",
                width: 35,
                borderWidth: 1,
                borderColor: "white",
                width: 35,
                textAlign: "center",
                borderRadius: 5,
                padding: 3,
                marginRight: 5
              }}
              value={''+this.state.udi.fatCount}
            />
            <Text style={{ color: "white", marginRight: 5 }}>g</Text>
            <View>
              <Progress.Bar
                progress={0.3}
                width={200}
                borderColor="black"
                unfilledColor="#5b5b5b"
              />
            </View>
          </View>
          {/* </View>
          </View> */}
          <Button
            title="Add Food"
            onPress={() => this.props.navigation.navigate("AddFood")}
          />
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#000"
  },
  borderStyleTop: {
    backgroundColor: "black",
    height: "45%",
    width: "95%",
    borderRadius: 10,
    flexDirection: "row",
    paddingTop: 20,
    justifyContent: "space-evenly"
  },
  borderStyleButtom: {
    backgroundColor: "black",
    height: "45%",
    width: "95%",
    borderRadius: 10,
    flexDirection: "row",
    paddingTop: 10,
    justifyContent: "space-evenly"
  },
  caloriesContainer: {
    
    flexDirection: "row",
    justifyContent: "space-around"
  },
  numberRemaining: {
    color: "#fff",
    fontSize: 30
  },
  textRemaining: {
    color: "#fff",
    fontSize: 15
  },

  textAdiacent: {
    color: "#fff",
    fontSize: 15
  },
  numberAdiacent: {
    color: "#fff",
    fontSize: 25
  },
  eachCaloriesContainer: {
    
    alignItems: "center"
  },
  remainingCaloriesContainer: {
    padding:  30,
    marginBottom: 20,
    height: 150
  }
});

export default Main;
